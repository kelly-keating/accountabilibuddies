import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import auth from "../auth"
import { useState } from "react"
import { addNewUser, checkUserExists } from "../db"

export const useGitHubLogin = () => {
  const [error, setError] = useState<null | string>(null)
  const [isPending, setIsPending] = useState<boolean>(false)
  const provider = new GithubAuthProvider()

  const login = async () => {
    setError(null)
    setIsPending(true)

    try {
      const res = await signInWithPopup(auth, provider)
      if (!res) {
        throw new Error("Could not complete signup")
      }

      const userInDb = await checkUserExists(res.user.uid)
      if (!userInDb) {
        addNewUser(res.user)
      }
 
      console.log(res.user)
      setIsPending(false)
    } catch (error) {
      setError((error as Error).message)
      setIsPending(false)
    }
  }

  return { login, error, isPending }
}
