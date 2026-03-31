{
    'name': 'WhatsApp Messaging for POS',
    'summary': 'Send POS receipts and customer invoices via WhatsApp.',
    'description': """Integrate WhatsApp with Odoo POS to send receipts and invoices to customers directly from the POS interface. Enhance post-sale communication with real-time WhatsApp messaging.""",
    'author': 'WLink',
    'license': 'LGPL-3',
    'version': '17.0.1.0',
    'images': ['static/description/pos_banner.jpg'],
    'depends': ['wlink_whatsapp', 'wlink_contacts_whatsapp', 'point_of_sale', 'account'],
    'data': [
        'security/ir.model.access.csv',
        'wizard/select_connection.xml'
    ],
    'assets': {
        'point_of_sale._assets_pos': [
            'wlink_whatsapp_pos/static/src/scss/style.scss',
            'wlink_whatsapp_pos/static/src/xml/receipt.xml',
            'wlink_whatsapp_pos/static/src/js/receipt.js',
        ]
    },
    'installable': True,
    'application': False
}
