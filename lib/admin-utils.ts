import { TFunction } from 'i18next';
import { format } from 'date-fns';
import { cs, enUS } from 'date-fns/locale';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

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

// Types for reservation data
export interface ReservationData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Service Details
  service: 'moving' | 'cleaning' | 'packing' | 'storage' | 'other';
  package?: 'maintenance' | 'general' | 'postRenovation';

  // Scheduling
  preferredDate: string;
  preferredTime: 'morning' | 'afternoon' | 'evening';

  // Address Information
  pickupAddress?: string;
  deliveryAddress?: string;
  address?: string;

  // Additional Details
  apartmentSize?: string;
  message?: string;

  // System Fields
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  source: 'website' | 'phone' | 'email';
  locale: 'cs' | 'en' | 'ua';
  ipAddress?: string;
  userAgent?: string;

  // Pricing
  estimatedPrice?: number;
  finalPrice?: number;
  currency: 'CZK' | 'EUR' | 'USD';

  // Admin Notes
  adminNotes?: string;
  assignedTo?: string;
}

export interface Reservation extends ReservationData {
  id: string;
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
}

/**
 * Create a new reservation in Firebase
 */
export const createReservation = async (
  reservationData: Omit<ReservationData, 'status' | 'createdAt' | 'updatedAt'>,
  requestInfo?: { ipAddress?: string; userAgent?: string },
): Promise<string> => {
  try {
    const reservationToSave = {
      ...reservationData,
      status: 'pending' as const,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ipAddress: requestInfo?.ipAddress,
      userAgent: requestInfo?.userAgent,
    };

    const docRef = await addDoc(
      collection(db, 'reservations'),
      reservationToSave,
    );
    return docRef.id;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw new Error('Failed to create reservation');
  }
};

/**
 * Get a reservation by ID
 */
export const getReservationById = async (
  id: string,
): Promise<Reservation | null> => {
  try {
    const docRef = doc(db, 'reservations', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Reservation;
    }
    return null;
  } catch (error) {
    console.error('Error getting reservation:', error);
    throw new Error('Failed to get reservation');
  }
};

/**
 * Update a reservation
 */
export const updateReservation = async (
  id: string,
  updates: Partial<ReservationData>,
): Promise<void> => {
  try {
    const docRef = doc(db, 'reservations', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating reservation:', error);
    throw new Error('Failed to update reservation');
  }
};

/**
 * Get all reservations with optional filtering
 */
export const getReservations = async (filters?: {
  status?: ReservationData['status'];
  service?: ReservationData['service'];
  limit?: number;
}): Promise<Reservation[]> => {
  try {
    let q = query(collection(db, 'reservations'));

    // Apply filters
    if (filters?.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters?.service) {
      q = query(q, where('service', '==', filters.service));
    }

    // Always order by creation date (newest first)
    q = query(q, orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);
    const reservations = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Reservation[];

    // Apply limit if specified
    if (filters?.limit) {
      return reservations.slice(0, filters.limit);
    }

    return reservations;
  } catch (error) {
    console.error('Error getting reservations:', error);
    throw new Error('Failed to get reservations');
  }
};

/**
 * Get pending reservations
 */
export const getPendingReservations = async (): Promise<Reservation[]> => {
  return getReservations({ status: 'pending' });
};

/**
 * Get reservations by service type
 */
export const getReservationsByService = async (
  service: ReservationData['service'],
): Promise<Reservation[]> => {
  return getReservations({ service });
};
