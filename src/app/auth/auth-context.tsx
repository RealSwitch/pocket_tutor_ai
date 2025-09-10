
'use client';

import { useContext, createContext } from 'react';
import { useSession } from './session';

type UserRole = 'learner' | 'teacher';

export type User = {
    email: string;
    picture?: string;
    role: UserRole;
}

// A session will be available if the middleware has redirected.
// We can assert that the session is not null.
export const useAuth = () => {
    return useContext(AuthContext)!;
}

const AuthContext = createContext<User | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const session = useSession();
    return (
        <AuthContext.Provider value={session}>
            {children}
        </AuthContext.Provider>
    );
}
