import 'server-only';
import { cookies } from 'next/headers';
import type { UserRole } from './actions';

export type User = {
    email: string;
    picture?: string;
    role: UserRole;
}

export function getSession(): User | null {
  const sessionCookie = cookies().get('session')?.value;
  if (!sessionCookie) {
    return null;
  }
  try {
    const sessionData = JSON.parse(sessionCookie);
    if (sessionData.isLoggedIn) {
      return {
        email: sessionData.email,
        role: sessionData.role || 'learner',
      };
    }
  } catch (error) {
    console.error('Error parsing session cookie:', error);
  }
  return null;
}
