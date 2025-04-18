'use client'
import { UserAuth } from "@/app/context/AuthContext";
import { handleSignOut } from "@/app/utils/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = UserAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [])

  return (
    <>
      <h1>Home</h1>
      <Link href="/" onClick={handleSignOut}>Log out</Link>
    </>
  )
}
