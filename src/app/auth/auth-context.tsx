
'use client';

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from 'react';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';


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

const unprotectedRoutes = ['/login', '/signup'];

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const sessionCookie = Cookies.get('session');
    let sessionUser = null;

    if (sessionCookie) {
      try {
        const sessionData = JSON.parse(sessionCookie);
        if (sessionData.isLoggedIn) {
            sessionUser = {
                email: sessionData.email,
                role: sessionData.role || 'learner',
            };
        }
      } catch (error) {
        console.error("Failed to parse session cookie", error);
      }
    }
    
    setUser(sessionUser);

    if (!sessionUser && !unprotectedRoutes.includes(pathname)) {
        router.push('/login');
    } else {
        setLoading(false);
    }
  }, [pathname, router]);


  if (loading && !unprotectedRoutes.includes(pathname)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
