import React, { ReactNode, useEffect, useState } from 'react' 
import Footer from '../organisms/Footer' 
import { Navbar } from '../organisms/Navbar'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { jwtVerify } from "jose";

export const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Start with loading = true

const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('auth');
        if (!token) {
          Cookies.remove('auth', { path: '/' });
          router.replace('/login');
          return;
        }

        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || '');
        const { payload } = await jwtVerify(token, secret);

        if (payload.exp && payload.exp < Date.now() / 1000) {
          Cookies.remove('auth', { path: '/' });
          router.replace('/login');
          return;
        }
        setIsAuthenticated(true);
        // If we reach here, token is valid
      } catch (error) {
        console.error('Token validation failed:', error);
        Cookies.remove('auth', { path: '/' });
        router.replace('/login');
      } finally {
        setLoading(false); // Auth check finished
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if(!isAuthenticated)
  {
    return null
  }

  return (
    <div>
      <Navbar />
      <div className="mt-20" />
      {children}
      <Footer />
    </div>
  );
};
