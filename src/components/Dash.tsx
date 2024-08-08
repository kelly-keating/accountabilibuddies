import { Box, Flex, Heading } from '@chakra-ui/react'

import LoginButton from './Login'
import LogoutButton from './Logout'
import Profile from './Profile'

function Dash() {
  return (
    <>
      <Flex as="header"
        align="center" justify="space-between"
        position="fixed" top="0" left="0" w="100vw" px="20px" py="10px"
      >
        <Heading id="honk-hard-font">Accountabilibuddies</Heading>

        <Box>
          <LoginButton />
          <LogoutButton />
          <Profile />
        </Box>
      </Flex>
    </>
  )
}

export default Dash
