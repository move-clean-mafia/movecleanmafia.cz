import { TFunction } from 'i18next';

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

export const formatDate = (timestamp: any): string => {
  if (!timestamp) return 'N/A';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('cs-CZ', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
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
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: any;
  userAgent: string;
  ip: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  summary: string;
  published: boolean;
  createdAt: any;
  updatedAt: any;
}
