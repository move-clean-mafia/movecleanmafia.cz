import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

// Server-side auth utilities
export const getServerAuth = async (
  request: NextRequest,
): Promise<any | null> => {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return null;
    }

    // Verify token with Firebase Admin SDK would be better here
    // For now, we'll use a simple approach
    return null;
  } catch (error) {
    console.error('Error getting server auth:', error);
    return null;
  }
};

export const setAuthCookie = async (token: string): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
};

export const clearAuthCookie = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
};
