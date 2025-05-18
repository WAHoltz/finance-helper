import { doc, updateDoc } from 'firebase/firestore';
import { ProviderValue, UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { useGetExpenses, useGetUser, UserRef } from '../hooks/firestore';
import { MouseEventHandler, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { getCurrentRemainingBudget } from './FunMoney';

export default function SavingGoal({ className }: { className?: string }) {
  const { user } = UserAuth() as ProviderValue;
  const { isLoading: isUserLoading, data: userData } = useGetUser(
    user ? user.uid : null
  );
  const { isLoading: isExpensesLoading, data: expensesData } = useGetExpenses();
  const [savingGoal, setSavingGoal] = useState(userData?.savingGoal || 0);

  if (isUserLoading || isExpensesLoading || !user) return;

  const userRef = doc(db, 'users', user.uid);

  function getCurrentRemainingSaving(user: UserRef | undefined) {
    let remainingSavingGoal = user?.savingGoal || 0;
    const remainingFunMoney = Number(
      getCurrentRemainingBudget(user?.funMoney, expensesData)
    );

    if (remainingFunMoney && remainingFunMoney < 0) {
      remainingSavingGoal += remainingFunMoney;
    }

    return Number.parseFloat(remainingSavingGoal.toString()).toFixed(2);
  }

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSavingGoal(Number(event.target.value));
  };

  const handleUpdateBudget: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();

    await updateDoc(userRef, {
      savingGoal,
    });
  };

  return (
    <div
      className={twMerge(
        'border-gray-800 border-2 bg-gray-500 sm:w-md w-xs flex flex-col items-center',
        className
      )}
    >
      <h3 className="font-extrabold border-b-2 border-gray-800 w-full text-center">
        Saving Goal for Month
      </h3>
      <h4 className="font-bold">Saving Goal</h4>
      <p>${userData?.savingGoal}</p>
      <p className="font-bold">Actual Savings</p>
      <p>${getCurrentRemainingSaving(userData)}</p>
      <input
        placeholder={`$${savingGoal?.toString()}`}
        onChange={handleBudgetChange}
        type="number"
        className="text-center m-3 border-2 border-gray-800"
      />
      <button
        onClick={handleUpdateBudget}
        className="border-black border-x-2 border-t-2 bg-gray-400 px-2 cursor-pointer hover:bg-gray-500"
      >
        Change Saving Amount
      </button>
    </div>
  );
}
