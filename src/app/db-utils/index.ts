'use server';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { User } from 'firebase/auth';

export const AddUser = async (user: User) => {
  const collectionRef = collection(db, 'users');

  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return;
  }
  addDoc(collectionRef, {
    ...user,
  });
};

//export const AddExpense = async (formData: object) => {
//  const collectionRef = collection(db, 'expenses')
//
//  addDoc(collectionRef, {
//    user:
//})
//}
//
//export const GetExpense = async (userId?: string, expenseId?: string) => {
//  const collectionRef = collection(db, 'expenses');
//
//  const collectionSnapshot = await getDocs(collectionRef);
//};
