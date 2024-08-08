import { signOut } from "firebase/auth"
import auth from "../auth"

export const useGitHubLogout = () => {

  const logout = async () => {
    try {
      await signOut(auth)
      console.log("user logged out")
    } catch (error) {
      const err = error as Error
      console.log(err.message)
    }
  }

  return { logout }
}
