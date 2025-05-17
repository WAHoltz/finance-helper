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

export type Cashflow = {
  name: string;
  amount: number;
  required?: boolean;
  timestamp: number;
  docId?: string;
};

export type UserRef = {
  uid: string;
  name: string;
  photoUrl: string;
  email: string;
  funMoney: number;
  savingGoal: number;
};

export const addExpense = async (formData: Cashflow, userId: string) => {
  const expenseRef = collection(db, 'users', userId, 'expenses');

  await addDoc(expenseRef, {
    ...formData,
  });
};

export const addIncome = async (formData: Cashflow, userId: string) => {
  const incomeRef = collection(db, 'users', userId, 'incomes');

  await addDoc(incomeRef, {
    ...formData,
  });
};

export const useGetExpenses = () => {
  const { user } = UserAuth() as ProviderValue;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Cashflow[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (!user) return;

      const expensesRef = collection(db, 'users', user?.uid, 'expenses');
      const unsubscribe = onSnapshot(expensesRef, (snapshot) => {
        if (snapshot.size) {
          const data: Cashflow[] = [];
          snapshot.docs.forEach((doc) =>
            data.push({ ...doc.data(), docId: doc.id } as Cashflow)
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

export const useGetIncomes = () => {
  const { user } = UserAuth() as ProviderValue;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Cashflow[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (!user) return;

      const incomesRef = collection(db, 'users', user?.uid, 'incomes');
      const unsubscribe = onSnapshot(incomesRef, (snapshot) => {
        if (snapshot.size) {
          const data: Cashflow[] = [];
          snapshot.docs.forEach((doc) =>
            data.push({ ...doc.data(), docId: doc.id } as Cashflow)
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
  const [data, setData] = useState<Cashflow>();

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
          } as Cashflow);
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

export const useGetIncome = (incomeId: string) => {
  const { user } = UserAuth() as ProviderValue;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Cashflow>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      if (user) {
        const incomeRef = doc(db, 'users', user?.uid, 'incomes', incomeId);
        const incomeSnapshot = await getDoc(incomeRef);

        if (incomeSnapshot.exists()) {
          setData({
            ...incomeSnapshot.data(),
            docId: incomeId,
          } as Cashflow);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, [user, incomeId]);

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
