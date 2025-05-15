import { twMerge } from 'tailwind-merge';
import { useGetExpense } from '../hooks/firestore';

export default function Expense({
  expenseId,
  className,
}: {
  expenseId: string;
  className?: string;
}) {
  const { isLoading, isError, data } = useGetExpense(expenseId);

  if (isError || isLoading) return null;

  return (
    <div
      className={twMerge(
        'tw:border-gray-800 tw:border-r-2 tw:border-l-2 tw:bg-gray-500 tw:w-md tw:grid tw:grid-cols-6 tw:gap-1',
        className
      )}
    >
      <h3 className="tw:ml-10 tw:font-bold tw:col-span-2">{data?.name}</h3>
      <p className="tw:col-span-2">${data?.amount}</p>
      <p className="tw:col-span-2">
        {data?.required ? 'required' : 'not required'}
      </p>
    </div>
  );
}
