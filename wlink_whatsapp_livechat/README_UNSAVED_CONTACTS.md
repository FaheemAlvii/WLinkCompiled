# WhatsApp Livechat - Unsaved Contacts Support

## Overview

This update enables the WhatsApp Livechat module to receive messages from **unsaved contacts** (contacts not in your phone's contact list). Previously, the system only worked with saved contacts.

## Key Changes

### 1. **Automatic Partner Creation**
- When a message is received from an unsaved contact, the system automatically creates a temporary partner record
- Uses WhatsApp contact information (notifyName, pushName) when available
- Falls back to "WhatsApp User (phone_number)" if no name is provided

### 2. **Enhanced Contact Information**
- Added WhatsApp-specific fields to partner records:
  - `whatsapp_status`: Online/Offline/Typing/Unknown
  - `is_whatsapp_contact`: Boolean flag for WhatsApp contacts
  - `whatsapp_last_seen`: Last seen timestamp
  - `whatsapp_profile_picture`: Profile picture from WhatsApp
  - `whatsapp_about`: About text from WhatsApp
  - `whatsapp_username`: Username from WhatsApp

### 3. **Event-Based Webhook Handling**
- Restructured webhook to handle different event types:
  - `message`: Incoming messages
  - `typing`: Typing indicators
  - `read`: Read receipts
  - `presence`: Online/offline status

### 4. **Contact Information Updates**
- Automatically updates contact information when new data is received
- Preserves existing contact data while adding WhatsApp-specific information

## How It Works

### For Saved Contacts:
1. System finds existing partner with matching phone number
2. Updates WhatsApp-specific information if new data is available
3. Creates livechat session as before

### For Unsaved Contacts:
1. System searches for existing partner (not found)
2. Creates new partner record with available WhatsApp information
3. Marks partner as WhatsApp contact
4. Creates livechat session with the new partner

## Configuration

### 1. **Webhook URL**
Ensure your WhatsApp API is configured to send webhooks to:
```
https://your-odoo-domain.com/webhook/livechat
```

### 2. **Required Dependencies**
- `phonenumbers` Python library (already included)
- Active WhatsApp connection in Odoo
- Livechat channel configured

### 3. **Permissions**
- Ensure the webhook endpoint is accessible
- Public authentication is enabled for the webhook

## Testing

### 1. **Test Script**
Use the provided test script to verify functionality:
```bash
python3 test_webhook.py
```

### 2. **Manual Testing**
1. Send a message from an unsaved contact to your WhatsApp number
2. Check Odoo Discuss for the new livechat session
3. Verify that a new partner was created with WhatsApp information

## UI Enhancements

### 1. **Partner Form View**
- New "WhatsApp" tab for WhatsApp-specific information
- Only visible for WhatsApp contacts
- Shows status, last seen, profile picture, and about text

### 2. **Partner List View**
- Optional columns for WhatsApp status and contact type
- Easy identification of WhatsApp contacts

## Benefits

1. **Complete Coverage**: Receive messages from any WhatsApp user
2. **Automatic Contact Management**: No manual contact creation needed
3. **Rich Information**: Capture WhatsApp profile data when available
4. **Seamless Integration**: Works with existing livechat workflow
5. **Status Tracking**: Monitor contact online/offline status

## Troubleshooting

### Common Issues:

1. **Webhook Not Receiving Messages**
   - Check webhook URL configuration in WhatsApp API
   - Verify Odoo server is accessible
   - Check server logs for errors

2. **Contacts Not Being Created**
   - Ensure proper permissions for partner creation
   - Check phone number formatting
   - Verify webhook data structure

3. **Livechat Sessions Not Starting**
   - Ensure livechat channel is configured
   - Check operator assignment
   - Verify channel creation permissions

### Debug Information:
- Check Odoo server logs for webhook processing
- Monitor partner creation in Contacts app
- Verify livechat sessions in Discuss app

## Future Enhancements

1. **Contact Merging**: Merge temporary contacts with existing partners
2. **Profile Picture Sync**: Download and store WhatsApp profile pictures
3. **Status History**: Track status changes over time
4. **Contact Groups**: Organize WhatsApp contacts into groups
5. **Message Templates**: Pre-defined responses for common scenarios 