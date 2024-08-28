import { Box, Flex, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { useData } from '../firebase/contexts/data'
import { useAuth } from '../firebase/contexts/auth'
import { getUserId } from '../firebase/auth'

import LoginButton from './Login'
import LogoutButton from './Logout'
import NewUserPopup from './NewUserPopup'
import ShowRatingButton from './ShowRatingButton'

function Dash() {
  const user = useAuth()
  const { users } = useData()

  const [showNewUserPrompt, setNewUserPrompt] = useState(false)
  const closePopup = () => { setNewUserPrompt(false) }

  useEffect(() => {
    const uid = getUserId()
    if (users && uid && !users[uid].ratings) {
      setNewUserPrompt(true)
    }
  }, [user, users])

  return (
    <>
      <Flex as="header"
        align="center" justify="space-between"
        position="fixed" top="0" left="0" w="100vw" px="20px" py="10px"
      >
        <Heading id="honk-hard-font">Accountabilibuddies</Heading>

        <Flex align="center">
          <ShowRatingButton />
          <LoginButton />
          <LogoutButton />
        </Flex>
      </Flex>

      {/* TODO: make this box grow/shrink & centered */}
      <Box mt="80px">
        <Outlet />
      </Box>

      {showNewUserPrompt && (
        <NewUserPopup
          closeModal={closePopup}
        />
      )}
    </>
  )
}

export default Dash
