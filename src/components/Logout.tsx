import { Button } from '@chakra-ui/react'

import { useAuth } from '../firebase/contexts/auth'
import { useGitHubLogout } from '../firebase/hooks/useGitHubLogout'

const LogoutButton = () => {
  const user = useAuth()
  const { logout } = useGitHubLogout()

  return !user ? null : <Button onClick={logout}>Log Out</Button>
}

export default LogoutButton
