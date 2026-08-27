'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { CartDrawer } from '@/components/CartDrawer';
import { ConsultationModal } from '@/components/ConsultationModal';

export const StorefrontLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      {pathname !== '/' && <Footer />}
      <FloatingWhatsApp />
      <CartDrawer />
      <ConsultationModal />
    </>
  );
};
