import { DeleteIcon, EditIcon, ViewOffIcon, ViewIcon } from '@chakra-ui/icons'
import { Button, Box, Text } from '@chakra-ui/react'
import { UpdateMode } from '../../models'

import { updateRatingActive } from '../../firebase/db'

interface Props {
  id: string
  text: string
  current: boolean
  col?: string
  advancedMode: boolean
  changeMode: (mode: UpdateMode, id?: string) => void
}

function CurrentTrackingItem({ id, text, current, advancedMode, changeMode }: Props) {
  const buttonCol = current ? 'teal' : 'gray'
  return (
    <Box minH="30px" display="flex" justifyContent="space-between">
      <Text maxW="200px" decoration={!current ? 'line-through' : ''}>
        {text}
      </Text>
      {advancedMode && (
        <Box>
          <Button
            onClick={() => updateRatingActive(id, !current)}
            colorScheme={buttonCol}
            aria-label="Pause"
            size="xs" ml="10px"
          >
            {current ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
          <Button
            onClick={() => changeMode('update', id)}
            colorScheme={buttonCol}
            aria-label="Edit text"
            size="xs" ml="10px"
          >
            <EditIcon />
          </Button>
          <Button
            onClick={() => changeMode('delete', id)}
            colorScheme={buttonCol}
            aria-label="Delete"
            size="xs" ml="10px"
          >
            <DeleteIcon />
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default CurrentTrackingItem
