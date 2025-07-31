import { NextRequest, NextResponse } from 'next/server';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../../firebase';
import { isAdmin } from '../../../../../lib/auth';
import { setAuthCookie } from '../../../../../lib/auth-server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 },
      );
    }

    // Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Check if user is admin
    if (!isAdmin(user)) {
      return NextResponse.json(
        { error: 'Access denied. Admin privileges required.' },
        { status: 403 },
      );
    }

    // Get the ID token for session management
    const token = await user.getIdToken();

    // Set HTTP-only cookie for persistent authentication
    await setAuthCookie(token);

    // Create response with success
    const response = NextResponse.json(
      {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        },
      },
      { status: 200 },
    );

    return response;
  } catch (error: any) {
    console.error('Login error:', error);

    let errorMessage = 'Authentication failed';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'User not found';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Invalid password';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many failed attempts. Please try again later.';
    }

    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
