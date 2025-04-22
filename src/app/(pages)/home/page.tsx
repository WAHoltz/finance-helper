'use client'
import { ProviderValue, UserAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, handleSignOut } = UserAuth() as ProviderValue
  const router = useRouter()

  useEffect(() => {
    if (!user) return router.push('/')
  }, [user, router])

  return (
    <div className="tw:flex tw:justify-center tw:align-middle tw:mt-48">
      <div className="tw:flex tw:justify-center tw:align-middle tw:items-center tw:flex-col tw:border-2 tw:rounded-md tw:w-2xl">
        <h1 className="tw:m-4 tw:p-4 tw:text-3xl tw:font-bold">Home</h1>
        <h2 className="tw:mb-2 tw:pb-2 tw:text-xl tw:font-bold">Welcome, {user?.displayName}</h2>
        <Link href="/" onClick={handleSignOut} className='tw:m-4 tw:bg-gray-500 tw:rounded-md tw:px-4 tw:py-2 tw:text-white'>Log out</Link>
      </div>
    </div>
  )
}
