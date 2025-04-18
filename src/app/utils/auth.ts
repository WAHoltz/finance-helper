import { UserAuth } from "../context/AuthContext"

export const handleSignIn = async () => {
  const { googleSignIn } = UserAuth()
  try {
    await googleSignIn()

  } catch (error) {
    console.log(error)
  }
}

export const handleSignOut = async () => {
  const { logOut } = UserAuth()
  try {
    await logOut()
  } catch (error) {
    console.log(error)
  }
}
