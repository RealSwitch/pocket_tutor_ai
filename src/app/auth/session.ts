
'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import type { User } from './auth-context';

type Session = {
  user: User | null;
  isLoggedIn: boolean;
  checked: boolean; // Indicates if the initial session check is complete
};

export function useSession(): Session {
  const [session, setSession] = useState<Session>({
    user: null,
    isLoggedIn: false,
    checked: false,
  });

  useEffect(() => {
    try {
      const sessionCookie = Cookies.get('session');
      if (sessionCookie) {
        const sessionData = JSON.parse(sessionCookie);
        if (sessionData.isLoggedIn) {
          setSession({
            user: { email: sessionData.email, role: sessionData.role },
            isLoggedIn: true,
            checked: true,
          });
          return;
        }
      }
    } catch (error) {
      console.error('Could not parse session cookie:', error);
    }
    setSession({ user: null, isLoggedIn: false, checked: true });
  }, []);

  return session;
}
