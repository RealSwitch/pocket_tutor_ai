
'use client';

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from 'react';
import Cookies from 'js-cookie';


type UserRole = 'learner' | 'teacher';

type User = {
    email: string;
    picture?: string;
    role: UserRole;
}

type AuthContextType = {
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
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
        }
      } catch (error) {
        console.error("Failed to parse session cookie", error);
        setUser(null);
      }
    }
  }, []);


  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
