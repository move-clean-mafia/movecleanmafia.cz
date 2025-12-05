import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createReservation } from '../../../lib/admin-utils';
import { sendReservationNotification } from '../../../lib/telegram';
import { sendReservationConfirmationEmail } from '../../../lib/email';

// Validation schema matching the client-side schema
const reservationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(9, 'Phone number must be at least 9 characters'),
  service: z
    .enum([
      'moving',
      'cleaning',
      'packing',
      'furniture-cleaning',
      'handyman',
      'packages',
      'other',
    ])
    .optional(),
  package: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  time: z
    .enum(['morning', 'afternoon', 'evening', 'night', 'by-agreement'])
    .optional(),
  pickupAddress: z.string().optional(),
  deliveryAddress: z.string().optional(),
  address: z.string().optional(),
  apartmentSize: z.string().optional(),
  message: z.string().optional(),
  locale: z.enum(['cs', 'en', 'ua']).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = reservationSchema.parse(body);

    // Extract request information
    const ipAddress =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

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

    // Filter out undefined values to prevent Firebase errors
    const cleanReservationData = Object.fromEntries(
      Object.entries(reservationData).filter(
        ([_, value]) => value !== undefined,
      ),
    ) as any;

    // Save to Firebase
    const reservationId = await createReservation(cleanReservationData, {
      ipAddress,
      userAgent,
    });

    // Prepare Telegram notification data
    const telegramData = {
      id: reservationId,
      firstName: reservationData.firstName,
      lastName: reservationData.lastName || '',
      email: reservationData.email,
      phone: reservationData.phone,
      service: reservationData.service || 'other',
      package: reservationData.package,
      preferredDate: reservationData.preferredDate,
      preferredTime: reservationData.preferredTime || 'morning',
      pickupAddress: reservationData.pickupAddress,
      deliveryAddress: reservationData.deliveryAddress,
      address: reservationData.address,
      apartmentSize: reservationData.apartmentSize,
      message: reservationData.message,
      locale: reservationData.locale,
      createdAt: new Date().toISOString(),
    };

    // Send Telegram notification and await it to ensure it completes
    try {
      await sendReservationNotification(telegramData);
    } catch (telegramError) {
      console.error('❌ [API] Telegram notification failed:', telegramError);
      // Don't fail the entire request if Telegram fails
    }

    // Send confirmation email to the user
    try {
      await sendReservationConfirmationEmail({
        firstName: reservationData.firstName,
        lastName: reservationData.lastName,
        email: reservationData.email,
        phone: reservationData.phone,
        service: reservationData.service || 'other',
        package: reservationData.package,
        preferredDate: reservationData.preferredDate,
        preferredTime: reservationData.preferredTime || 'morning',
        pickupAddress: reservationData.pickupAddress,
        deliveryAddress: reservationData.deliveryAddress,
        address: reservationData.address,
        apartmentSize: reservationData.apartmentSize,
        message: reservationData.message,
        locale: reservationData.locale,
        reservationId,
      });
    } catch (emailError) {
      console.error('❌ [API] Confirmation email failed:', emailError);
      // Don't fail the entire request if email fails
    }

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

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: error,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
