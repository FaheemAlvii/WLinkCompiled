# -*- coding: utf-8 -*-
{
    'name': 'GTS WhatsApp CRM',
    'version': '19.0.1.0',
    'summary': 'Send WhatsApp messages to customers directly from CRM.',
    'description': """
This module enables sending WhatsApp messages to customers easily from the CRM leads and opportunities.
Enhance your customer communication directly within Odoo CRM.
""",
    'category': 'Sales',
    'author': 'WLink',
    'license': 'LGPL-3',
    'sequence': 1,
    'images': ['static/description/crm_banner.jpg'],
    'depends': ['base', 'crm', 'wlink_whatsapp'],
    'data': [
        'security/ir.model.access.csv',
        'wizard/wlink_crm_wizard_view.xml',
        'views/crm_lead_view.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'wlink_whatsapp/static/src/scss/style.scss',
        ],
    },
    'installable': True,
    'application': True,
}
