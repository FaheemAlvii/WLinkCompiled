# See LICENSE file for full copyright and licensing details.

{
    'name': 'WhatsApp Live Chat (Discuss Integration)',
    'version': '19.0.1.0',
    'license': 'OPL-1',
    'author': "GTS",
    'summary': 'Chat with customers on WhatsApp directly from Odoo Discuss in real time.',
    'description': """This module allows Odoo users to chat live with customers on WhatsApp directly from the Discuss app. Seamlessly integrates WhatsApp messaging into the internal chat interface for real-time communication with external contacts.""",
    'category': 'Extra Tools',
    'sequence': 1,
    'images': ['static/description/livechat_banner.jpg'],
    'depends': [
        'im_livechat',
        'mail',
        'gts_whatsapp',
    ],
    'data': [
        'views/mail_message.xml',
    ],
    'external_dependencies': {'python': ['phonenumbers']},
    'installable': True,
    'application': False,
    'auto_install': False,
    'price': 0,
    'currency': 'EUR',
}
