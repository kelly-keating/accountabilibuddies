import { Box, ListItem, UnorderedList } from '@chakra-ui/react'

import { useAuth } from '../firebase/contexts/auth'
import { useData } from '../firebase/contexts/data'
import { getUserId } from '../firebase/auth'

import EditRatings from './EditRatings/EditRatings'
import { formatDate } from '../dateUtils'
import { Goal } from '../models'

function Goals() {
  const user = useAuth()
  const uid = getUserId()
  const { goals } = useData()

  if (!user) return null // TODO: once auth loaded, redirect home if no

  const userGoals = Object.values(goals && uid ? goals[uid] : {}).sort(
    (a, b) => -a.date.localeCompare(b.date),
  )
  const getCol = (goal: Goal) => {
    if (goal.completed !== undefined) {
      return goal.completed ? 'green' : 'red'
    }
    return 'black'
  }

  return (
    <>
      <EditRatings />

      <Box>
        <UnorderedList>
          {userGoals.map((g) => (
            <ListItem key={g.date} color={getCol(g)}>
              {formatDate.firebaseToDisplay(g.date)}: {g.text}
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </>
  )
}

export default Goals
