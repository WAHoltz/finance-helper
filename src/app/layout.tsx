'use client';
import { AuthContextProvider } from './context/AuthContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <AuthContextProvider>
        <body className='tw:bg-gradient-to-tr tw:bg-gray-700'>{children}</body>
      </AuthContextProvider>
    </html>
  );
}
