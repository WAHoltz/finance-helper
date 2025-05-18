import { doc, updateDoc } from 'firebase/firestore';
import { ProviderValue, UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { Cashflow, useGetExpenses, useGetUser } from '../hooks/firestore';
import { MouseEventHandler, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function getCurrentRemainingBudget(
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

export default function FunMoney({ className }: { className?: string }) {
  const { user } = UserAuth() as ProviderValue;
  const { isLoading: isUserLoading, data: userData } = useGetUser(
    user ? user.uid : null
  );
  const { isLoading: isExpensesLoading, data: expensesData } = useGetExpenses();
  const [funMoney, setFunMoney] = useState(userData?.funMoney || 0);

  if (isUserLoading || isExpensesLoading || !user) return;

  const userRef = doc(db, 'users', user.uid);

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
        'border-gray-800 border-2 bg-gray-500 sm:w-md w-xs flex flex-col items-center',
        className
      )}
    >
      <h3 className="font-extrabold border-b-2 border-gray-800 w-full text-center">
        Fun Money for Month
      </h3>
      <h4 className="font-bold">Total Budget</h4>
      <p>${userData?.funMoney}</p>
      <p className="font-bold">Current Budget Left</p>
      <p>${getCurrentRemainingBudget(userData?.funMoney, expensesData)}</p>
      <input
        placeholder={`$${funMoney?.toString()}`}
        onChange={handleBudgetChange}
        type="number"
        className="text-center m-3 border-2 border-gray-800"
      />
      <button
        onClick={handleUpdateBudget}
        className="border-black border-x-2 border-t-2 bg-gray-400 px-2 cursor-pointer hover:bg-gray-500"
      >
        Change Budget Amount
      </button>
    </div>
  );
}
