'use client';
import React from 'react';
import { UserAuth } from './context/AuthContext';
import Link from 'next/link';
import Home from './(pages)/home/page';
import { handleSignIn } from './utils/auth';

export default function Page() {
  const { user } = UserAuth()

  return (
    <>
      {user ? (
        <>
          <h4>Log in with Google</h4>
          <Link href="/home" onClick={handleSignIn}>Log In</Link>
        </>

      ) : (
        <div>
          <Home />
        </div>
      )}
    </>
  );
}
