import { Box, Flex, Heading } from '@chakra-ui/react'
import { useData } from '../firebase/contexts/data'

import GraphDisplayList from './GraphDisplayList'
import LoginButton from './Login'
import LogoutButton from './Logout'
import Profile from './Profile'

function Dash() {
  const { users } = useData()
  const userNum = users ? Object.keys(users).length : 0

  return (
    <>
      <Flex as="header"
        align="center" justify="space-between"
        position="fixed" top="0" left="0" w="100vw" px="20px" py="10px"
      >
        <Heading id="honk-hard-font">Accountabilibuddies ({userNum})</Heading>

        <Box>
          <LoginButton />
          <LogoutButton />
          <Profile />
        </Box>
      </Flex>

      <Box mt="50px">
        <GraphDisplayList />
      </Box>
    </>
  )
}

export default Dash
