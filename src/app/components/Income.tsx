import { twMerge } from 'tailwind-merge';
import { useGetIncome } from '../hooks/firestore';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { ProviderValue, UserAuth } from '../context/AuthContext';

export default function Income({
  incomeId,
  className,
}: {
  incomeId: string;
  className?: string;
}) {
  const { user } = UserAuth() as ProviderValue;
  const { isLoading, isError, data } = useGetIncome(incomeId);

  if (isError || isLoading || !user) return null;

  const collectionRef = collection(db, 'users', user?.uid, 'incomes');

  return (
    <div
      className={twMerge(
        'tw:border-gray-800 tw:border-r-2 tw:border-l-2 tw:bg-gray-500 tw:w-md tw:grid tw:grid-cols-6 tw:gap-1',
        className
      )}
    >
      <h3 className="tw:ml-10 tw:font-bold tw:col-span-3">{data?.name}</h3>
      <p className="tw:col-span-2">${data?.amount}</p>
      <button
        onClick={async () => await deleteDoc(doc(collectionRef, incomeId))}
        className="tw:col-span-1 tw:cursor-pointer"
      >
        🗑️
      </button>
    </div>
  );
}
