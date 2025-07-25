import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createReservation } from '../../../lib/admin-utils';
import { sendReservationNotification } from '../../../lib/telegram';

// Validation schema matching the client-side schema
const reservationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(9, 'Phone number must be at least 9 characters'),
  service: z.enum(['moving', 'cleaning', 'packing', 'storage', 'other']),
  package: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  time: z.enum(['morning', 'afternoon', 'evening']),
  pickupAddress: z.string().optional(),
  deliveryAddress: z.string().optional(),
  address: z.string().optional(),
  apartmentSize: z.string().optional(),
  message: z.string().optional(),
  locale: z.enum(['cs', 'en', 'ua']).optional(),
});

export async function POST(request: NextRequest) {
  console.log('🔍 [API] POST /api/reservations called');

  try {
    const body = await request.json();
    console.log('🔍 [API] Request body received:', {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      service: body.service,
      package: body.package,
      date: body.date,
      time: body.time,
      locale: body.locale,
    });

    // Validate the request body
    const validatedData = reservationSchema.parse(body);
    console.log('✅ [API] Request validation passed');

    // Extract request information
    const ipAddress =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    console.log('🔍 [API] Request metadata:', { ipAddress, userAgent });

    // Prepare reservation data for Firebase
    const reservationData = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      service: validatedData.service,
      package: validatedData.package as
        | 'maintenance'
        | 'general'
        | 'postRenovation'
        | undefined,
      preferredDate: validatedData.date,
      preferredTime: validatedData.time,
      pickupAddress: validatedData.pickupAddress,
      deliveryAddress: validatedData.deliveryAddress,
      address: validatedData.address,
      apartmentSize: validatedData.apartmentSize,
      message: validatedData.message,
      source: 'website' as const,
      locale: validatedData.locale || 'cs',
      currency: 'CZK' as const,
    };

    console.log('🔍 [API] Saving to Firebase...');
    // Save to Firebase
    const reservationId = await createReservation(reservationData, {
      ipAddress,
      userAgent,
    });
    console.log(
      '✅ [API] Reservation saved to Firebase with ID:',
      reservationId,
    );

    // Prepare Telegram notification data
    const telegramData = {
      id: reservationId,
      firstName: reservationData.firstName,
      lastName: reservationData.lastName,
      email: reservationData.email,
      phone: reservationData.phone,
      service: reservationData.service,
      package: reservationData.package,
      preferredDate: reservationData.preferredDate,
      preferredTime: reservationData.preferredTime,
      pickupAddress: reservationData.pickupAddress,
      deliveryAddress: reservationData.deliveryAddress,
      address: reservationData.address,
      apartmentSize: reservationData.apartmentSize,
      message: reservationData.message,
      locale: reservationData.locale,
      createdAt: new Date().toISOString(),
    };

    console.log('🔍 [API] Sending Telegram notification...');
    console.log('🔍 [API] Telegram data prepared:', {
      id: telegramData.id,
      service: telegramData.service,
      customer: `${telegramData.firstName} ${telegramData.lastName}`,
      email: telegramData.email,
    });

    // Send Telegram notification and await it to ensure it completes
    try {
      await sendReservationNotification(telegramData);
      console.log('✅ [API] Telegram notification sent successfully');
    } catch (telegramError) {
      console.error('❌ [API] Telegram notification failed:', telegramError);
      console.error('❌ [API] Telegram error details:', {
        message: (telegramError as Error)?.message,
        stack: (telegramError as Error)?.stack,
      });
      // Don't fail the entire request if Telegram fails
    }

    console.log('✅ [API] Returning success response');
    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Reservation submitted successfully',
        reservationId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('❌ [API] Reservation submission error:', error);
    console.error('❌ [API] Error type:', (error as Error)?.constructor?.name);
    console.error('❌ [API] Error message:', (error as Error)?.message);
    console.error('❌ [API] Error stack:', (error as Error)?.stack);

    if (error instanceof z.ZodError) {
      console.log('❌ [API] Validation error, returning 400');
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: error.errors,
        },
        { status: 400 },
      );
    }

    console.log('❌ [API] Internal error, returning 500');
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
