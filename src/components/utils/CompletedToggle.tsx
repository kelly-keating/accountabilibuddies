import { ButtonGroup, IconButton } from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Goal } from '../../models'

import { setGoalComplete } from '../../firebase/db'
import { showAsIncomplete } from '../../colourUtils'

interface Props {
  goal: Goal
}

// TODO: don't put this in a Text tag
function CompletedToggle({ goal }: Props) {
  return (
    <ButtonGroup size="sm" isAttached variant="solid" mr="5px">
      <IconButton
        aria-label="mark completed"
        icon={<CheckIcon />}
        onClick={() => setGoalComplete(goal.date, true)}
        colorScheme={goal.completed ? 'green' : 'gray'}
        isDisabled={goal.completed}
      />
      <IconButton
        aria-label="mark incomplete"
        icon={<CloseIcon />}
        onClick={() => setGoalComplete(goal.date, false)}
        colorScheme={showAsIncomplete(goal) ? 'red' : 'gray'}
        isDisabled={!goal.completed}
      />
    </ButtonGroup>
  )
}

export default CompletedToggle
