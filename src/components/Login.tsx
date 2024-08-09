import { Button } from '@chakra-ui/react'
import { useAuth } from '../firebase/contexts/auth'
import { useGitHubLogin } from '../firebase/hooks/useGitHubLogin'

const LoginButton = () => {
  const user = useAuth()
  const { login, isPending } = useGitHubLogin()

  return user ? null : (
    <Button disabled={isPending} onClick={login}>
      Log In
    </Button>
  )
}

export default LoginButton
