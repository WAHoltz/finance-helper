import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase';
import { ProviderValue, UserAuth } from '../context/AuthContext';

export type Expense = {
  name: string;
  amount: number;
  required: boolean;
  timestamp: number;
  docId?: string;
};

export type UserRef = {
  uid: string;
  name: string;
  photoUrl: string;
  email: string;
  funMoney: number;
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
  const [data, setData] = useState<Expense[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (!user) return;

      const expensesRef = collection(db, 'users', user?.uid, 'expenses');
      const unsubscribe = onSnapshot(expensesRef, (snapshot) => {
        if (snapshot.size) {
          const data: Expense[] = [];
          snapshot.docs.forEach((doc) =>
            data.push({ ...doc.data(), docId: doc.id } as Expense)
          );
          setData(data);
          setIsLoading(false);
        } else {
          setData([]);
          setIsLoading(false);
        }
      });
      return () => unsubscribe();
    })();
  }, [user]);

  return { isLoading, data };
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

export const useGetUser = (userId: string | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<UserRef>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      if (!userId) return;

      const usersRef = doc(db, 'users', userId);
      const unsubscribe = onSnapshot(usersRef, (snapshot) => {
        if (snapshot.exists()) {
          setData({
            ...snapshot.data(),
          } as UserRef);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      });
      return () => unsubscribe();
    })();
  }, [userId]);

  return { isLoading, data };
};
