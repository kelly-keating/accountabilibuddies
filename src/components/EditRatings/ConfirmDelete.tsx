import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { UpdateMode } from '../../models'

import { useData } from '../../firebase/contexts/data'
import { getUserId } from '../../firebase/auth'
import { deleteRatingForever } from '../../firebase/db'

interface Props {
  currentId: string
  setMode: (mode: UpdateMode, id?: string) => void
}

function ConfirmDelete({ currentId, setMode }: Props) {
  const uid = getUserId()
  const { users } = useData()

  const currentRating = users && uid ? users[uid].ratings[currentId] : null

  const close = () => setMode('displayOnly')

  const deleteIt = () => {
    deleteRatingForever(currentId)
    close()
  }

  if (!currentRating) return null

  return (
    <Box>
      <Heading as="h3" size="sm">
        Are you sure you want to delete {currentRating.text} forever?
      </Heading>
      <Text>You can hide it if you want it to still show on your graph.</Text>
      <Box>
        <Button onClick={deleteIt} colorScheme="red">
          Delete it!
        </Button>
        <Button onClick={close}>Cancel</Button>
      </Box>
    </Box>
  )
}

export default ConfirmDelete
