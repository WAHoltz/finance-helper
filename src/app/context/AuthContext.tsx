'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, User } from "firebase/auth";
import { auth } from "../firebase";

export interface ProviderValue {
  user: User | null;
  handleSignIn: () => void;
  handleSignOut: () => void;
}

export type ContextValue = ProviderValue | undefined

const AuthContext = createContext<ContextValue>(undefined)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  const logOut = () => {
    signOut(auth)
  }


  const handleSignIn = () => {
    try {
      googleSignIn()

    } catch (error) {
      console.log(error)
    }
  }

  const handleSignOut = () => {
    try {
      logOut()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [user])
  return (
    <AuthContext.Provider
      value={{ user, handleSignIn, handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}

