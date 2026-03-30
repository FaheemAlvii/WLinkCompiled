/** @odoo-module **/

import { ReceiptScreen } from "@point_of_sale/app/screens/receipt_screen/receipt_screen";
import { patch } from "@web/core/utils/patch";
import { useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks"; // Import useService for Odoo 18
import { _t } from "@web/core/l10n/translation"; // Import translation service

patch(ReceiptScreen.prototype, {
    setup() {
        super.setup(...arguments);
        // Inject the notification service for displaying success/error messages
        this.notification = useService("notification");

        const order = this.currentOrder;
        const partner = order ? order.get_partner() : null;
        const orderName = order ? order.name : '';

        let number = "";
        if (partner) {
            number = partner.phone || partner.mobile || "";
        }

        this.orderUiState = useState({
            inputWhatsapp: number,
            inputMessage: `Hello${partner ? ' ' + partner.name : ''}, here is your ${order?.is_to_invoice() ? 'invoice' : 'receipt'} for order: ${orderName}.`,
            isReceiptSending: false,
            isInvoiceSending: false,
            whatsappButtonDisabled: false,
        });
    },

    is_valid_mobile() {
        const value = this.orderUiState.inputWhatsapp;
        return value && value.replace(/\D/g, "").length >= 8;
    },

    onInputWhatsapp(ev) {
        this.orderUiState.inputWhatsapp = ev.target.value;
        this.orderUiState.whatsappButtonDisabled = false;
    },

    async onSendWhatsapp() {
        if (this.orderUiState.isReceiptSending) return;
        this.orderUiState.isReceiptSending = true;

        try {
            const ticketImage = await this.generateTicketImage(); // base64 image
            await this.pos.data.call("pos.order", "whatsapp_template_message", [
                this.orderUiState.inputWhatsapp,
                this.orderUiState.inputMessage,
                ticketImage,
            ]);
            // Replaced alert with the Odoo notification service for a success message
            this.notification.add(_t("Receipt sent successfully via WhatsApp."), { type: 'success' });
        } catch (error) {
            console.error("Error sending receipt via WhatsApp:", error);
            // Replaced alert with the Odoo notification service for an error message
            this.notification.add(_t("Failed to send receipt."), { type: 'danger' });
        }

        this.orderUiState.isReceiptSending = false;
    },

    async onSendInvoiceWhatsapp() {
        if (this.orderUiState.isInvoiceSending || !this.currentOrder.is_to_invoice()) return;
        this.orderUiState.isInvoiceSending = true;

        try {
            const order = this.currentOrder;
            const orderId = order?.id;
            const partner = order.get_partner();

            if (!orderId) throw new Error("Order ID not found or not synced.");
            if (!order.is_to_invoice()) throw new Error("Order is not marked for invoicing.");
            if (!partner) throw new Error("Please select a customer before sending invoice.");

            const result = await this.pos.data.call("pos.order", "whatsapp_template_message_with_invoice", [
                orderId,
                this.orderUiState.inputWhatsapp,
                this.orderUiState.inputMessage,
            ]);

            if (result && result.type === 'ir.actions.act_window') {
                await this.pos.env.services.action.doAction(result);
                // The action might open a wizard, so we don't show a direct success message here.
            } else {
                // Replaced alert with the Odoo notification service for a success message
                this.notification.add(_t("Invoice sent successfully via WhatsApp."), { type: 'success' });
            }
        } catch (error) {
            console.error("Error invoice sent via WhatsApp!", error);
            // Replaced alert with the Odoo notification service for an error message
            this.notification.add(error.message || _t("Failed to send invoice."), { type: 'danger' });
        }

        this.orderUiState.isInvoiceSending = false;
    },
});
