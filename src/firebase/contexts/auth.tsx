import { FirebaseUser } from '../../models'
import { onAuthStateChanged } from 'firebase/auth'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import auth from '../auth'

type PotentialUser = FirebaseUser | null
type ContextState = { user: PotentialUser }
interface Props {
  children: ReactNode
}

const AuthContext = createContext<ContextState>({ user: null })

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState(null as PotentialUser)
  const val = { user }

  useEffect(() => {
    const stopListening = onAuthStateChanged(auth, setUser)
    return () => stopListening()
  }, [])

  return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('lol, you forgot your AuthProvider')
  }
  return context.user
}
