import 'server-only';
import { cookies } from 'next/headers';

// This function is not currently used but is kept for potential server-side needs.
// Note: Directly calling this in static components like RootLayout can cause errors.
export async function getCurrentUser() {
  const sessionCookie = cookies().get('session')?.value;

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
