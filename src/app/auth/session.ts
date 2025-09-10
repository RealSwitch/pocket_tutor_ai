
import 'server-only';
import { cookies } from 'next/headers';
import type { User } from './auth-context';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

// This function is for SERVER COMPONENTS ONLY
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
    return null;
  } catch (error) {
    console.error('Error parsing session cookie:', error);
    return null;
  }
}


// This hook is for CLIENT COMPONENTS ONLY
export function useSession(): User | null {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const sessionCookie = Cookies.get('session');
        if (sessionCookie) {
            try {
                const sessionData = JSON.parse(sessionCookie);
                if (sessionData.isLoggedIn) {
                    setUser({
                        email: sessionData.email,
                        role: sessionData.role || 'learner',
                    });
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error parsing session cookie:', error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, []);

    return user;
}
