{
    'name': 'WhatsApp Messaging for Repair App',
    'summary': 'Send WhatsApp messages from Repair Orders with PDF attachments.',
    'description': """
Adds WhatsApp messaging integration to the Repair module.
Allows sending messages with repair order PDF attachments via WhatsApp.
""",
    'author': 'WLink',
    'license': 'LGPL-3',
    'version': '17.0.1.0',
    'category': 'Repair',
    'images': ['static/description/repair_banner.jpg'],
    'depends': [
        'wlink_whatsapp',
        'repair',
    ],
    'data': [
        'security/ir.model.access.csv',
        'views/repair_views_inherit.xml',
        'wizard/wlink_wizard_view.xml',
    ],
    'installable': True,
    'application': False,
}
