import {
  Button,
  Heading,
  Flex,
  Grid,
  GridItem,
  Box,
  Text,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ViewOffIcon } from '@chakra-ui/icons'
import { getUserId } from '../../firebase/auth'
import { useData } from '../../firebase/contexts/data'
import { RatingKeys } from '../../models'
import { FormEvent, useEffect, useState } from 'react'
import { addNewUserRating } from '../../firebase/db'
import IconKey from './IconKey'
import AddNewForm from './AddNewForm'

interface Props {
  finish: () => void
}

function EditRatings({ finish }: Props) {
  const { users } = useData()
  const uid = getUserId()

  const [advancedMode, setAdvancedMode] = useState(false)
  const toggleAdvanced = () => setAdvancedMode(!advancedMode)

  const [selectedEdit, setSelectedEdit] = useState<string | null>(null)
  useEffect(() => {
    setSelectedEdit(null)
  }, [advancedMode])

  const loaded = users && uid && users[uid]
  if (!loaded) return null

  const allRatings = users[uid].ratings
  const activeRatings = allRatings
    ? (Object.values(allRatings) as RatingKeys[]).filter((r) => r.current)
    : []

  const addRating = (e: FormEvent) => {
    e.preventDefault()
    const input = (e.target as HTMLFormElement).elements[0] as HTMLInputElement
    addNewUserRating(input.value)
  }

  return (
    <Grid
      templateAreas={`"startPadding header"
                      "updateForm mainList"
                      "blank footer"`}
      gridTemplateRows="20px 1fr 50px"
      gridTemplateColumns="3fr 2fr"
      gap="8"
    >
      <GridItem area="startPadding" />
      <GridItem area="header">
        <Heading as="h3" size="sm">
          Currently tracking:
        </Heading>
      </GridItem>
      <GridItem area="updateForm">
        <Flex justify="center" w="100%" h="100%">
          {!advancedMode ? (
            <AddNewForm addFn={addRating} />
          ) : (
            <IconKey />
          )}
        </Flex>
      </GridItem>
      <GridItem area="mainList">
        <Box w="1fr">
          {!activeRatings.length && (
            <Box>Nothing! Please add something :)</Box>
          )}
          {activeRatings.map((r) => (
            <Box key={r.id} minH="30px" display="flex" justifyContent="space-between">
              <Text maxW="200px">{r.text}</Text>
              {advancedMode && (
                <Box>

                  <Button colorScheme="teal" size="xs" ml="10px" aria-label="Edit text">
                    <EditIcon />
                  </Button>
                  <Button colorScheme="teal" size="xs" ml="10px" aria-label="Pause">
                    <ViewOffIcon />
                  </Button>
                  <Button colorScheme="teal" size="xs" ml="10px" aria-label="Delete">
                    <DeleteIcon />
                  </Button>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </GridItem>
      <GridItem area="blank" />
      <GridItem area="footer">
        <Button onClick={finish} colorScheme="teal" mr="10px">
          Finish
        </Button>
        <Button onClick={toggleAdvanced} mr="10px">
          {advancedMode ? 'Hide Advanced' : 'Advanced Edit'}
        </Button>
      </GridItem>
    </Grid>
  )
}

export default EditRatings
