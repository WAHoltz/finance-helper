'use client';
import AddForm from '@/app/components/AddForm';
import ListIncomes from '@/app/components/ListIncomes';
import TotalIncomes from '@/app/components/TotalIncomes';
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
    <div className="tw:flex tw:items-center tw:justify-center tw:mt-2 tw:flex-col tw:space-y-3">
      <AddForm userId={user.uid} type="incomes" />
      <TotalIncomes />
      <ListIncomes />
    </div>
  );
}
