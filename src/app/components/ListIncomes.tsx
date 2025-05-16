import { twMerge } from 'tailwind-merge';
import { useGetIncomes } from '../hooks/firestore';
import Income from './Income';

export default function ListIncomes({ className }: { className?: string }) {
  const { isLoading, data } = useGetIncomes();

  if (isLoading) return null;

  return (
    <div
      className={twMerge(
        'tw:border-gray-800 tw:border-2 tw:bg-gray-500 tw:w-md tw:flex tw:flex-col tw:items-center',
        className
      )}
    >
      <h3 className="tw:font-extrabold tw:border-b-2 tw:border-gray-800 tw:w-full tw:text-center">
        All Incomes
      </h3>
      {data.length ? (
        data
          .sort((incomeA, incomeB) => incomeA.timestamp - incomeB.timestamp)
          .map((income) => {
            if (!income?.docId) return;
            return <Income key={income.docId} incomeId={income.docId} />;
          })
      ) : (
        <p>No Incomes</p>
      )}
    </div>
  );
}
