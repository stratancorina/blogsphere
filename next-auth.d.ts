// types/next-auth.d.ts
import NextAuth from 'next-auth';

// Extend the NextAuth session type
declare module 'next-auth' {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      id: string; // Add user ID
      role: string; // Add role property
    };
  }
}
