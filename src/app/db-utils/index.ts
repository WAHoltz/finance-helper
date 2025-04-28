"use server";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export type Expense = {
  name: string;
  amount: number;
  required: boolean;
  userId: string;
};

export const AddUser = async () => {};

export const AddExpense = async (formData: Expense) => {
  const expenseRef = collection(db, "expenses");

  await addDoc(expenseRef, {
    ...formData,
  });
};

//export const GetExpense = async (userId?: string, expenseId?: string) => {
//  const collectionRef = collection(db, "expenses");
//
//  const collectionSnapshot = await getDocs(collectionRef);
//};
