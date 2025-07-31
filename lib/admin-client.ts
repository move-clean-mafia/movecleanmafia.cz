import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Reservation } from './admin-utils';

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  service: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  date: string;
  time: string;
  address: string;
  message?: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  preferredDate: string;
  preferredTime: string;
  pickupAddress?: string;
  deliveryAddress?: string;
  apartmentSize?: string;
  package?: string;
  currency: string;
  estimatedPrice?: number;
  finalPrice?: number;
  locale: string;
  source: string;
}

// Helper function to safely convert Firebase timestamp to ISO string
const convertTimestampToISO = (timestamp: any): string => {
  try {
    if (!timestamp) return '';

    // If it's a Firebase Timestamp object
    if (timestamp && typeof timestamp.toDate === 'function') {
      return timestamp.toDate().toISOString();
    }

    // If it's already a Date object
    if (timestamp instanceof Date) {
      return timestamp.toISOString();
    }

    // If it's a string, try to parse it
    if (typeof timestamp === 'string') {
      const date = new Date(timestamp);
      if (!isNaN(date.getTime())) {
        return date.toISOString();
      }
    }

    // If it's a number (timestamp)
    if (typeof timestamp === 'number') {
      const date = new Date(timestamp);
      if (!isNaN(date.getTime())) {
        return date.toISOString();
      }
    }

    // If it's an object with seconds and nanoseconds
    if (timestamp && typeof timestamp === 'object' && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      if (!isNaN(date.getTime())) {
        return date.toISOString();
      }
    }

    return '';
  } catch (error) {
    console.error('Error converting timestamp:', error, timestamp);
    return '';
  }
};

export const fetchReservations = async (
  page: number = 1,
  pageSize: number = 10,
): Promise<{
  bookings: Booking[];
  total: number;
  hasMore: boolean;
}> => {
  try {
    const reservationsRef = collection(db, 'reservations');
    const q = query(reservationsRef, orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);
    const allReservations = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Reservation[];

    console.log('Raw reservations from Firebase:', allReservations);

    // Convert to Booking format
    const bookings: Booking[] = allReservations.map((reservation) => {
      console.log(
        'Processing reservation:',
        reservation.id,
        'createdAt:',
        reservation.createdAt,
      );

      return {
        id: reservation.id,
        customerName:
          `${reservation.firstName || ''} ${reservation.lastName || ''}`.trim(),
        email: reservation.email || '',
        phone: reservation.phone || '',
        service: reservation.service || '',
        status: reservation.status || 'pending',
        date: reservation.preferredDate || '',
        time: reservation.preferredTime || '',
        address:
          reservation.pickupAddress ||
          reservation.deliveryAddress ||
          reservation.address ||
          '',
        message: reservation.message || '',
        createdAt: convertTimestampToISO(reservation.createdAt),
        firstName: reservation.firstName || '',
        lastName: reservation.lastName || '',
        preferredDate: reservation.preferredDate || '',
        preferredTime: reservation.preferredTime || '',
        pickupAddress: reservation.pickupAddress || '',
        deliveryAddress: reservation.deliveryAddress || '',
        apartmentSize: reservation.apartmentSize || '',
        package: reservation.package || '',
        currency: reservation.currency || 'CZK',
        estimatedPrice: reservation.estimatedPrice || 0,
        finalPrice: reservation.finalPrice || 0,
        locale: reservation.locale || 'cs',
        source: reservation.source || 'website',
      };
    });

    console.log('Processed bookings:', bookings);

    // Calculate pagination
    const total = bookings.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedBookings = bookings.slice(startIndex, endIndex);
    const hasMore = endIndex < total;

    return {
      bookings: paginatedBookings,
      total,
      hasMore,
    };
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw new Error('Failed to fetch reservations');
  }
};

export const createReservation = async (
  bookingData: Partial<Booking>,
): Promise<string> => {
  try {
    const reservationData = {
      firstName: bookingData.firstName || '',
      lastName: bookingData.lastName || '',
      email: bookingData.email || '',
      phone: bookingData.phone || '',
      service: bookingData.service || 'moving',
      package: bookingData.package || '',
      preferredDate: bookingData.preferredDate || '',
      preferredTime: bookingData.preferredTime || 'morning',
      pickupAddress: bookingData.pickupAddress || '',
      deliveryAddress: bookingData.deliveryAddress || '',
      address: bookingData.address || '',
      apartmentSize: bookingData.apartmentSize || '',
      message: bookingData.message || '',
      status: bookingData.status || 'pending',
      currency: bookingData.currency || 'CZK',
      estimatedPrice: bookingData.estimatedPrice || 0,
      finalPrice: bookingData.finalPrice || 0,
      locale: bookingData.locale || 'cs',
      source: bookingData.source || 'website',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(
      collection(db, 'reservations'),
      reservationData,
    );
    return docRef.id;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw new Error('Failed to create reservation');
  }
};

export const updateReservation = async (
  id: string,
  bookingData: Partial<Booking>,
): Promise<void> => {
  try {
    const reservationRef = doc(db, 'reservations', id);

    const updateData = {
      firstName: bookingData.firstName || '',
      lastName: bookingData.lastName || '',
      email: bookingData.email || '',
      phone: bookingData.phone || '',
      service: bookingData.service || 'moving',
      package: bookingData.package || '',
      preferredDate: bookingData.preferredDate || '',
      preferredTime: bookingData.preferredTime || 'morning',
      pickupAddress: bookingData.pickupAddress || '',
      deliveryAddress: bookingData.deliveryAddress || '',
      address: bookingData.address || '',
      apartmentSize: bookingData.apartmentSize || '',
      message: bookingData.message || '',
      status: bookingData.status || 'pending',
      currency: bookingData.currency || 'CZK',
      estimatedPrice: bookingData.estimatedPrice || 0,
      finalPrice: bookingData.finalPrice || 0,
      locale: bookingData.locale || 'cs',
      source: bookingData.source || 'website',
      updatedAt: serverTimestamp(),
    };

    await updateDoc(reservationRef, updateData);
  } catch (error) {
    console.error('Error updating reservation:', error);
    throw new Error('Failed to update reservation');
  }
};

export const updateReservationStatus = async (
  id: string,
  status: Booking['status'],
): Promise<void> => {
  try {
    const reservationRef = doc(db, 'reservations', id);
    await updateDoc(reservationRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating reservation status:', error);
    throw new Error('Failed to update reservation status');
  }
};

export const getReservationStats = async (): Promise<{
  total: number;
  pending: number;
  confirmed: number;
  inProgress: number;
  completed: number;
  cancelled: number;
}> => {
  try {
    const reservationsRef = collection(db, 'reservations');
    const querySnapshot = await getDocs(reservationsRef);

    const reservations = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Reservation[];

    const stats = {
      total: reservations.length,
      pending: reservations.filter((r) => r.status === 'pending').length,
      confirmed: reservations.filter((r) => r.status === 'confirmed').length,
      inProgress: reservations.filter((r) => r.status === 'in_progress').length,
      completed: reservations.filter((r) => r.status === 'completed').length,
      cancelled: reservations.filter((r) => r.status === 'cancelled').length,
    };

    return stats;
  } catch (error) {
    console.error('Error fetching reservation stats:', error);
    return {
      total: 0,
      pending: 0,
      confirmed: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0,
    };
  }
};
