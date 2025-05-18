import { twMerge } from 'tailwind-merge';
import { useGetExpenses } from '../hooks/firestore';
import Expense from './Expense';

export default function ListExpenses({ className }: { className?: string }) {
  const { isLoading, data } = useGetExpenses();

  if (isLoading) return null;

  return (
    <div
      className={twMerge(
        'border-gray-800 border-2 bg-gray-500 sm:w-md w-xs flex flex-col items-center',
        className
      )}
    >
      <h3 className="font-extrabold border-b-2 border-gray-800 w-full text-center">
        All Expenses
      </h3>
      {data.length ? (
        data
          .sort((expenseA, expenseB) => expenseA.timestamp - expenseB.timestamp)
          .map((expense) => {
            if (!expense?.docId) return;
            return <Expense key={expense.docId} expenseId={expense.docId} />;
          })
      ) : (
        <p>No Expenses</p>
      )}
    </div>
  );
}
