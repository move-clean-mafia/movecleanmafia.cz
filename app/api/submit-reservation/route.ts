import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import { sendAppointmentConfirmationEmail } from '../../../lib/email-service';
import { type SupportedLanguage } from '../../../lib/i18n';

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
      'reservationDate',
      'locale',
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

    // Validate locale
    const supportedLocales = ['cs', 'en'];
    if (!supportedLocales.includes(data.locale)) {
      return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
    }

    // Validate and parse reservation date
    let reservationDate: Date;
    try {
      reservationDate = new Date(data.reservationDate);
      if (isNaN(reservationDate.getTime())) {
        throw new Error('Invalid date');
      }
    } catch {
      return NextResponse.json(
        { error: 'Invalid reservation date format' },
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
      reservationDate: reservationDate,
      locale: String(data.locale),
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

    // Send confirmation email
    try {
      const emailResult = await sendAppointmentConfirmationEmail({
        name: reservationData.name,
        email: reservationData.email,
        phone: reservationData.phone,
        service: reservationData.serviceType,
        clinic: reservationData.clinic,
        preferredTime: reservationData.preferredTime,
        reservationDate: reservationData.reservationDate.toISOString(),
        message: reservationData.message,
        reservationId: docRef.id,
        locale: reservationData.locale as SupportedLanguage,
      });

      if (!emailResult.success) {
        console.error('Failed to send confirmation email:', emailResult.error);
        // Note: We don't fail the reservation if email fails
        // The reservation is still created successfully
      }
    } catch (emailError) {
      console.error('Email service error:', emailError);
      // Continue with successful response even if email fails
    }

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
