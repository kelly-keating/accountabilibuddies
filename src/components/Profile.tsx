import { useAuth } from '../firebase/contexts/auth'

function CurrentUser() {
  const user = useAuth()

  return <div>{user?.displayName || 'unauthenticated'}</div>
}

export default CurrentUser
