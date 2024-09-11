import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { useData } from '../firebase/contexts/data'
import { useAuth } from '../firebase/contexts/auth'
import { getUserId } from '../firebase/auth'

import LoginButton from './Login'
import LogoutButton from './Logout'
import NewUserPopup from './NewUserPopup'
import ToggleEditButton from './utils/ToggleEditButton'

function Dash() {
  const user = useAuth()
  const { users } = useData()
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  const [showNewUserPrompt, setNewUserPrompt] = useState(false)
  const closePopup = () => { setNewUserPrompt(false) }

  const uid = getUserId()

  useEffect(() => {
    if (users && uid && !users[uid].ratings) {
      setNewUserPrompt(true)
    }
  }, [uid, user, users])

  return (
    <>
      <Flex as="header"
        align="center" justify="space-between"
        position="fixed" top="0" left="0" w="100vw" px="20px" py="10px"
      >
        <Heading id="honk-hard-font">Accountabilibuddies</Heading>

        <Flex align="center">
          <Button
            as={Link}
            to={onHome ? '/goals/' + uid : '/'}
            colorScheme="teal"
            variant="solid"
            mr="10px"
          >
            {onHome ? 'View goals' : 'Home'}
          </Button>
          {onHome && <ToggleEditButton />}
          <LoginButton />
          <LogoutButton />
        </Flex>
      </Flex>

      {/* TODO: make this box grow/shrink & centered */}
      <Box mt="80px">
        <Outlet />
      </Box>

      {showNewUserPrompt && <NewUserPopup closeModal={closePopup} />}
    </>
  )
}

export default Dash
