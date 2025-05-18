'use client';
import Header from './components/Header';
import { AuthContextProvider } from './context/AuthContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body className="bg-gradient-to-tr bg-gray-700">
          <Header />
          {children}
        </body>
      </AuthContextProvider>
    </html>
  );
}
