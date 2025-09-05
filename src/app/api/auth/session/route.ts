import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { auth as adminAuth } from 'firebase-admin';
import { initializeAdminApp } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  const { idToken } = await req.json();

  if (!idToken) {
    return NextResponse.json({ error: 'ID token is required' }, { status: 400 });
  }

  try {
    await initializeAdminApp();
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth().createSessionCookie(idToken, { expiresIn });
    cookies().set('session', sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error creating session cookie:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
