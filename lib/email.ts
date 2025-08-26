import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ReservationEmailData {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  service: string;
  package?: string;
  preferredDate: string;
  preferredTime: string;
  pickupAddress?: string;
  deliveryAddress?: string;
  address?: string;
  apartmentSize?: string;
  message?: string;
  locale: 'cs' | 'en' | 'ua';
  reservationId: string;
}

export interface EmailTemplateData {
  subject: string;
  html: string;
}

export const sendReservationConfirmationEmail = async (
  data: ReservationEmailData,
): Promise<void> => {
  try {
    const { subject, html } = generateReservationEmailTemplate(data);

    await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        'MoveCleanMafia.cz <noreply@movecleanmafia.cz>',
      to: data.email,
      subject,
      html,
    });

    console.log(`Reservation confirmation email sent to ${data.email}`);
  } catch (error) {
    console.error('Failed to send reservation confirmation email:', error);
    throw new Error('Failed to send confirmation email');
  }
};

const generateReservationEmailTemplate = (
  data: ReservationEmailData,
): EmailTemplateData => {
  const {
    firstName,
    service,
    package: servicePackage,
    preferredDate,
    preferredTime,
    pickupAddress,
    deliveryAddress,
    address,
    apartmentSize,
    message,
    locale,
    reservationId,
  } = data;

  // Get localized content based on locale
  const content = getLocalizedContent(locale);

  // Format date for display
  const formattedDate = new Date(preferredDate).toLocaleDateString(
    locale === 'cs' ? 'cs-CZ' : locale === 'ua' ? 'uk-UA' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  );

  // Get service display name
  const serviceDisplayName = getServiceDisplayName(service, locale);
  const packageDisplayName = servicePackage
    ? getPackageDisplayName(servicePackage, locale)
    : null;

  const subject = content.subject.replace('{service}', serviceDisplayName);

  const html = `
		<!DOCTYPE html>
		<html lang="${locale}">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>${subject}</title>
			<style>
				body {
					font-family: Arial, sans-serif;
					line-height: 1.6;
					color: #333;
					max-width: 600px;
					margin: 0 auto;
					padding: 20px;
					background-color: #f4f4f4;
				}
				.container {
					background-color: #ffffff;
					padding: 30px;
					border-radius: 8px;
					box-shadow: 0 2px 10px rgba(0,0,0,0.1);
				}
				.header {
					text-align: center;
					margin-bottom: 30px;
					padding-bottom: 20px;
					border-bottom: 2px solid #d6b977;
				}
				.logo {
					font-size: 24px;
					font-weight: bold;
					color: #d6b977;
					margin-bottom: 10px;
				}
				.tagline {
					color: #666;
					font-size: 14px;
				}
				.greeting {
					font-size: 18px;
					margin-bottom: 20px;
					color: #333;
				}
				.reservation-details {
					background-color: #f9f9f9;
					padding: 20px;
					border-radius: 6px;
					margin: 20px 0;
				}
				.detail-row {
					display: flex;
					justify-content: space-between;
					margin-bottom: 10px;
					padding: 8px 0;
					border-bottom: 1px solid #eee;
				}
				.detail-row:last-child {
					border-bottom: none;
				}
				.detail-label {
					font-weight: bold;
					color: #555;
					min-width: 120px;
				}
				.detail-value {
					color: #333;
					text-align: right;
				}
				.message-section {
					margin: 20px 0;
					padding: 15px;
					background-color: #fff3cd;
					border-left: 4px solid #d6b977;
					border-radius: 4px;
				}
				.footer {
					margin-top: 30px;
					padding-top: 20px;
					border-top: 1px solid #eee;
					text-align: center;
					font-size: 14px;
					color: #666;
				}
				.contact-info {
					margin: 15px 0;
					text-align: center;
				}
				.contact-info a {
					color: #d6b977;
					text-decoration: none;
				}
				.contact-info a:hover {
					text-decoration: underline;
				}
				.reservation-id {
					background-color: #e9ecef;
					padding: 10px;
					border-radius: 4px;
					text-align: center;
					font-family: monospace;
					font-size: 12px;
					color: #666;
					margin: 20px 0;
				}
			</style>
		</head>
		<body>
			<div class="container">
				<div class="header">
					<div class="logo">MoveCleanMafia.cz</div>
					<div class="tagline">${content.tagline}</div>
				</div>

				<div class="greeting">${content.greeting.replace('{firstName}', firstName)}</div>

				<div class="reservation-details">
					<h3 style="margin-top: 0; color: #d6b977;">${content.reservationDetails}</h3>
					
					<div class="detail-row">
						<span class="detail-label">${content.service}:</span>
						<span class="detail-value">${serviceDisplayName}</span>
					</div>
					
					${
            packageDisplayName
              ? `
					<div class="detail-row">
						<span class="detail-label">${content.package}:</span>
						<span class="detail-value">${packageDisplayName}</span>
					</div>
					`
              : ''
          }
					
					<div class="detail-row">
						<span class="detail-label">${content.date}:</span>
						<span class="detail-value">${formattedDate}</span>
					</div>
					
					<div class="detail-row">
						<span class="detail-label">${content.time}:</span>
						<span class="detail-value">${getTimeDisplayName(preferredTime, locale)}</span>
					</div>
					
					${
            pickupAddress
              ? `
					<div class="detail-row">
						<span class="detail-label">${content.pickupAddress}:</span>
						<span class="detail-value">${pickupAddress}</span>
					</div>
					`
              : ''
          }
					
					${
            deliveryAddress
              ? `
					<div class="detail-row">
						<span class="detail-label">${content.deliveryAddress}:</span>
						<span class="detail-value">${deliveryAddress}</span>
					</div>
					`
              : ''
          }
					
					${
            address
              ? `
					<div class="detail-row">
						<span class="detail-label">${content.address}:</span>
						<span class="detail-value">${address}</span>
					</div>
					`
              : ''
          }
					
					${
            apartmentSize
              ? `
					<div class="detail-row">
						<span class="detail-label">${content.apartmentSize}:</span>
						<span class="detail-value">${apartmentSize} m²</span>
					</div>
					`
              : ''
          }
				</div>

				${
          message
            ? `
				<div class="message-section">
					<strong>${content.message}:</strong><br>
					${message}
				</div>
				`
            : ''
        }

				<div class="reservation-id">
					${content.reservationId}: ${reservationId}
				</div>

				<div class="message-section">
					<strong>${content.nextSteps.title}:</strong><br>
					${content.nextSteps.description}
				</div>

				<div class="contact-info">
					<strong>${content.contactInfo.title}:</strong><br>
					${content.contactInfo.phone}: <a href="tel:+420774635981">+420 774 635 981</a><br>
					${content.contactInfo.email}: <a href="mailto:move.cleanmafia@gmail.com">move.cleanmafia@gmail.com</a>
				</div>

				<div class="footer">
					${content.footer}
				</div>
			</div>
		</body>
		</html>
	`;

  return { subject, html };
};

const getLocalizedContent = (locale: string) => {
  const content = {
    cs: {
      subject: 'Potvrzení rezervace - {service}',
      tagline:
        'Profesionální stěhování a úklid - vaše spolehlivost je naší prioritou',
      greeting: 'Dobrý den {firstName},',
      reservationDetails: 'Detaily rezervace',
      service: 'Služba',
      package: 'Balíček',
      date: 'Datum',
      time: 'Čas',
      pickupAddress: 'Adresa vyzvednutí',
      deliveryAddress: 'Doručovací adresa',
      address: 'Adresa',
      apartmentSize: 'Velikost bytu',
      message: 'Zpráva',
      reservationId: 'Číslo rezervace',
      nextSteps: {
        title: 'Další kroky',
        description:
          'Naše týmy vás budou kontaktovat v nejbližší době pro potvrzení všech detailů a sjednání přesného času příjezdu. Pokud máte jakékoli dotazy, neváhejte nás kontaktovat.',
      },
      contactInfo: {
        title: 'Kontaktní informace',
        phone: 'Telefon',
        email: 'Email',
      },
      footer: 'Děkujeme za vaši důvěru. Těšíme se na spolupráci!',
    },
    en: {
      subject: 'Reservation Confirmation - {service}',
      tagline:
        'Professional moving and cleaning - your reliability is our priority',
      greeting: 'Hello {firstName},',
      reservationDetails: 'Reservation Details',
      service: 'Service',
      package: 'Package',
      date: 'Date',
      time: 'Time',
      pickupAddress: 'Pickup Address',
      deliveryAddress: 'Delivery Address',
      address: 'Address',
      apartmentSize: 'Apartment Size',
      message: 'Message',
      reservationId: 'Reservation ID',
      nextSteps: {
        title: 'Next Steps',
        description:
          "Our team will contact you shortly to confirm all details and arrange the exact arrival time. If you have any questions, please don't hesitate to contact us.",
      },
      contactInfo: {
        title: 'Contact Information',
        phone: 'Phone',
        email: 'Email',
      },
      footer: 'Thank you for your trust. We look forward to working with you!',
    },
    ua: {
      subject: 'Підтвердження бронювання - {service}',
      tagline:
        'Професійні послуги переїзду та прибирання - ваша надійність є нашим пріоритетом',
      greeting: 'Вітаю {firstName},',
      reservationDetails: 'Деталі бронювання',
      service: 'Послуга',
      package: 'Пакет',
      date: 'Дата',
      time: 'Час',
      pickupAddress: 'Адреса завантаження',
      deliveryAddress: 'Адреса розвантаження',
      address: 'Адреса',
      apartmentSize: 'Розмір квартири',
      message: 'Повідомлення',
      reservationId: 'Номер бронювання',
      nextSteps: {
        title: 'Наступні кроки',
        description:
          "Наша команда зв'яжеться з вами найближчим часом для підтвердження всіх деталей та узгодження точного часу прибуття. Якщо у вас є питання, не соромтеся звертатися до нас.",
      },
      contactInfo: {
        title: 'Контактна інформація',
        phone: 'Телефон',
        email: 'Email',
      },
      footer: 'Дякуємо за вашу довіру. Ми з нетерпінням чекаємо на співпрацю!',
    },
  };

  return content[locale as keyof typeof content] || content.en;
};

const getServiceDisplayName = (service: string, locale: string): string => {
  const services = {
    cs: {
      moving: 'Stěhování',
      cleaning: 'Úklid',
      packing: 'Balenie',
      'furniture-cleaning': 'Čištění nábytku',
      handyman: 'Údržbářské práce',
      packages: 'Speciální balíčky služeb',
      other: 'Jiné',
    },
    en: {
      moving: 'Moving',
      cleaning: 'Cleaning',
      packing: 'Packing',
      'furniture-cleaning': 'Furniture Cleaning',
      handyman: 'Handyman Services',
      packages: 'Special Service Packages',
      other: 'Other',
    },
    ua: {
      moving: 'Переїзд',
      cleaning: 'Прибирання',
      packing: 'Пакування',
      'furniture-cleaning': 'Чищення меблів',
      handyman: 'Побутові послуги',
      packages: 'Спеціальні пакети послуг',
      other: 'Інше',
    },
  };

  return (
    services[locale as keyof typeof services]?.[
      service as keyof typeof services.cs
    ] || service
  );
};

const getPackageDisplayName = (packageName: string, locale: string): string => {
  const packages = {
    cs: {
      maintenance: 'Základní úklid',
      general: 'Pravidelný úklid',
      postRenovation: 'Generální úklid',
    },
    en: {
      maintenance: 'Basic Cleaning',
      general: 'Regular Cleaning',
      postRenovation: 'General Cleaning',
    },
    ua: {
      maintenance: 'Базове прибирання',
      general: 'Регулярне прибирання',
      postRenovation: 'Генеральне прибирання',
    },
  };

  return (
    packages[locale as keyof typeof packages]?.[
      packageName as keyof typeof packages.cs
    ] || packageName
  );
};

const getTimeDisplayName = (time: string, locale: string): string => {
  const times = {
    cs: {
      morning: 'Ráno (8:00-12:00)',
      afternoon: 'Odpoledne (12:00-16:00)',
      evening: 'Večer (16:00-20:00)',
      night: 'Noční čas (20:00-8:00)',
    },
    en: {
      morning: 'Morning (8:00-12:00)',
      afternoon: 'Afternoon (12:00-16:00)',
      evening: 'Evening (16:00-20:00)',
      night: 'Night time (20:00-8:00)',
    },
    ua: {
      morning: 'Ранок (8:00-12:00)',
      afternoon: 'Обід (12:00-16:00)',
      evening: 'Вечір (16:00-20:00)',
      night: 'Нічний час (20:00-8:00)',
    },
  };

  return (
    times[locale as keyof typeof times]?.[time as keyof typeof times.cs] || time
  );
};
