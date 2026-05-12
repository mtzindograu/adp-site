'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/adp/Navbar';
import Footer from '@/components/adp/Footer';
import AdminPanel from '@/components/admin/AdminPanel';
import { Shield } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [adminOpen, setAdminOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin' || pathname === '/admin') {
        setAdminOpen(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [pathname]);

  const closeAdmin = () => {
    setAdminOpen(false);
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', window.location.pathname);
    }
    if (pathname === '/admin') {
      router.push('/');
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />

      <AdminPanel isOpen={adminOpen} onClose={closeAdmin} />
    </>
  );
}
