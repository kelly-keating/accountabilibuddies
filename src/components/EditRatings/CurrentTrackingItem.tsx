import {
  Button,
  Box,
  Text,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ViewOffIcon } from '@chakra-ui/icons'
import { UpdateMode } from '../../models'

interface Props {
  id: string
  text: string
  col?: string
  advancedMode: boolean
  changeMode: (mode: UpdateMode, id?: string) => void
}

function CurrentTrackingItem({ id, text, advancedMode, changeMode }: Props) {
  return (
    <Box minH="30px" display="flex" justifyContent="space-between">
      <Text maxW="200px">{text}</Text>
      {advancedMode && (
        <Box>
          <Button colorScheme="teal" size="xs" ml="10px" aria-label="Pause">
            <ViewOffIcon />
          </Button>
          <Button onClick={() => changeMode('update', id)} colorScheme="teal" size="xs" ml="10px" aria-label="Edit text">
            <EditIcon />
          </Button>
          <Button onClick={() => changeMode('delete', id)} colorScheme="teal" size="xs" ml="10px" aria-label="Delete">
            <DeleteIcon />
          </Button>
        </Box>
      )}
      </Box>
  )
}

export default CurrentTrackingItem
