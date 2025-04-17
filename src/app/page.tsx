'use client';
import React from 'react';
import { UserAuth } from './context/AuthContext';

export default function Page() {
  const { user, googleSignIn, logOut } = UserAuth()

  const handleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {!user ? (
        <button onClick={handleSignIn}>Log In</button>
      ) : (
        <div>
          <h1>Hello, {user.displayName}</h1>
          <button onClick={handleSignOut}>Log Out</button>
        </div>
      )}
    </>
  );
}
