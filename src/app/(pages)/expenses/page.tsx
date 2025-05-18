'use client';
import AddForm from '@/app/components/AddForm';
import TotalExpenses from '@/app/components/TotalExpenses';
import ListExpenses from '@/app/components/ListExpenses';
import { ProviderValue, UserAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Expenses() {
  const { user } = UserAuth() as ProviderValue;
  const router = useRouter();

  useEffect(() => {
    if (!user) return router.push('/');
  }, [user, router]);

  if (!user) {
    return;
  }
  return (
    <div className="flex items-center justify-center mt-2 flex-col space-y-3">
      <AddForm userId={user.uid} type="expenses" />
      <TotalExpenses />
      <ListExpenses />
    </div>
  );
}
