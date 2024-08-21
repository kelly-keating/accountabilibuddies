import {
  Button,
  Heading,
  Flex,
  Grid,
  GridItem,
  Box,
} from '@chakra-ui/react'
import { getUserId } from '../../firebase/auth'
import { useData } from '../../firebase/contexts/data'
import { RatingKeys, UpdateMode } from '../../models'
import { FormEvent, useEffect, useState } from 'react'
import { addNewUserRating } from '../../firebase/db'
import IconKey from './IconKey'
import AddNewForm from './AddNewForm'
import CurrentTrackingItem from './CurrentTrackingItem'
import ConfirmDelete from './ConfirmDelete'
import EditExisting from './EditExisting'

interface Props {
  finish: () => void
}

function EditRatings({ finish }: Props) {
  const { users } = useData()
  const uid = getUserId()

  const [advancedMode, setAdvancedMode] = useState(false)
  const toggleAdvanced = () => setAdvancedMode(!advancedMode)

  const [editMode, setEditMode] = useState<UpdateMode>("displayOnly")
  const [focusId, setFocusId] = useState<string | null>(null)
  const setSelectedEdit = (mode: UpdateMode, id?: string) => {
    setEditMode(mode)
    setFocusId(id || null)
  }

  useEffect(() => {
    setSelectedEdit("displayOnly")
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
            <>
              {editMode === "displayOnly" && <IconKey />}
              {editMode === "update" && <EditExisting />}
              {editMode === "delete" && <ConfirmDelete />}
            </>
          )}
        </Flex>
      </GridItem>
      <GridItem area="mainList">
        <Box w="1fr">
          {!activeRatings.length && (
            <Box>Nothing! Please add something :)</Box>
          )}
          {activeRatings.map((r) => (
            <CurrentTrackingItem
              key={r.id}
              {...r}
              changeMode={setEditMode} 
              advancedMode={advancedMode}
            />
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
