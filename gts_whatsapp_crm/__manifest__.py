# -*- coding: utf-8 -*-
{
    'name': 'GTS WhatsApp CRM',
    'version': '18.0.1.0',
    'summary': 'Send WhatsApp messages to customers directly from CRM.',
    'description': """
This module enables sending WhatsApp messages to customers easily from the CRM leads and opportunities.
Enhance your customer communication directly within Odoo CRM.
""",
    'category': 'Sales',
    'author': 'GTS',
    'license': 'LGPL-3',
    'sequence': 1,
    'images': ['static/description/crm_banner.jpg'],
    'depends': ['base', 'crm', 'gts_whatsapp'],
    'data': [
        'security/ir.model.access.csv',
        'wizard/gts_crm_wizard_view.xml',
        'views/crm_lead_view.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'gts_whatsapp/static/src/scss/style.scss',
        ],
    },
    'installable': True,
    'application': True,
}
