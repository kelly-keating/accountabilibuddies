import { useMemo } from "react"
import { useData } from "../firebase/contexts/data"
import { Avatar, Box, Flex, Text } from "@chakra-ui/react"

import UserGraph from "./UserGraph"

function GraphDisplayList() {
  const { activeUsers, users } = useData()

  const activeIds = useMemo(() => (activeUsers ? Object.keys(activeUsers) : []), [activeUsers])

  return (
    <>
      {users && activeIds.map(id => (
        <Box key={id}>
          <Flex align="center" >
            <Avatar name={users[id]?.displayName} src={users[id]?.photoUrl} />
            <Text ml="10px">{users[id]?.displayName}</Text>
          </Flex>
          <Box marginY="10px">
            <UserGraph userId={id} />
          </Box>
        </Box>
      ))}
    </>
  )
}

export default GraphDisplayList
