import { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ProviderValue, UserAuth } from '../context/AuthContext';

export type Expense = {
  name: string;
  amount: number;
  required: boolean;
  docId?: string;
};

export const addExpense = async (formData: Expense, userId: string) => {
  const expenseRef = collection(db, 'users', userId, 'expenses');

  await addDoc(expenseRef, {
    ...formData,
  });
};

export const useGetExpenses = () => {
  const { user } = UserAuth() as ProviderValue;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Expense[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      if (user) {
        const expensesRef = collection(db, 'users', user?.uid, 'expenses');
        const expensesSnapshot = await getDocs(expensesRef);

        if (expensesSnapshot.size) {
          const data: Expense[] = [];
          expensesSnapshot.docs.forEach((doc) =>
            data.push({ ...doc.data(), docId: doc.id } as Expense)
          );
          setData(data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, [user]);

  return { isLoading, isError, data };
};

export const useGetExpense = (expenseId: string) => {
  const { user } = UserAuth() as ProviderValue;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Expense>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      if (user) {
        const expenseRef = doc(db, 'users', user?.uid, 'expenses', expenseId);
        const expenseSnapshot = await getDoc(expenseRef);

        if (expenseSnapshot.exists()) {
          setData({
            ...expenseSnapshot.data(),
            docId: expenseId,
          } as Expense);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, [user, expenseId]);

  return { isLoading, isError, data };
};
