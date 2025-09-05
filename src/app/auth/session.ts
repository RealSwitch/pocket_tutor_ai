import 'server-only';
import { cookies } from 'next/headers';
import { auth as adminAuth } from 'firebase-admin';
import { initializeAdminApp } from '@/lib/firebase-admin';

export async function getCurrentUser() {
  const sessionCookie = cookies().get('session')?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    await initializeAdminApp();
    const decodedClaims = await adminAuth().verifySessionCookie(sessionCookie, true);
    return decodedClaims;
  } catch (error) {
    // Gracefully handle cases where the admin app might fail to initialize
    // or the session cookie is invalid.
    console.error('Error verifying session cookie:', error);
    return null;
  }
}
