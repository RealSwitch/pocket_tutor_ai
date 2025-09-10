
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from './session';
import { Loader2 } from 'lucide-react';

export type UserRole = 'learner' | 'teacher';

export type User = {
    email: string;
    picture?: string;
    role: UserRole;
}

type AuthContextType = {
  session: { user: User | null; isLoggedIn: boolean } | null;
  // In case we need more auth-related functions later
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const publicPaths = ['/login', '/signup'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Don't run redirect logic until the session has been checked
    if (session.checked) {
      setIsLoading(false);
      const isPublic = publicPaths.includes(pathname);
      
      if (!session.isLoggedIn && !isPublic) {
        router.push('/login');
      } else if (session.isLoggedIn && isPublic) {
        router.push('/');
      }
    }
  }, [session.isLoggedIn, session.checked, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Prevent rendering protected routes until auth check is complete
  if (!session.isLoggedIn && !publicPaths.includes(pathname)) {
    return null;
  }
  
  // Prevent rendering public routes if logged in
  if (session.isLoggedIn && publicPaths.includes(pathname)) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
