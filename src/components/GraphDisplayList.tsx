import { useMemo } from "react"
import { useData } from "../firebase/contexts/data"
import { Avatar, Box } from "@chakra-ui/react"

import UserGraph from "./UserGraph"

function GraphDisplayList() {
  const { activeUsers, users } = useData()

  const activeIds = useMemo(() => (activeUsers ? Object.keys(activeUsers) : []), [activeUsers])

  return (
    <>
      <h2>GraphDisplayList</h2>
      {users && activeIds.map(id => (
        <Box key={id}>
          <Avatar name={users[id]?.displayName} src={users[id]?.photoUrl} />
          <h2>{users[id]?.displayName}</h2>
          <UserGraph userId={id} />
        </Box>
      ))}
    </>
  )
}

export default GraphDisplayList
