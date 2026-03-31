/** @odoo-module **/

import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { patch } from "@web/core/utils/patch";
import { _t } from "@web/core/l10n/translation";
import { useService } from "@web/core/utils/hooks";

patch(PaymentScreen.prototype, {
    setup() {
        this._super(...arguments);
        // Custom setup logic here
        this.notification = useService("notification");
    },

    /**
     * Custom button handler - can be called from templates
     */
    onCustomButtonClick() {
        this.notification.add(_t("Welcome to WhatsApp POS Integration!"), { type: 'info' });
    },
});