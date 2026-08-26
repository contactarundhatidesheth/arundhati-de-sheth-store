'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { AnnouncementBar } from '@/components/AnnouncementBar';
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
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <CartDrawer />
      <ConsultationModal />
    </>
  );
};
