'use client';
import FunMoney from '@/app/components/FunMoney';
import SavingGoal from '@/app/components/SavingGoal';
import TotalCashflow from '@/app/components/TotalCashflow';
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
    <div className="flex items-center justify-center mt-2 flex-col space-y-3">
      <TotalCashflow />
      <FunMoney />
      <SavingGoal />
    </div>
  );
}
