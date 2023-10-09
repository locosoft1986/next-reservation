import React from 'react';
import { Nunito } from 'next/font/google'

import Navbar from '@/app/components/navbar/Navbar';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';

import ToasterProvider from '@/app/providers/ToasterProvider';

import './globals.css'
import ClientOnly from './components/ClientOnly';
import getCurrentUser from './actions/getCurrentUser';
import {ReactQueryProvider} from "@/app/components/ReactQueryProvider";
import CreateTableModal from "@/app/components/modals/CreateTableModal";
import CreateUpdateReservationModal from "@/app/components/modals/CreateUpdateReservationModal";

export const metadata = {
  title: 'Next Table Reservation',
  description: 'Restaurant Table Reservation',
}

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
                                           children,
                                         }: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
      <html lang="en">
      <body className={font.className}>
      <ReactQueryProvider>
          <ClientOnly>
              <ToasterProvider />
              <LoginModal />
              <RegisterModal />
              <CreateTableModal />
              <CreateUpdateReservationModal />
              <Navbar currentUser={currentUser} />
          </ClientOnly>
          <div className="pb-20 pt-28">
              {children}
          </div>
      </ReactQueryProvider>

      </body>
      </html>
  )
}
