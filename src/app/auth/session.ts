import 'server-only';
import { cookies } from 'next/headers';
import { auth as adminAuth } from 'firebase-admin';
import { initializeAdminApp } from '@/lib/firebase-admin';

export async function getCurrentUser() {
  await initializeAdminApp();
  const sessionCookie = cookies().get('session')?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await adminAuth().verifySessionCookie(sessionCookie, true);
    return decodedClaims;
  } catch (error) {
    console.error('Error verifying session cookie:', error);
    return null;
  }
}
