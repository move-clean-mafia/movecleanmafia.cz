import React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
  Hr,
} from '@react-email/components';

interface AppointmentConfirmationEmailProps {
  name: string;
  email: string;
  phone: string;
  service: string;
  clinic: string;
  preferredTime: string;
  reservationDate: string;
  message?: string;
  reservationId: string;
  locale: 'cs' | 'en';
  translations: {
    subject: string;
    greeting: string;
    title: string;
    subtitle: string;
    appointmentDetails: string;
    personalInfo: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    serviceLabel: string;
    clinicLabel: string;
    preferredTimeLabel: string;
    reservationDateLabel: string;
    messageLabel: string;
    reservationIdLabel: string;
    whatHappensNext: string;
    whatHappensNextDescription: string;
    steps: {
      personalContact: string;
      personalContactDescription: string;
      appointmentReminder: string;
      appointmentReminderDescription: string;
      preparation: string;
      preparationDescription: string;
    };
    importantInformation: string;
    importantItems: string[];
    contactInfo: string;
    contactInfoDescription: string;
    contactPhoneLabel: string;
    contactEmailLabel: string;
    address: string;
    openingHours: string;
    mondayToFriday: string;
    footer: string;
    regards: string;
    team: string;
    unsubscribe: string;
    privacyNotice: string;
  };
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

const AppointmentConfirmationEmail: React.FC<
  AppointmentConfirmationEmailProps
> = ({
  name,
  email,
  phone,
  service,
  clinic,
  preferredTime,
  reservationDate,
  message,
  reservationId,
  locale,
  translations: t,
}) => {
  const previewText = `${t.title} - ${name}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src={`${baseUrl}/pulmonology-logo.png`}
              width="180"
              height="auto"
              alt="Pulmonology.cz"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            {/* Greeting */}
            <Heading style={h1}>{t.greeting.replace('{{name}}', name)}</Heading>

            {/* Title */}
            <Heading style={h2}>{t.title}</Heading>

            {/* Subtitle */}
            <Text style={text}>{t.subtitle}</Text>

            {/* Appointment Details Card */}
            <Section style={card}>
              <Heading style={h3}>{t.appointmentDetails}</Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={labelText}>{t.reservationIdLabel}:</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={valueText}>{reservationId}</Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={labelText}>{t.serviceLabel}:</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={valueText}>{service}</Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={labelText}>{t.clinicLabel}:</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={valueText}>{clinic}</Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={labelText}>{t.preferredTimeLabel}:</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={valueText}>{preferredTime}</Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={labelText}>{t.reservationDateLabel}:</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={valueText}>{reservationDate}</Text>
                </Column>
              </Row>
            </Section>

            {/* Personal Information Card */}
            <Section style={card}>
              <Heading style={h3}>{t.personalInfo}</Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={labelText}>{t.nameLabel}:</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={valueText}>{name}</Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={labelText}>{t.emailLabel}:</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={valueText}>{email}</Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={labelText}>{t.phoneLabel}:</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={valueText}>{phone}</Text>
                </Column>
              </Row>

              {message && (
                <Row style={detailRow}>
                  <Column style={detailLabel}>
                    <Text style={labelText}>{t.messageLabel}:</Text>
                  </Column>
                  <Column style={detailValue}>
                    <Text style={valueText}>{message}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            {/* What Happens Next */}
            <Section style={nextStepsSection}>
              <Heading style={h3}>{t.whatHappensNext}</Heading>
              <Text style={text}>{t.whatHappensNextDescription}</Text>

              <Section style={stepCard}>
                <Text style={stepNumber}>1</Text>
                <div>
                  <Text style={stepTitle}>{t.steps.personalContact}</Text>
                  <Text style={stepDescription}>
                    {t.steps.personalContactDescription}
                  </Text>
                </div>
              </Section>

              <Section style={stepCard}>
                <Text style={stepNumber}>2</Text>
                <div>
                  <Text style={stepTitle}>{t.steps.appointmentReminder}</Text>
                  <Text style={stepDescription}>
                    {t.steps.appointmentReminderDescription}
                  </Text>
                </div>
              </Section>

              <Section style={stepCard}>
                <Text style={stepNumber}>3</Text>
                <div>
                  <Text style={stepTitle}>{t.steps.preparation}</Text>
                  <Text style={stepDescription}>
                    {t.steps.preparationDescription}
                  </Text>
                </div>
              </Section>
            </Section>

            {/* Important Information */}
            <Section style={importantSection}>
              <Heading style={h3}>{t.importantInformation}</Heading>
              {t.importantItems.map((item, index) => (
                <Text key={index} style={listItem}>
                  • {item}
                </Text>
              ))}
            </Section>

            {/* Contact Information */}
            <Section style={contactSection}>
              <Heading style={h3}>{t.contactInfo}</Heading>
              <Text style={text}>{t.contactInfoDescription}</Text>

              <Row style={contactRow}>
                <Column style={contactColumn}>
                  <Text style={contactLabel}>{t.contactPhoneLabel}:</Text>
                  <Link href="tel:+420725555095" style={contactLink}>
                    +420 725 555 095
                  </Link>
                </Column>
                <Column style={contactColumn}>
                  <Text style={contactLabel}>{t.contactEmailLabel}:</Text>
                  <Link
                    href="mailto:pulmonology.cz@gmail.com"
                    style={contactLink}
                  >
                    pulmonology.cz@gmail.com
                  </Link>
                </Column>
              </Row>

              <Text style={contactLabel}>{t.address}:</Text>
              <Text style={contactValue}>
                Masarykova 2000/92, Ústí nad Labem, 400 01
              </Text>

              <Text style={contactLabel}>{t.openingHours}:</Text>
              <Text style={contactValue}>{t.mondayToFriday}</Text>
            </Section>

            {/* CTA Button */}
            <Section style={buttonSection}>
              <Button href={`${baseUrl}/${locale}/contact`} style={button}>
                {t.contactInfo}
              </Button>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={hr} />
            <Text style={footerText}>{t.regards}</Text>
            <Text style={footerText}>{t.team}</Text>
            <Hr style={hr} />
            <Text style={smallText}>{t.footer}</Text>
            <Text style={smallText}>{t.privacyNotice}</Text>
            <Text style={smallText}>{t.unsubscribe}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AppointmentConfirmationEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const header = {
  padding: '32px 24px',
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e6e6e6',
};

const logo = {
  margin: '0 auto',
  display: 'block',
};

const content = {
  padding: '24px',
};

const h1 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.25',
  margin: '16px 0',
};

const h2 = {
  color: '#059669',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '1.2',
  margin: '24px 0 16px',
};

const h3 = {
  color: '#1f2937',
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '24px 0 16px',
};

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '16px 0',
};

const card = {
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const detailRow = {
  marginBottom: '12px',
};

const detailLabel = {
  width: '140px',
  verticalAlign: 'top',
};

const detailValue = {
  verticalAlign: 'top',
};

const labelText = {
  color: '#6b7280',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
};

const valueText = {
  color: '#1f2937',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
};

const nextStepsSection = {
  margin: '32px 0',
};

const stepCard = {
  backgroundColor: '#eff6ff',
  border: '1px solid #dbeafe',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
  display: 'flex',
  alignItems: 'flex-start',
};

const stepNumber = {
  backgroundColor: '#059669',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600',
  borderRadius: '50%',
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '16px',
  flexShrink: 0,
};

const stepTitle = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 8px',
};

const stepDescription = {
  color: '#4b5563',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0',
};

const importantSection = {
  backgroundColor: '#fef3c7',
  border: '1px solid #fbbf24',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const listItem = {
  color: '#92400e',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '8px 0',
};

const contactSection = {
  backgroundColor: '#f0fdf4',
  border: '1px solid #bbf7d0',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const contactRow = {
  margin: '16px 0',
};

const contactColumn = {
  width: '50%',
  verticalAlign: 'top',
};

const contactLabel = {
  color: '#166534',
  fontSize: '14px',
  fontWeight: '600',
  margin: '8px 0 4px',
};

const contactValue = {
  color: '#15803d',
  fontSize: '14px',
  margin: '0 0 8px',
};

const contactLink = {
  color: '#059669',
  fontSize: '14px',
  fontWeight: '500',
  textDecoration: 'none',
};

const buttonSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#059669',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const footer = {
  padding: '24px',
  backgroundColor: '#f9fafb',
  borderTop: '1px solid #e5e7eb',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '16px 0',
};

const footerText = {
  color: '#1f2937',
  fontSize: '14px',
  textAlign: 'center' as const,
  margin: '8px 0',
};

const smallText = {
  color: '#6b7280',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '4px 0',
};
