'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from 'app/context/AuthContext';

const Provider = ({ children, session }) => {
  return (
    <SessionProvider>
      {/* {children} */}
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
};

export default Provider;
