'use client';
import { ProviderValue, UserAuth } from '@/app/context/AuthContext';
import { AddUser } from '@/app/db-utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user } = UserAuth() as ProviderValue;
  const router = useRouter();

  useEffect(() => {
    if (!user) return router.push('/');
    AddUser(user);
  }, [user, router]);

  return <></>;
}
