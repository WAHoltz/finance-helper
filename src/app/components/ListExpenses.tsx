import { twMerge } from 'tailwind-merge';
import { useGetExpenses } from '../hooks/firestore';
import Expense from './Expense';

export default function ListExpenses({ className }: { className?: string }) {
  const { isLoading, data } = useGetExpenses();

  if (isLoading) return null;

  return (
    <div
      className={twMerge(
        'tw:border-gray-800 tw:border-2 tw:bg-gray-500 tw:w-md tw:flex tw:flex-col tw:items-center',
        className
      )}
    >
      <h3 className="tw:font-extrabold tw:border-b-2 tw:border-gray-800 tw:w-full tw:text-center">
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
