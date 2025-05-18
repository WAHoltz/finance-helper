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
        'border-gray-800 border-r-2 max-sm:border-b-2 border-l-2 bg-gray-500 sm:w-md w-xs grid grid-cols-6 gap-1',
        className
      )}
    >
      <h3 className="max-sm:ml-10 font-bold col-span-3">{data?.name}</h3>
      <p className="col-span-2">${data?.amount}</p>
      <button
        onClick={async () => await deleteDoc(doc(collectionRef, incomeId))}
        className="col-span-1 cursor-pointer"
      >
        🗑️
      </button>
    </div>
  );
}
