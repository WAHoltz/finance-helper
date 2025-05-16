import { doc, updateDoc } from 'firebase/firestore';
import { ProviderValue, UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { Cashflow, useGetExpenses, useGetUser } from '../hooks/firestore';
import { MouseEventHandler, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function FunMoney({ className }: { className?: string }) {
  const { user } = UserAuth() as ProviderValue;
  const { isLoading: isUserLoading, data: userData } = useGetUser(
    user ? user.uid : null
  );
  const { isLoading: isExpensesLoading, data: expensesData } = useGetExpenses();
  const [funMoney, setFunMoney] = useState(userData?.funMoney || 0);

  if (isUserLoading || isExpensesLoading || !user) return;

  const userRef = doc(db, 'users', user.uid);

  function getCurrentRemainingBudget(
    funMoney: number | undefined,
    expenses: Cashflow[]
  ) {
    let remainingFunMoney = funMoney || 0;
    const now = Date.now();
    const currentDate = new Date(now);
    const currentMonth = currentDate.getMonth();

    expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.timestamp);
        return expenseDate.getMonth() === currentMonth && !expense.required;
      })
      .map((expense) => (remainingFunMoney -= expense.amount));

    return Number.parseFloat(remainingFunMoney.toString()).toFixed(2);
  }

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFunMoney(Number(event.target.value));
  };

  const handleUpdateBudget: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();

    await updateDoc(userRef, {
      funMoney,
    });
  };

  return (
    <div
      className={twMerge(
        'tw:border-gray-800 tw:border-2 tw:bg-gray-500 tw:w-md tw:flex tw:flex-col tw:items-center',
        className
      )}
    >
      <h3 className="tw:font-extrabold tw:border-b-2 tw:border-gray-800 tw:w-full tw:text-center">
        Fun Money for Month
      </h3>
      <h4 className="tw:font-bold">Total Budget</h4>
      <p>${userData?.funMoney}</p>
      <p className="tw:font-bold">Current Budget Left</p>
      <p>${getCurrentRemainingBudget(userData?.funMoney, expensesData)}</p>
      <input
        placeholder={`$${funMoney?.toString()}`}
        onChange={handleBudgetChange}
        type="number"
        className="tw:text-center tw:m-3 tw:border-2 tw:border-gray-800"
      />
      <button
        onClick={handleUpdateBudget}
        className="tw:border-black tw:border-x-2 tw:border-t-2 tw:bg-gray-400 tw:px-2 tw:cursor-pointer"
      >
        Change Budget Amount
      </button>
    </div>
  );
}
