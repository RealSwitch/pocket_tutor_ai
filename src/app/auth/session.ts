
'use client';

import type { User } from './auth-context';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

type Session = {
  user: User | null;
  isLoggedIn: boolean;
  checked: boolean; // Add a 'checked' flag
};

export function useSession(): Session {
  const [session, setSession] = useState<Session>({
    user: null,
    isLoggedIn: false,
    checked: false, // Start with checked as false
  });

  useEffect(() => {
    const sessionCookie = Cookies.get('session');
    let user: User | null = null;
    let isLoggedIn = false;

    if (sessionCookie) {
      try {
        const sessionData = JSON.parse(sessionCookie);
        if (sessionData.isLoggedIn) {
          isLoggedIn = true;
          user = {
            email: sessionData.email,
            role: sessionData.role || 'learner',
          };
        }
      } catch (error) {
        console.error('Error parsing session cookie:', error);
      }
    }
    // Set the session state and mark as checked
    setSession({ user, isLoggedIn, checked: true });
  }, []);

  return session;
}
