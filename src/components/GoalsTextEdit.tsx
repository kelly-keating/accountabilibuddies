import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react'
import { FormEvent, useEffect, useState } from 'react'
import { Goal } from '../models'

import { useData } from '../firebase/contexts/data'
import { getUserId } from '../firebase/auth'
import { addNewGoal, updateGoalText } from '../firebase/db'
import { dateIs, getNextWednesday, getThisWednesday } from '../dateUtils'

import CompletedToggle from './utils/CompletedToggle'

function GoalsTextEdit() {
  const { goals } = useData()
  const uid = getUserId()

  const thisWed = getThisWednesday()
  const nextWed = getNextWednesday()
  const todayIsWed = dateIs.today(thisWed)

  const thisGoal: Goal | null = uid && goals ? goals[uid][thisWed] : null
  const nextGoal: Goal | null = uid && goals ? goals[uid][nextWed] : null

  const [goalText, setGoalText] = useState(
    (todayIsWed ? nextGoal : thisGoal)?.text || '',
  )
  const textBeMatching = goalText && goalText === nextGoal?.text

  useEffect(() => {
    if (nextGoal) setGoalText(nextGoal?.text || '')
  }, [nextGoal])

  const updateGoal = (e: FormEvent) => {
    e.preventDefault()
    if (nextGoal) {
      updateGoalText(goalText)
    } else {
      addNewGoal(goalText)
    }
  }

  return (
    <Box mb="20px">
      <Heading as="h3">This week</Heading>

      {todayIsWed && (
        <>
          <Text>Your goal this week was:</Text>
          <Text as="em" ml="10px" marginY="100px">
            {thisGoal?.text || 'Nothing! Enter something for next week :P'}
          </Text>
          {thisGoal && (
            <Text>
              <CompletedToggle goal={thisGoal} />
              {thisGoal.completed && 'Nicely done 💪'}
              {thisGoal.completed === false && 'You can always mark this done later 🏋️'}
              {thisGoal.completed === undefined && 'Did you achieve what you wanted? How did it go?'}
            </Text>
          )}
          <Heading as="h3" mt="20px">
            Next week
          </Heading>
        </>
      )}
      <Text>
        {nextGoal?.text ? 'Your next goal is:' : 'Enter your next goal:'}
      </Text>

      <form onSubmit={updateGoal}>
        <FormControl>
          <FormLabel srOnly>Next goal</FormLabel>
          <InputGroup>
            <Input
              aria-label="Next goal"
              type="text"
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
            />
            <InputRightElement
              w={textBeMatching ? '1.5rem' : '4.5rem'}
              mr="10px"
            >
              {textBeMatching ? (
                <Text>👍</Text>
              ) : (
                <Button
                  type="submit"
                  isDisabled={!goalText}
                  h="1.75rem"
                  size="sm"
                >
                  Update
                </Button>
              )}
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>
    </Box>
  )
}

export default GoalsTextEdit
