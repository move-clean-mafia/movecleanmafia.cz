# Bilingual Email System

This directory contains the bilingual email system for appointment confirmations at Pulmonology.cz.

## Overview

The email system automatically sends appointment confirmation emails in the user's preferred language (Czech or English) after they book an appointment through the website.

## Features

- **Bilingual Support**: Automatically sends emails in Czech or English based on user's locale
- **Professional Templates**: Uses React Email for beautiful, responsive email templates
- **Dynamic Content**: Populates emails with specific appointment details
- **Reliable Delivery**: Uses Resend service for reliable email delivery
- **Error Handling**: Graceful error handling - appointments are still created even if email fails

## Structure

```
emails/
├── templates/
│   └── appointment-confirmation.tsx  # React Email template
└── README.md                        # This file

lib/
└── email-service.ts                 # Email service utilities
```

## Configuration

### Environment Variables

Add these to your `.env.local` file:

```bash
# Resend Email Service Configuration
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL="Pulmonology.cz <noreply@pulmonology.cz>"

# Base URL (for production)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### Resend Setup

1. Sign up at [Resend](https://resend.com)
2. Verify your domain or use a verified domain
3. Generate an API key
4. Add the API key to your environment variables

## Usage

### Automatic Sending

Emails are automatically sent when users submit appointment forms through:

- `/api/submit-reservation` endpoint
- The system captures the user's locale and sends the appropriate language

### Manual Testing

Use the test script to verify email functionality:

```bash
# Edit scripts/test-email.ts to use your email address
# Then run:
npx tsx scripts/test-email.ts
```

### Programmatic Usage

```typescript
import { sendAppointmentConfirmationEmail } from '../lib/email-service';

const result = await sendAppointmentConfirmationEmail({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+420 123 456 789',
  service: 'consultation',
  clinic: 'main',
  preferredTime: 'morning',
  reservationDate: new Date().toISOString(),
  message: 'Optional message',
  reservationId: 'unique-id',
  locale: 'en', // or 'cs'
});

if (result.success) {
  console.log('Email sent:', result.messageId);
} else {
  console.error('Email failed:', result.error);
}
```

## Email Content

### Czech Email

- Subject: "Potvrzení termínu - Pulmonology.cz"
- Includes all appointment details in Czech
- Contact information and next steps in Czech

### English Email

- Subject: "Appointment Confirmation - Pulmonology.cz"
- Includes all appointment details in English
- Contact information and next steps in English

## Template Customization

The email template (`templates/appointment-confirmation.tsx`) can be customized:

1. **Styling**: Modify the inline styles at the bottom of the file
2. **Content**: Update the JSX structure
3. **Translations**: Edit the translations in `lib/email-service.ts`

## Error Handling

The system is designed to be fault-tolerant:

- If email sending fails, the appointment is still created
- Errors are logged for debugging
- Users still see success confirmation
- Admin can manually follow up if needed

## Monitoring

Check your Resend dashboard to monitor:

- Email delivery rates
- Bounce rates
- Click-through rates
- Error logs

## Troubleshooting

### Common Issues

1. **Email not sending**
   - Check RESEND_API_KEY is correct
   - Verify domain is verified in Resend
   - Check email address format

2. **Wrong language**
   - Verify locale is being passed correctly
   - Check supported locales in email service

3. **Template errors**
   - Check React Email component syntax
   - Verify all required props are passed

### Debug Mode

Set `NODE_ENV=development` to see detailed error logs in the console.

## Contributing

When adding new languages:

1. Add translations to `getEmailTranslations()` in `email-service.ts`
2. Add translation helper functions if needed
3. Update supported locales validation
4. Test with the test script

## Security

- Never expose API keys in client-side code
- Use environment variables for all sensitive configuration
- Validate all input data before sending emails
- Sanitize user-provided content in emails
