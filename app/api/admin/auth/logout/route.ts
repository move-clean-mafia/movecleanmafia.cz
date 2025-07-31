import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie } from '../../../../../lib/auth-server';

export async function POST(_request: NextRequest) {
  try {
    // Clear the auth cookie
    await clearAuthCookie();

    // Create response with success
    const response = NextResponse.json({ success: true }, { status: 200 });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
