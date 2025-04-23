'use client'
import { AuthButton } from "@/app/components/AuthButton";
import { ProviderValue, UserAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = UserAuth() as ProviderValue
  const router = useRouter()

  useEffect(() => {
    if (!user) return router.push('/')
  }, [user, router])

  return (
    <></>
  )
}
