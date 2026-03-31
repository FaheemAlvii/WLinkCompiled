/** @odoo-module **/

import { ReceiptScreen } from "@point_of_sale/app/screens/receipt_screen/receipt_screen";
import { OrderReceipt } from "@point_of_sale/app/screens/receipt_screen/receipt/order_receipt";
import { _t } from "@web/core/l10n/translation";
import { patch } from "@web/core/utils/patch";
import { useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks"; // Import useService for Odoo 17 service injection

patch(ReceiptScreen.prototype, {
    /**
     * @override
     * Setup method for the ReceiptScreen component.
     * Initializes state and injects necessary Odoo services.
     */
    setup() {
        super.setup(...arguments);

        // Inject Odoo services for interacting with the backend and showing notifications.
        // In Odoo 17, services are typically injected using useService hook.
        this.orm = useService("orm"); // Service for interacting with Odoo models (RPC calls)
        this.action = useService("action"); // Service for executing Odoo actions (e.g., opening wizards)
        this.notification = useService("notification"); // Service for displaying user notifications

        const partner = this.currentOrder.get_partner();
        const orderName = this.currentOrder.get_name();
        var number = "";

        if (partner != null) {
            number = partner.phone || "";
        }

        // Initialize the reactive state for UI elements.
        this.orderUiState = useState({
            inputWhatsapp: number, // Input field for WhatsApp number
            // Default message for WhatsApp, dynamically includes partner name and order type.
            inputMessage: `Hello, Here is your receipt for the following order: ${orderName}.`,
            isReceiptSending: false, // Flag to indicate if receipt is currently being sent
            isInvoiceSending: false, // Flag to indicate if invoice is currently being sent
            whatsappButtonDisabled: false, // Flag to disable WhatsApp button
        });
    },

    /**
     * Checks if the entered WhatsApp number is valid (at least 8 digits after removing non-digits).
     * @returns {boolean} True if the number is valid, false otherwise.
     */
    is_valid_mobile() {
        const value = this.orderUiState.inputWhatsapp;
        if (value) {
            const valueLen = value.replace(/[^0-9]/g, "").length;
            return valueLen > 8 && valueLen < 15;
        }
        return false;
    },

    /**
     * Handles changes in the WhatsApp input field.
     * Updates the state and re-enables the WhatsApp button.
     * @param {Event} ev The input event.
     */
    onInputWhatsapp(ev) {
        this.orderUiState.whatsappButtonDisabled = false;
        this.orderUiState.inputWhatsapp = ev.target.value;
    },

    // === Send Receipt (Image) ===
    /**
     * Handles sending the receipt image via WhatsApp.
     * Generates a ticket image and calls a backend method to send it.
     */
    async onSendWhatsapp() {
        if (this.orderUiState.isReceiptSending) {
            return;
        }

        this.orderUiState.isReceiptSending = true;

        try {
            await this._sendWhatsappToCustomer();
            // Add success notification
            this.notification.add(_t("Receipt sent successfully via WhatsApp."), { type: 'success' });
        } catch (error) {
            // Add failure notification
            this.notification.add(_t("Failed to send receipt."), { type: 'danger' });
            this.orderUiState.whatsappButtonDisabled = true;
        } finally {
            this.orderUiState.isReceiptSending = false;
        }
    },

    async _sendWhatsappToCustomer() {
        var number = this.orderUiState.inputWhatsapp;
        var message = this.orderUiState.inputMessage;

        const ticketImage = await this.renderer.toJpeg(
            OrderReceipt,
            {
                data: this.pos.get_order().export_for_printing(),
                formatCurrency: this.env.utils.formatCurrency,
            },
            { addClass: "pos-receipt-print" }
        );
        await this.orm.call("pos.order", "whatsapp_template_message", [number, message, ticketImage]);
    },

    // === Send Invoice (PDF) ===
    /**
     * Handles preparing and sending the invoice via WhatsApp.
     * Calls a backend method that might open a wizard for further action.
     */
    async onSendInvoiceWhatsapp() {
        if (this.orderUiState.isInvoiceSending) {
            return;
        }

        this.orderUiState.isInvoiceSending = true;

        try {
            const order = this.currentOrder;
            const partner = order.get_partner();

            if (!partner) {
                throw new Error("Please select a customer before sending invoice.");
            }
            if (!order.is_to_invoice()) {
                throw new Error("Order is not marked for invoicing.");
            }

            // Get the order ID from the current order
            const orderId = order.server_id || order.uid;
            if (!orderId) {
                throw new Error("Order ID not found.");
            }

            // Create a new message for the invoice
            const invoiceMessage = this.orderUiState.inputMessage.replace('receipt', 'invoice');

            await this.orm.call(
                "pos.order",
                "whatsapp_send_invoice",
                [
                    this.orderUiState.inputWhatsapp,
                    invoiceMessage, // Use the new invoice message
                    orderId
                ]
            );

            // Add success notification
            this.notification.add(_t("Invoice sent successfully via WhatsApp."), { type: 'success' });
        } catch (error) {
            // Add failure notification
            this.notification.add(_t("Failed to send invoice."), { type: 'danger' });
            this.orderUiState.whatsappButtonDisabled = true;
            throw error;
        } finally {
            this.orderUiState.isInvoiceSending = false;
        }
    },
});
