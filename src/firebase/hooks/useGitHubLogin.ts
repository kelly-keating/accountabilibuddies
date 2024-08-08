import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import auth from "../auth"
import { useState } from "react"

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

      const user = res.user
      console.log(user)
      setIsPending(false)
    } catch (error) {
      console.log(error)
      const err = error as Error
      setError(err.message)
      setIsPending(false)
    }
  }

  return { login, error, isPending }
}
