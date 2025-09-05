'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { User } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/lib/firebase';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { createSession } from './actions';
import { usePathname } from 'next/navigation';

type AuthContextType = {
  user: DecodedIdToken | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({
  children,
  user: initialUser,
}: {
  children: ReactNode;
  user: DecodedIdToken | null;
}) => {
  const [user, setUser] = useState<DecodedIdToken | null>(initialUser);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // This is for client-side Google sign in
        const idToken = await firebaseUser.getIdToken();
        const response = await fetch('/api/auth/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
        });
        if (response.ok) {
            // reload to get server session
             window.location.assign('/');
        }
      } 
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname]);

   useEffect(() => {
    if (initialUser !== undefined) {
      setUser(initialUser);
      setLoading(false);
    }
  }, [initialUser]);


  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
