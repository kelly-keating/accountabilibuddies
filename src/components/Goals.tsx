import {
  Box,
  ButtonGroup,
  IconButton,
  ListItem,
  Textarea,
  UnorderedList,
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { useParams } from 'react-router-dom'
import { Goal } from '../models'

import { useAuth } from '../firebase/contexts/auth'
import { useData } from '../firebase/contexts/data'
import { getUserId } from '../firebase/auth'
import { setGoalComplete } from '../firebase/db'
import { dateIs, formatDate } from '../dateUtils'

import GraphDisplay from './GraphDisplay'

function Goals() {
  const user = useAuth()
  const uid = getUserId()
  const { goals } = useData()
  const { id } = useParams()

  if (!user) return null // TODO: once auth loaded, redirect home if no
  if (!id) return null

  const userGoals = Object.values(goals && id ? goals[id] : {}).sort(
    (a, b) => -a.date.localeCompare(b.date),
  )
  const getCol = (goal: Goal) => {
    if (goal.completed !== undefined) {
      return goal.completed ? 'green' : 'red'
    }
    return 'black'
  }
  const isFuture = (g: Goal) => dateIs.future(g.date)
  const isYourGoals = uid === id

  return (
    <>
      <GraphDisplay id={id} />

      <Textarea />

      <Box>
        <UnorderedList styleType="none" marginInlineStart="0">
          {userGoals.map((g) => (
            <ListItem
              key={g.date}
              color={getCol(g)}
              display="flex"
              alignItems="center"
              marginY="5px"
            >
              {isYourGoals && (
                <ButtonGroup size="sm" isAttached variant="solid" mr="5px">
                  <IconButton
                    aria-label="mark completed"
                    icon={<CheckIcon />}
                    onClick={() => setGoalComplete(g.date, true)}
                    colorScheme={g.completed ? 'green' : 'gray'}
                    isDisabled={isFuture(g)}
                  />
                  <IconButton
                    aria-label="mark incomplete"
                    icon={<CloseIcon />}
                    onClick={() => setGoalComplete(g.date, false)}
                    colorScheme={g.completed === false ? 'red' : 'gray'}
                    isDisabled={isFuture(g)}
                  />
                </ButtonGroup>
              )}
              {isFuture(g) ? 'Next week' : formatDate.firebaseToDisplay(g.date)}
              : {g.text}
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </>
  )
}

export default Goals
