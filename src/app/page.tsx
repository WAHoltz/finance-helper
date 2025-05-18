'use client';
import React, { useEffect } from 'react';
import { ProviderValue, UserAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { user } = UserAuth() as ProviderValue;
  const router = useRouter();

  useEffect(() => {
    if (user) return router.push('/home');
  }, [user, router]);

  return (
    <div className="text-white font-bold text-xl sm:text-5xl flex justify-center items-center mt-32">
      An app for tracking your finances!
    </div>
  );
}
