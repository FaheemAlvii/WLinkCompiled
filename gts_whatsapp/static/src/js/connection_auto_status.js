/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { FormController } from "@web/views/form/form_controller";
import { jsonrpc } from "@web/core/network/rpc_service";
import { registry } from "@web/core/registry";

patch(FormController.prototype, {
    async setup() {
        await super.setup(...arguments);

        console.log("[DEBUG] FormController.setup v17", {
            resModel: this.props.resModel,
            resId: this.props.resId,
        });

        if (this.props.resModel === "whatsapp.connection" && this.props.resId) {
            console.log("[DEBUG] v17 — invoking check_status for", this.props.resId);
            try {
                await jsonrpc("/web/dataset/call_kw", {
                    model: "whatsapp.connection",
                    method: "check_status",
                    args: [[this.props.resId]],
                    kwargs: {},
                });

                await this.model.load();
                this.render();
            } catch (err) {
                console.error("[ERROR] v17 rpc failed:", err);
            }
        }
    },
});
