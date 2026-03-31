# -*- coding: utf-8 -*-
{
    'name': 'GTS WhatsApp Project',
    'version': '16.0.1.0',
    'summary': 'Send WhatsApp messages to customers directly from Project management.',
    'description': """Easily send WhatsApp messages to customers and project stakeholders from within Odoo Project module. Enhance communication and automate notifications using WhatsApp integration and marketing automation.""",
    'category': 'Sales/Project',
    'author': 'WLink',
    'license': 'LGPL-3',
    'sequence': 1,
    'images': ['static/description/project_banner.jpg'],
    'depends': ['base', 'project', 'wlink_whatsapp','base_automation', 'wlink_marketing_whatsapp'],
    'data': [
        'security/ir.model.access.csv',
        'data/project_data.xml',
        'wizard/wlink_project_wizard_view.xml',
        'views/project_view.xml',
    ],
    'installable': True,
    'application': True,
}
