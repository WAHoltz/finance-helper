'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, User } from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = () => {
  const [user, setUser] = useState<User | null>(null)

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  const logOut = () => {
    signOut(auth)
  }


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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [user])

  return createContext({ user, handleSignIn, handleSignOut })
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {

  return (
    <AuthContext.Provider value={{ user, handleSignIn, handleSignOut }}>{children}</AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}

