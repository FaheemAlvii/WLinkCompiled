{
    'name': 'WhatsApp Messaging for Contacts',
    'version': '16.0.1.0',
    'summary': 'Send WhatsApp messages directly from the Contacts app.',
    'description': """
    Adds WhatsApp messaging functionality to the Odoo Contacts app.  
    Easily send personalized WhatsApp messages to your contacts using templates and marketing campaigns.
    """,
    'author': 'GTS',
    'license': 'LGPL-3',
    'sequence': 1,
    'images': ['static/description/contact_banner.jpg'],
    'depends': ['sale', 'mail','gts_whatsapp','gts_marketing_whatsapp'],
    'data': [
        'security/ir.model.access.csv',

        'wizard/message_menu.xml',
        'wizard/gts_contact_wizard_view.xml',

        'views/menu.xml'
    ],
    'installable': True,
    'application': False
}