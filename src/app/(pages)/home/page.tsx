'use client';
import { ProviderValue, UserAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user } = UserAuth() as ProviderValue;
  const router = useRouter();

  useEffect(() => {
    if (!user) return router.push('/');
  }, [user, router]);

  if (!user) {
    return;
  }

  return (
    <div className="tw:text-white tw:font-bold tw:text-5xl tw:flex tw:justify-center tw:items-center tw:mt-16">
      <h1>Home</h1>
    </div>
  );
}
