import React from 'react';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import AppointmentConfirmationEmail from '../emails/templates/appointment-confirmation';
import { type SupportedLanguage } from './i18n';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ReservationEmailData {
  name: string;
  email: string;
  phone: string;
  service: string;
  clinic: string;
  preferredTime: string;
  reservationDate: string;
  message?: string;
  reservationId: string;
  locale: SupportedLanguage;
}

// Translation helper function
const getEmailTranslations = (locale: SupportedLanguage) => {
  const translations = {
    cs: {
      subject: 'Potvrzení termínu - Pulmonology.cz',
      greeting: 'Vážený/á {{name}},',
      title: 'Váš termín byl potvrzen',
      subtitle:
        'Děkujeme, že jste si u nás objednal/a termín. Obdrželi jsme vaši rezervaci a brzy vás budeme kontaktovat pro potvrzení finálních detailů.',
      appointmentDetails: 'Detaily termínu',
      personalInfo: 'Osobní informace',
      nameLabel: 'Jméno',
      emailLabel: 'Email',
      phoneLabel: 'Telefon',
      serviceLabel: 'Služba',
      clinicLabel: 'Klinika',
      preferredTimeLabel: 'Preferovaný čas',
      reservationDateLabel: 'Datum rezervace',
      messageLabel: 'Vaše zpráva',
      reservationIdLabel: 'ID rezervace',
      whatHappensNext: 'Co bude následovat?',
      whatHappensNextDescription:
        'Zde je to, co od nás můžete očekávat v následujících dnech:',
      steps: {
        personalContact: 'Osobní kontakt',
        personalContactDescription:
          'Náš tým vám zavolá do 24 hodin pro potvrzení času termínu a zodpovězení případných dotazů.',
        appointmentReminder: 'Připomínka termínu',
        appointmentReminderDescription:
          'Pošleme vám připomínku 24 hodin před naplánovaným termínem.',
        preparation: 'Příprava',
        preparationDescription:
          'Dostavte se prosím 15 minut před termínem a přineste si pojistnou kartu a relevantní lékařské záznamy.',
      },
      importantInformation: 'Důležité informace',
      importantItems: [
        'Dostavte se prosím 15 minut před termínem',
        'Přineste si pojistnou kartu a platný průkaz totožnosti',
        'Pokud máte lékařské záznamy nebo výsledky testů, přineste si je s sebou',
        'Pokud potřebujete zrušit nebo přeložit termín, kontaktujte nás prosím alespoň 24 hodin předem',
      ],
      contactInfo: 'Kontaktní informace',
      contactInfoDescription:
        'Pokud máte jakékoli dotazy nebo potřebujete změnit termín, neváhejte se ozvat:',
      contactPhoneLabel: 'Telefon',
      contactEmailLabel: 'Email',
      address: 'Adresa',
      openingHours: 'Ordinační hodiny',
      mondayToFriday: 'Pondělí - Pátek: 8:00 - 18:00',
      footer:
        'Toto je automatická zpráva. Neodpovídejte prosím na tento email.',
      regards: 'S pozdravem,',
      team: 'Tým Pulmonology.cz',
      unsubscribe:
        'Pokud již nechcete dostávat naše emaily, kontaktujte nás prosím.',
      privacyNotice:
        'Vaše osobní údaje jsou zpracovávány v souladu s našimi Zásadami ochrany osobních údajů.',
    },
    en: {
      subject: 'Appointment Confirmation - Pulmonology.cz',
      greeting: 'Dear {{name}},',
      title: 'Your Appointment Has Been Confirmed',
      subtitle:
        'Thank you for scheduling your appointment with us. We have received your reservation and will contact you soon to confirm the final details.',
      appointmentDetails: 'Appointment Details',
      personalInfo: 'Personal Information',
      nameLabel: 'Name',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      serviceLabel: 'Service',
      clinicLabel: 'Clinic',
      preferredTimeLabel: 'Preferred Time',
      reservationDateLabel: 'Reservation Date',
      messageLabel: 'Your Message',
      reservationIdLabel: 'Reservation ID',
      whatHappensNext: 'What Happens Next?',
      whatHappensNextDescription:
        "Here's what you can expect from us in the coming days:",
      steps: {
        personalContact: 'Personal Contact',
        personalContactDescription:
          'Our team will call you within 24 hours to confirm your appointment time and answer any questions you may have.',
        appointmentReminder: 'Appointment Reminder',
        appointmentReminderDescription:
          "We'll send you a reminder 24 hours before your scheduled appointment.",
        preparation: 'Preparation',
        preparationDescription:
          'Please arrive 15 minutes early and bring your insurance card and any relevant medical records.',
      },
      importantInformation: 'Important Information',
      importantItems: [
        'Please arrive 15 minutes early for your appointment',
        'Bring your insurance card and a valid ID',
        'If you have any medical records or test results, please bring them with you',
        'If you need to cancel or reschedule, please contact us at least 24 hours in advance',
      ],
      contactInfo: 'Contact Information',
      contactInfoDescription:
        "If you have any questions or need to make changes to your appointment, please don't hesitate to reach out:",
      contactPhoneLabel: 'Phone',
      contactEmailLabel: 'Email',
      address: 'Address',
      openingHours: 'Opening Hours',
      mondayToFriday: 'Monday - Friday: 8:00 - 18:00',
      footer:
        'This is an automated message. Please do not reply to this email.',
      regards: 'Best regards,',
      team: 'Pulmonology.cz Team',
      unsubscribe:
        'If you no longer wish to receive emails from us, please contact us.',
      privacyNotice:
        'Your personal data is processed in accordance with our Privacy Policy.',
    },
  };

  return translations[locale];
};

// Helper function to translate service types
const translateServiceType = (
  serviceType: string,
  locale: SupportedLanguage,
): string => {
  const translations = {
    cs: {
      consultation: 'Konzultace',
      examination: 'Vyšetření',
      followUp: 'Kontrola',
      spirometry: 'Spirometrie',
      bronchoscopy: 'Bronchoskopie',
      allergyTesting: 'Alergologické testy',
      urgent: 'Akutní problém',
    },
    en: {
      consultation: 'Consultation',
      examination: 'Examination',
      followUp: 'Follow-up',
      spirometry: 'Spirometry',
      bronchoscopy: 'Bronchoscopy',
      allergyTesting: 'Allergy Testing',
      urgent: 'Urgent Problem',
    },
  };

  return (
    translations[locale][
      serviceType as keyof (typeof translations)[typeof locale]
    ] || serviceType
  );
};

// Helper function to translate preferred time
const translatePreferredTime = (
  preferredTime: string,
  locale: SupportedLanguage,
): string => {
  const translations = {
    cs: {
      noPreference: 'Nerozhonduje',
      morning: 'Dopoledne',
      afternoon: 'Odpoledne',
      evening: 'Večer',
    },
    en: {
      noPreference: 'No preference',
      morning: 'Morning',
      afternoon: 'Afternoon',
      evening: 'Evening',
    },
  };

  return (
    translations[locale][
      preferredTime as keyof (typeof translations)[typeof locale]
    ] || preferredTime
  );
};

// Helper function to translate clinic names
const translateClinic = (clinic: string, locale: SupportedLanguage): string => {
  const translations = {
    cs: {
      main: 'Hlavní klinika - Masarykova 2000/92, Ústí nad Labem',
      branch: 'Pobočka - Centrum (adresa bude upřesněna)',
    },
    en: {
      main: 'Main Clinic - Masarykova 2000/92, Ústí nad Labem',
      branch: 'Branch Office - Center (address to be specified)',
    },
  };

  return (
    translations[locale][
      clinic as keyof (typeof translations)[typeof locale]
    ] || clinic
  );
};

// Helper function to format date
const formatDate = (dateString: string, locale: SupportedLanguage): string => {
  const date = new Date(dateString);

  if (locale === 'cs') {
    return date.toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
};

export const sendAppointmentConfirmationEmail = async (
  reservationData: ReservationEmailData,
): Promise<{ success: boolean; error?: string; messageId?: string }> => {
  try {
    // Validate required environment variable
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    // Get translations for the user's locale
    const translations = getEmailTranslations(reservationData.locale);

    // Prepare email data with translations
    const emailData = {
      ...reservationData,
      service: translateServiceType(
        reservationData.service,
        reservationData.locale,
      ),
      clinic: translateClinic(reservationData.clinic, reservationData.locale),
      preferredTime: translatePreferredTime(
        reservationData.preferredTime,
        reservationData.locale,
      ),
      reservationDate: formatDate(
        reservationData.reservationDate,
        reservationData.locale,
      ),
      translations,
    };

    // Render the email HTML
    const emailHtml = await render(
      React.createElement(AppointmentConfirmationEmail, emailData),
    );

    // Send the email
    const result = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        'Pulmonology.cz <noreply@pulmonology.cz>',
      to: [reservationData.email],
      subject: translations.subject,
      html: emailHtml,
      // Optional: Add reply-to address
      replyTo: 'pulmonology.cz@gmail.com',
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return {
        success: false,
        error: result.error.message || 'Failed to send email',
      };
    }

    console.log('Email sent successfully:', result.data?.id);
    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

// Optional: Function to send test email (for development/testing)
export const sendTestEmail = async (
  testEmail: string,
  locale: SupportedLanguage = 'cs',
): Promise<{ success: boolean; error?: string; messageId?: string }> => {
  const testData: ReservationEmailData = {
    name: 'Test User',
    email: testEmail,
    phone: '+420 123 456 789',
    service: 'consultation',
    clinic: 'main',
    preferredTime: 'morning',
    reservationDate: new Date().toISOString(),
    message: 'This is a test appointment confirmation email.',
    reservationId: 'TEST-' + Date.now(),
    locale,
  };

  return sendAppointmentConfirmationEmail(testData);
};
