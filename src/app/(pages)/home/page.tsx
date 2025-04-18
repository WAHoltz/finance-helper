'use client'
import { UserAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, handleSignOut } = UserAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [])

  if (!user) return null

  return (
    <>
      <h1 className="p-4 text-cyan-800">Home</h1>
      <h2>Welcome, {user.displayName}</h2>
      <Link href="/" onClick={handleSignOut}>Log out</Link>
    </>
  )
}
