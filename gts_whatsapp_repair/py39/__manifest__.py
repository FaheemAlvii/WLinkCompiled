{
    'name': 'WhatsApp Messaging for Repair App',
    'summary': 'Send WhatsApp messages from Repair Orders with PDF attachments.',
    'description': """
Adds WhatsApp messaging integration to the Odoo Repair module.
Allows sending repair order details as PDF attachments via WhatsApp.
Streamline customer communication and keep them updated on repair status in real time.
""",
    'author': 'GTS',
    'license': 'LGPL-3',
    'version': '19.0.1.0',
    'category': 'Repair',
    'images': ['static/description/repair_banner.jpg'],
    'depends': [
        'gts_whatsapp',
        'repair',
    ],
    'data': [
        'security/ir.model.access.csv',
        'views/repair_views_inherit.xml',
        'wizard/gts_wizard_view.xml',
    ],
    'installable': True,
    'application': False,
}
