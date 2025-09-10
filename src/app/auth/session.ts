import 'server-only';
import { cookies } from 'next/headers';

export async function getCurrentUser() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = JSON.parse(sessionCookie);
    return decodedClaims;
  } catch (error) {
    console.error('Error parsing session cookie:', error);
    return null;
  }
}
