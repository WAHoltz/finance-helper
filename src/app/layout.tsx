'use client';

import { AuthContextProvider, UserAuth } from "./context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <AuthContextProvider>
        <body>{children}</body>
      </AuthContextProvider>
    </html>
  );
}
