import { twMerge } from 'tailwind-merge';
import { useGetExpense } from '../hooks/firestore';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { ProviderValue, UserAuth } from '../context/AuthContext';

export default function Expense({
  expenseId,
  className,
}: {
  expenseId: string;
  className?: string;
}) {
  const { user } = UserAuth() as ProviderValue;
  const { isLoading, isError, data } = useGetExpense(expenseId);

  if (isError || isLoading || !user) return null;

  const collectionRef = collection(db, 'users', user?.uid, 'expenses');

  return (
    <div
      className={twMerge(
        'border-gray-800 border-r-2 max-sm:border-b-2 border-l-2 bg-gray-500 sm:w-md w-xs grid grid-cols-8 gap-1',
        className
      )}
    >
      <h3 className="sm:ml-10 font-bold col-span-3">{data?.name}</h3>
      <p className="col-span-2">${data?.amount}</p>
      <p className="col-span-2">
        {data?.required ? 'required' : 'not required'}
      </p>
      <button
        onClick={async () => await deleteDoc(doc(collectionRef, expenseId))}
        className="col-span-1 cursor-pointer"
      >
        🗑️
      </button>
    </div>
  );
}
