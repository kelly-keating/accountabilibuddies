import { Divider } from '@chakra-ui/react'
import { useMemo } from 'react'

import { useData } from '../firebase/contexts/data'

import EditRatings from './EditRatings/EditRatings'
import GraphDisplay from './GraphDisplay'
import ThisWeek from './ThisWeek'

function Main() {
  const { activeUsers } = useData()
  const activeIds = useMemo(
    () => (activeUsers ? Object.keys(activeUsers) : []),
    [activeUsers],
  )

  return (
    <>
      <EditRatings />
      <ThisWeek />
      <Divider marginY="20px" />

      {activeIds.map((id) => (
        <GraphDisplay key={id} id={id} />
      ))}
    </>
  )
}

export default Main
