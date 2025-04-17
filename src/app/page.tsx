'use client';
import React from 'react';
import { UserAuth } from './context/AuthContext';
import Link from 'next/link';

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
        <>
          <h4>Log in with Google</h4>
          <Link href="/home" onClick={handleSignIn}>Log In</Link>
        </>

      ) : (
        <div>
          <h1>Hello, {user.displayName}</h1>
          <button onClick={handleSignOut}>Log Out</button>
        </div>
      )}
    </>
  );
}
