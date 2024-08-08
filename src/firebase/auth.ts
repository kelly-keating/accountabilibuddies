import { 
  getAuth,
} from "firebase/auth"

const auth = getAuth()
export default auth

export function getUserId (): string | null {
  return auth.currentUser?.uid || null
}

