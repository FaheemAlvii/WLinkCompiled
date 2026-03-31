odoo.define('wlink_whatsapp_pos.ReceiptScreen', function(require) {
    "use strict";

    const { useState } = require('@odoo/owl');
    const { Printer } = require('point_of_sale.Printer');
    const ReceiptScreen = require('point_of_sale.ReceiptScreen');
    const Registries = require('point_of_sale.Registries');

    const WhatsappReceiptScreen = (ReceiptScreen) =>
        class extends ReceiptScreen {
            setup() {
                super.setup();

                this.state = useState({
                    inputWhatsapp: '',
                    inputMessage: '',
                    isSending: false,
                    isInvoiceSending: false,
                    whatsappButtonDisabled: false,
                    invoiceButtonDisabled: false,
                });

                const partner = this.currentOrder.get_partner();
                const orderName = this.currentOrder.get_name();

                let number = "";
                if (partner) {
                    console.log(`Partner: ${partner.name}, Whatsapp number: ${partner.mobile}`);
                    number = partner.phone || partner.mobile || "";
                } else {
                    console.log(`Partner is null!`);
                }

                this.state.inputWhatsapp = number;
                this.state.inputMessage = `Hello, Here is your receipt for the following order id: ${orderName}.`;
                this.state.whatsappButtonDisabled = !this.is_valid_mobile();
                this.state.invoiceButtonDisabled = !this.currentOrder.backendId;
            }

            is_valid_mobile() {
                const value = this.state.inputWhatsapp;
                if (value) {
                    const valueLen = value.replace(/[^0-9]/g, "").length;
                    return valueLen > 8 && valueLen < 15;
                }
                return false;
            }

            onInputWhatsapp(ev) {
                this.state.inputWhatsapp = ev.target.value;
                this.state.whatsappButtonDisabled = !this.is_valid_mobile();
            }

            // === Send Receipt ===
            async onSendWhatsapp() {
                if (this.state.isSending || !this.is_valid_mobile()) return;

                this.state.isSending = true;
                try {
                    await this._sendWhatsappToCustomer();
                    this.showPopup('ConfirmPopup', {
                        title: 'Sent!',
                        body: 'The receipt has been successfully sent via WhatsApp.',
                    });
                } catch (error) {
                    console.error('Failed to send receipt:', error);
                    const errorMessage = error.message || 'Failed to send receipt via WhatsApp. Please check the Odoo server logs for more details.';
                    this.showPopup('ErrorPopup', {
                        title: 'Sending Failed',
                        body: errorMessage,
                    });
                } finally {
                    this.state.isSending = false;
                }
            }

            async _sendWhatsappToCustomer() {
                const number = this.state.inputWhatsapp;
                const message = this.state.inputMessage;
                const receiptString = this.orderReceipt.el.innerHTML;
                const printer = new Printer(null, this.env.pos);
                const ticketImage = await printer.htmlToImg(receiptString);

                try {
                    // This is the RPC call to the server-side method.
                    // The issue is in the Python code, not this JS call.
                    await this.rpc({
                        model: 'pos.order',
                        method: 'whatsapp_template_message',
                        args: [number, message, ticketImage],
                    });
                } catch (error) {
                    throw error;
                }
            }

            // === Send Invoice ===
            async onSendInvoiceWhatsapp() {
                if (this.state.isInvoiceSending) return;

                if (!this.is_valid_mobile()) {
                    this.showPopup('ErrorPopup', {
                        title: 'Validation Error',
                        body: 'Please enter a valid mobile number to send the invoice.',
                    });
                    return;
                }

                this.state.isInvoiceSending = true;
                try {
                    await this._sendInvoiceToCustomer();
                    this.showPopup('ConfirmPopup', {
                        title: 'Sent!',
                        body: 'The invoice has been successfully sent via WhatsApp.',
                    });
                } catch (error) {
                    console.error('Failed to send invoice:', error);
                    const errorMessage = error.message || 'Failed to send invoice via WhatsApp. Please check the Odoo server logs for more details.';
                    this.showPopup('ErrorPopup', {
                        title: 'Invoice Sending Failed',
                        body: errorMessage,
                    });
                } finally {
                    this.state.isInvoiceSending = false;
                }
            }

            async _sendInvoiceToCustomer() {
                const order = this.currentOrder;
                const partner = order.get_partner();

                if (!partner) {
                    throw new Error("Please select a customer before sending an invoice.");
                }

                if (!order.is_to_invoice()) {
                    throw new Error("Order is not marked for invoicing.");
                }

                const orderName = order.get_name();
                const order_server_id = this.env.pos.validated_orders_name_server_id_map[orderName];

                console.log("Order Name:", orderName);
                console.log("Order Server ID:", order_server_id);

                if (!order_server_id) {
                    throw new Error("This order has not been synced to the backend. Please ensure the POS is online and try again.");
                }

                const number = this.state.inputWhatsapp;
                const message = this.state.inputMessage.replace('receipt', 'invoice');

                try {
                    // This RPC call triggers the problematic Python method.
                    // The fix must be in the Python function 'whatsapp_send_invoice'.
                    await this.rpc({
                        model: 'pos.order',
                        method: 'whatsapp_send_invoice',
                        args: [number, message, order_server_id],
                    });
                } catch (error) {
                    throw error;
                }
            }
        };

    Registries.Component.extend(ReceiptScreen, WhatsappReceiptScreen);
    return ReceiptScreen;
});
