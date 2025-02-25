import {
  Box,
  Divider,
  Heading,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useMemo } from 'react'

import { useData } from '../../firebase/contexts/data'
import { getThisWednesday } from '../../dateUtils'

import EditRatings from './EditRatings/EditRatings'
import UserGraphDisplay from '../utils/UserGraphDisplay'
import ThisWeek from './ThisWeek'

function Main() {
  const { activeUsers, goals, users } = useData()
  const activeIds = useMemo(
    () => (activeUsers ? Object.keys(activeUsers) : []),
    [activeUsers],
  )

  const wed = getThisWednesday()
  // console.log(getThisWednesday(), dateIs.today(getThisWednesday()))
  // TODO: sort that wednesday morning thing
  // TODO: move table out of comp

  return (
    <>
      <EditRatings />
      <ThisWeek />

      <Divider marginY="20px" />

      <Box>
        <Heading as="h3" size="sm">
          This weeks goals
        </Heading>
        <Table>
          <Thead></Thead>
          <Tbody>
            {activeIds.map((id) => {
              const u = users ? users[id] : null
              const g = goals ? goals[id] : null

              return (
                (u && g && (
                  <Tr key={id}>
                    <Td>{u.displayName}</Td>
                    <Td>{g[wed].text}</Td>
                  </Tr>
                )) ||
                null
              )
            })}
          </Tbody>
        </Table>
      </Box>

      <Divider marginY="20px" />

      {activeIds.map((id) => (
        <UserGraphDisplay key={id} id={id} />
      ))}
    </>
  )
}

export default Main
