import { twMerge } from 'tailwind-merge';
import { useGetIncomes } from '../hooks/firestore';
import Income from './Income';

export default function ListIncomes({ className }: { className?: string }) {
  const { isLoading, data } = useGetIncomes();

  if (isLoading) return null;

  return (
    <div
      className={twMerge(
        'border-gray-800 border-2 bg-gray-500 sm:w-md w-xs flex flex-col items-center',
        className
      )}
    >
      <h3 className="font-extrabold border-b-2 border-gray-800 w-full text-center">
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
