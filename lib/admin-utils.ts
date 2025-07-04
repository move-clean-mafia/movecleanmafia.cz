import { TFunction } from 'i18next';
import { format } from 'date-fns';
import { cs, enUS } from 'date-fns/locale';
import { Timestamp } from 'firebase/firestore';

// Type for Firebase timestamp or Date
export type FirebaseTimestamp = Timestamp | Date | string | null | undefined;

export const translateServiceType = (
  serviceType: string,
  t: TFunction,
): string => {
  const serviceMap: { [key: string]: string } = {
    consultation: t('reservation.services.consultation'),
    examination: t('reservation.services.examination'),
    'follow-up': t('reservation.services.followUp'),
    spirometry: t('reservation.services.spirometry'),
    bronchoscopy: t('reservation.services.bronchoscopy'),
    'allergy-testing': t('reservation.services.allergyTesting'),
    urgent: t('reservation.services.urgent'),
  };
  return serviceMap[serviceType] || serviceType;
};

export const translatePreferredTime = (
  preferredTime: string,
  t: TFunction,
): string => {
  const timeMap: { [key: string]: string } = {
    'no-preference': t('reservation.timeOptions.noPreference'),
    morning: t('reservation.timeOptions.morning'),
    afternoon: t('reservation.timeOptions.afternoon'),
    evening: t('reservation.timeOptions.evening'),
  };
  return timeMap[preferredTime] || preferredTime;
};

export const translateClinic = (clinic: string, t: TFunction): string => {
  const clinicMap: { [key: string]: string } = {
    main: t('reservation.clinics.main'),
    branch: t('reservation.clinics.branch'),
  };
  return clinicMap[clinic] || clinic;
};

export const translateStatus = (status: string, t: TFunction): string => {
  const statusMap: { [key: string]: string } = {
    pending: t('admin.status.pending'),
    confirmed: t('admin.status.confirmed'),
    cancelled: t('admin.status.cancelled'),
    completed: t('admin.status.completed'),
  };
  return statusMap[status] || status;
};

export const getDateLocale = (locale: string) => {
  return locale === 'cs' ? cs : enUS;
};

export const formatDate = (
  timestamp: FirebaseTimestamp,
  formatString: string = 'PPP',
  locale: string = 'cs',
): string => {
  if (!timestamp) return '';

  try {
    let dateObj: Date;

    if (timestamp instanceof Timestamp) {
      dateObj = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      dateObj = timestamp;
    } else if (typeof timestamp === 'string') {
      dateObj = new Date(timestamp);
    } else {
      return '';
    }

    // Validate that the date is valid
    if (isNaN(dateObj.getTime())) {
      return '';
    }

    return format(dateObj, formatString, { locale: getDateLocale(locale) });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

export const formatTime = (
  timestamp: FirebaseTimestamp,
  locale: string = 'cs',
): string => {
  return formatDate(timestamp, 'HH:mm', locale);
};

export const formatDateTime = (
  timestamp: FirebaseTimestamp,
  locale: string = 'cs',
): string => {
  return formatDate(timestamp, 'PPP HH:mm', locale);
};

// Legacy function for backward compatibility - uses old format
export const formatDateLegacy = (timestamp: FirebaseTimestamp): string => {
  if (!timestamp) return 'N/A';

  try {
    let date: Date;

    if (timestamp instanceof Timestamp) {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === 'string') {
      date = new Date(timestamp);
    } else {
      return 'N/A';
    }

    // Validate that the date is valid
    if (isNaN(date.getTime())) {
      return 'N/A';
    }

    return date.toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    console.error('Error formatting legacy date:', error);
    return 'N/A';
  }
};

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  preferredTime: string;
  serviceType: string;
  clinic: string;
  reservationDate: FirebaseTimestamp;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: FirebaseTimestamp;
  userAgent: string;
  ip: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  perex: string;
  mainImage: string;
  published: boolean;
  publishedAt: FirebaseTimestamp;
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
}

// Interface for client-side news items (with ISO string timestamps)
export interface ClientNewsItem {
  id: string;
  title: string;
  content: string;
  perex: string;
  mainImage: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}
