import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Link, useLocation } from 'react-router-dom'

import { useData } from '../../firebase/contexts/data'

import LineGraph from './LineGraph'

interface Props {
  id: string
}

function UserGraphDisplay({ id }: Props) {
  const { users } = useData()
  const { pathname } = useLocation()

  return (
    <>
      {users && (
        <Box>
          <Flex align="center">
            <Avatar name={users[id]?.displayName} src={users[id]?.photoUrl} />
            <Text ml="10px">{users[id]?.displayName}</Text>
            {pathname === '/' && (
              <Button
                as={Link}
                to={'/goals/' + id}
                colorScheme="teal"
                variant="solid"
                ml="20px"
                rightIcon={<ArrowForwardIcon />}
              >
                Goals
              </Button>
            )}
          </Flex>
          <Box marginY="10px">
            <LineGraph userId={id} />
          </Box>
        </Box>
      )}
    </>
  )
}

export default UserGraphDisplay
