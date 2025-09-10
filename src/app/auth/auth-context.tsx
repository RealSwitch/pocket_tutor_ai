
'use client';

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

type UserRole = 'learner' | 'teacher';

type User = {
    email: string;
    picture?: string;
    role: UserRole;
}

type AuthContextType = {
  user: User | null;
};

// Mock user as a teacher for now
const mockUser: User = {
    email: 'teacher@example.com',
    role: 'teacher',
}

const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const AuthProvider = ({
  children,
  user: initialUser,
}: {
  children: ReactNode;
  user: User | null;
}) => {
  const [user, setUser] = useState<User | null>(mockUser);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
