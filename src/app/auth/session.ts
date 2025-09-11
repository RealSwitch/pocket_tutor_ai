
import 'server-only'
import { cookies } from 'next/headers'
import type { UserRole } from './actions';

export type User = {
    email: string;
    picture?: string;
    role: UserRole;
}

type Session = {
  user: User | null;
  isLoggedIn: boolean;
};

export async function getSession(): Promise<Session> {
  const sessionCookie = (await cookies()).get('session')?.value
  if (!sessionCookie) {
    return { user: null, isLoggedIn: false }
  }

  try {
    const sessionData = JSON.parse(sessionCookie);
    if (sessionData.isLoggedIn) {
        return { 
            user: { email: sessionData.email, role: sessionData.role }, 
            isLoggedIn: true 
        };
    }
  } catch (error) {
    console.error('Could not parse session cookie:', error);
  }

  return { user: null, isLoggedIn: false };
}

