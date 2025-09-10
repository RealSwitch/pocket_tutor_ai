
'use client';

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

type User = {
    email: string;
    picture?: string;
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false, // Set loading to false by default
});

export const AuthProvider = ({
  children,
  user: initialUser,
}: {
  children: ReactNode;
  user: User | null;
}) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(false); // No longer true by default

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
