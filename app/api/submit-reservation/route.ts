import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    const requiredFields = [
      'name',
      'phone',
      'email',
      'preferredTime',
      'serviceType',
      'clinic',
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 },
      );
    }

    // Prepare data for Firebase
    const reservationData = {
      name: String(data.name).trim(),
      phone: String(data.phone).trim(),
      email: String(data.email).trim().toLowerCase(),
      message: data.message ? String(data.message).trim() : '',
      preferredTime: String(data.preferredTime),
      serviceType: String(data.serviceType),
      clinic: String(data.clinic),
      status: 'pending',
      createdAt: serverTimestamp(),
      userAgent: request.headers.get('user-agent') || 'unknown',
      ip: request.headers.get('x-forwarded-for') || 'unknown',
    };

    // Save to Firebase Firestore
    const docRef = await addDoc(
      collection(db, 'reservations'),
      reservationData,
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Reservation submitted successfully',
        id: docRef.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Reservation submission error:', error);

    return NextResponse.json(
      {
        error: 'Failed to submit reservation',
        details:
          process.env.NODE_ENV === 'development' ? String(error) : undefined,
      },
      { status: 500 },
    );
  }
}
