'use client';
import React, { useEffect } from 'react';
import { ProviderValue, UserAuth } from './context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { user, handleSignIn } = UserAuth() as ProviderValue;
  const router = useRouter()

  useEffect(() => {
    if (user) return router.push('/home')
  }, [user, router])

  return (
    <div className='tw:flex tw:justify-center tw:align-middle tw:mt-48'>
      <div className='tw:flex tw:justify-center tw:align-middle tw:items-center tw:flex-col tw:border-2 tw:rounded-md tw:w-2xl'>
        <h4 className="tw:m-4 tw:p-4 tw:text-3xl tw:font-bold">Log in with Google</h4>
        <Link className='tw:m-4 tw:bg-gray-500 tw:rounded-md tw:px-4 tw:py-2 tw:text-white' href='/home' onClick={handleSignIn}>
          Log In
        </Link>
      </div>
    </div>
  );
}
