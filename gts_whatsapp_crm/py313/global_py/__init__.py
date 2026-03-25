import shelve
from platformdirs import user_config_dir
from pathlib import Path


def generate_payload(self, model='gts.crm.wizard', template_mode=True, template_name=None, document_name=None):
    model_id = self.env['ir.model'].search([('model', '=', 'crm.lead')], limit=1)
    default_mail_template_id = self.env['mail.template'].search([('model_id', '=', model_id.id)], limit=1)
    payload = {
        'type': 'ir.actions.act_window',
        'name': 'Send Whatsapp Message',
        'res_model': model,
        'target': 'new',
        'target': 'new',
        'view_mode': 'form',
    }
    if template_mode:
        payload['context'] = {  # noqa
            'order': (self.id, self._name),
            'send_to': self.partner_id.phone,
            'template_name': template_name,
            'document_name': document_name,
            'default_mail_template_id': default_mail_template_id.id,
            'message': f"Hello {self.partner_id.name}, we have received your lead regarding {self.name}. Our team will get back to you shortly. Thank you!"
        }
    else:
        phone = self.phone if self._name == 'res.partner' else self.partner_id.phone
        payload['context'] = {'order': (self.id, self._name), 'send_to': phone}

    return payload


class Config:
    def __init__(self, you):  # You is self for the class that instantiated this class
        self.you = you

    @property
    def config_file(self):
        config_dir = Path(user_config_dir("GeekTechSol"))
        config_dir.mkdir(parents=True, exist_ok=True)
        return str(config_dir / f'gts_config_{self.you.env.cr.dbname}')


    def get(self, name):
        with shelve.open(self.config_file) as db:
            return db[name]



def get_from_id(self, model_name, record_id):
    record = self.env[model_name].search([('id', '=', record_id)], limit=1)  # noqa
    if record:
        return record
    return False


def get_default_connection(self, dbname='default_connection'):
    default_connection = Config(self).get(dbname)
    return get_from_id(self, 'whatsapp.connection', default_connection)


def get_phone(phone_c: str) -> str:
    phone_splitted = phone_c.split('@')
    if len(phone_splitted) >= 2:
        phone_splitted.remove(phone_splitted[-1])
    return ''.join(phone_splitted)


def get_order(self):
    return get_from_id(self, self.env.context['order'][1], self.env.context['order'][0])
