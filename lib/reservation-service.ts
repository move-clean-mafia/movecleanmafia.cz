import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export interface ReservationData {
  name: string;
  phone: string;
  email: string;
  message?: string;
  preferredTime: string;
  serviceType: string;
  clinic: string;
}

// Option 1: Direct Firestore write (requires permissive rules)
export const submitReservationDirect = async (data: ReservationData) => {
  const reservationData = {
    ...data,
    status: 'pending',
    createdAt: serverTimestamp(),
  };

  return await addDoc(collection(db, 'reservations'), reservationData);
};

// Option 2: Submit via HTTP endpoint (Cloud Function)
export const submitReservationViaApi = async (data: ReservationData) => {
  const response = await fetch('/api/submit-reservation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit reservation');
  }

  return await response.json();
};

// Option 3: With reCAPTCHA verification
export const submitReservationWithCaptcha = async (
  data: ReservationData,
  recaptchaToken: string,
) => {
  const response = await fetch('/api/submit-reservation-secure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      recaptchaToken,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit reservation');
  }

  return await response.json();
};
