{
    'name': 'WhatsApp Messaging for AiO Apps',
    'version': '16.0.1.0',
    'summary': 'WhatsApp messaging integration for Sale, Purchase, Invoice, and Inventory modules.',
    'description': """
    Adds WhatsApp messaging functionality to Sale, Purchase, Invoice, and Inventory modules.
    Improve communication by sending messages directly from these key business apps.
    """,
    'author': 'GTS',
    'license': 'LGPL-3',
    'images': ['static/description/most_banner.jpg'],
    'depends': ['gts_whatsapp', 'stock', 'purchase', 'account', 'sale_management', 'gts_contacts_whatsapp'],  # gts_contacts_whatsapp to re-use the messaging menu.
    'data': [
        'security/ir.model.access.csv',

        'models/inventory_message_menu/inventory_message_menu.xml',

        'views/sale.xml',
        'views/inventory.xml',
        'views/invoice.xml',
        'views/purchase.xml',
        'wizard/gts_wizard_view.xml',
    ],
    'installable': True,
    'application': False
}