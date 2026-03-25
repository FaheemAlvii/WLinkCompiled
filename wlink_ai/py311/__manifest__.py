# -*- coding: utf-8 -*-


{
    'name': 'Wlink AI Chatbot for Odoo',
        'version': '18.0.0.0',
    'author': "medconsultantweb@gmail.com",
    'summary': 'This module connects OpenAI to the chat feature in Odoo, allowing you to have an AI bot user to interact with. To use the module, create an account on OpenAI and generate an API key, then fill in the key in the settings. The module requires the Python client library for OpenAI API to be installed. This module can help you become an experienced Odoo consultant by providing instant answers to any questions you may have, without the need for additional support.',
    'description': """
    This module allows you to connect OpenAI's AI capabilities to your Odoo chat system, giving you access to an AI-powered consultant that can answer all of your questions and help you navigate your Odoo system with ease. Once you install this module, you will no longer need to rely on other people for assistance, as the AI Bot can handle all of your needs. Some of the key features of this module include:

    Easy configuration with your OpenAI API key
    Integration with the Odoo chat system
    Access to advanced AI capabilities for answering questions and providing assistance
    Increased efficiency and productivity for your business

 OpenAI, AI, Odoo, chat, consultant, questions, assistance, configuration, integration, efficiency, productivity, business.
    Este módulo le permite conectar las capacidades de IA de OpenAI a su sistema de chat Odoo, brindándole acceso a un consultor de IA que puede responder todas sus preguntas y ayudarlo a navegar su sistema Odoo con facilidad. Una vez que instale este módulo, ya no necesitará depender de otras personas para obtener ayuda, ya que el bot de IA puede manejar todas sus necesidades. Algunas de las características clave de este módulo incluyen:

    Configuración fácil con su clave API de OpenAI
    Integración con el sistema de chat Odoo
    Acceso a capacidades avanzadas de IA para responder preguntas y proporcionar asistencia
    Mayor eficiencia y productividad para su negocio

 OpenAI, IA, Odoo, chat, consultor, preguntas, asistencia, configuración, integración, eficiencia, productividad, negocio.

Ce module vous permet de connecter les capacités d'IA d'OpenAI à votre système de chat Odoo, vous donnant accès à un consultant IA qui peut répondre à toutes vos questions et vous aider à naviguer votre système Odoo avec facilité. Une fois que vous installez ce module, vous n'aurez plus besoin de compter sur d'autres personnes pour obtenir de l'aide, car le bot IA peut gérer tous vos besoins. Certaines des fonctionnalités clés de ce module incluent:

    Configuration facile avec votre clé API OpenAI
    Intégration avec le système de chat Odoo
    Accès aux capacités d'IA avancées pour répondre aux questions et fournir de l'aide
    Augmentation de l'efficacité et de la productivité pour votre entreprise

OpenAI, IA, Odoo, chat, consultant, questions, assistance, configuration, intégration, efficacité, productivité, entreprise.
   تسمح لك هذه الوحدة بتوصيل قدرات الذكاء الاصطناعي الخاصة بـ OpenAI بنظام الدردشة Odoo الخاص بك ، ولا تحتاج إلى مستشار AI يمكنه الإجابة على جميع أسئلتك ومساعدتك على التنقل بسهولة في نظام Odoo الخاص بك. بمجرد تثبيت هذه الوحدة ، لن تحتاج بعد الآن إلى الاعتماد على أشخاص آخرين للحصول على المساعدة لأن الروبوت الآلي يمكنه التعامل مع جميع احتياجاتك. تتضمن بعض وظائف هذه الوحدة ما يلي:

      التكوين السهل مع مفتاح OpenAI API الخاص بك
      التكامل مع نظام الدردشة Odoo
      الوصول إلى إمكانات الذكاء الاصطناعي المتقدمة للإجابة على الأسئلة وتقديم المساعدة
      زيادة الكفاءة والإنتاجية لعملك

 OpenAI ، IA ، Odoo ، chat ، استشاري ، أسئلة ، مساعدة ، تكوين ، تكامل ، كفاءة ، إنتاجية ، شركة.
    """,
    'license': 'OPL-1',
    'price': 0,
    'currency': 'EUR',
    'category': 'Tool',
    'depends': [
        'mail','contacts'
    ],
    'qweb': [
    ],
    'data': [
        'views/res_config_settings_views.xml',
        'data/wlink_ai_data.xml',
    ],
    'uninstall_hook': 'uninstall_hook',
    'install_hook': 'install_hook',
    'images': ['static/description/module_image.png'],
    'auto_install': False,
    'application': True,
    'installable': True,
}
