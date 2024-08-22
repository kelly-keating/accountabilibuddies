import {
  Button,
  Box,
  Text,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ViewOffIcon, ViewIcon } from '@chakra-ui/icons'
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
  const buttonCol = current ? "teal" : "gray" 
  return (
    <Box minH="30px" display="flex" justifyContent="space-between">
      <Text maxW="200px" decoration={!current ? "line-through": ""}>{text}</Text>
      {advancedMode && (
        <Box>
          <Button onClick={() => updateRatingActive(id, !current)} colorScheme={buttonCol} size="xs" ml="10px" aria-label="Pause">
            {current ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
          <Button onClick={() => changeMode('update', id)} colorScheme={buttonCol} size="xs" ml="10px" aria-label="Edit text">
            <EditIcon />
          </Button>
          <Button onClick={() => changeMode('delete', id)} colorScheme={buttonCol} size="xs" ml="10px" aria-label="Delete">
            <DeleteIcon />
          </Button>
        </Box>
      )}
      </Box>
  )
}

export default CurrentTrackingItem
