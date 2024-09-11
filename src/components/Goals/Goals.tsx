import { Box, Heading, ListItem, UnorderedList } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { useAuth } from '../../firebase/contexts/auth'
import { useData } from '../../firebase/contexts/data'
import { getUserId } from '../../firebase/auth'
import { getGoalCompletedCol } from '../../colourUtils'
import { dateIs, formatDate } from '../../dateUtils'

import UserGraphDisplay from '../utils/UserGraphDisplay'
import GoalsTextEdit from './GoalsTextEdit'
import CompletedToggle from '../utils/CompletedToggle'

function Goals() {
  const user = useAuth()
  const uid = getUserId()
  const { goals } = useData()
  const { id } = useParams()

  if (!user) return null // TODO: once auth loaded, redirect home if no
  if (!id) return null
  const isYourGoals = uid === id

  let displayGoals = Object.values(goals && id ? goals[id] : {}).sort(
    (a, b) => -a.date.localeCompare(b.date),
  ) // -1 to reverse order
  if (isYourGoals) {
    displayGoals = displayGoals.filter((goal) => dateIs.past(goal.date))
  }

  return (
    <>
      <UserGraphDisplay id={id} />

      {isYourGoals && <GoalsTextEdit />}

      <Heading as="h3">{isYourGoals ? 'Past goals' : 'Goals'}</Heading>
      <Box>
        <UnorderedList styleType="none" marginInlineStart="0">
          {displayGoals.map((g) => (
            <ListItem
              key={g.date}
              color={getGoalCompletedCol(g)}
              display="flex"
              alignItems="center"
              marginY="5px"
            >
              {isYourGoals && <CompletedToggle goal={g} />}
              {dateIs.future(g.date)
                ? 'This week'
                : formatDate.firebaseToDisplay(g.date)}
              : {g.text}
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </>
  )
}

export default Goals
