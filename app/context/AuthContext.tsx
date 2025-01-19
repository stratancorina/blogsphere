// context/AuthContext.ts
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

type AuthContextType = {
  role: string;
  session: any; // You can specify more precise types if needed
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [role, setRole] = useState<string>('user');

  useEffect(() => {
    if (session?.user?.role) {
      setRole(session.user.role);
    }
  }, [session]);

  return (
    <AuthContext.Provider value={{ role, session }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
