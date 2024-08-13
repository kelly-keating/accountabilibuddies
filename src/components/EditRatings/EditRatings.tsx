import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  UnorderedList,
  Grid,
  GridItem,
  ListItem,
  List,
  ListIcon,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ViewOffIcon } from '@chakra-ui/icons'
import { getUserId } from '../../firebase/auth'
import { useData } from '../../firebase/contexts/data'
import { RatingKeys } from '../../models'
import { FormEvent, useEffect, useState } from 'react'
import { addNewUserRating } from '../../firebase/db'

interface Props {
  finish: () => void
}

function EditRatings({ finish }: Props) {
  const { users } = useData()
  const uid = getUserId()

  const [simpleAdd, setSimpleAdd] = useState(true)
  const toggleAdvanced = () => setSimpleAdd(!simpleAdd)

  const [selectedEdit, setSelectedEdit] = useState<string | null>(null)
  useEffect(() => {
    setSelectedEdit(null)
  }, [simpleAdd])

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
        {/* TODO: breakout to components */}
        <Flex justify="center" w="100%" h="100%">
          {simpleAdd ? (
            <form onSubmit={addRating} className="newEntry_form">
              <FormControl isRequired>
                <Flex align="center">
                  <FormLabel w="125px" m="0">
                    New entry:
                  </FormLabel>
                  <InputGroup>
                    <Input type="text" />
                    <InputRightElement width="4.5rem">
                      <Button type="submit" h="1.75rem" size="sm">
                        Add
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Flex>
              </FormControl>
            </form>
          ) : (
            <List>
              <ListItem>
                <ListIcon as={EditIcon} /> Change text
              </ListItem>
              <ListItem>
                <ListIcon as={ViewOffIcon} /> Stop asking each week
              </ListItem>
              <ListItem>
                <ListIcon as={DeleteIcon} /> Totally remove data
              </ListItem>
            </List>
          )}
        </Flex>
      </GridItem>
      <GridItem area="mainList">
        <UnorderedList pl="15px">
          {!activeRatings.length && (
            <ListItem>Nothing! Please add something below :)</ListItem>
          )}
          {activeRatings.map((r) => (
            <ListItem key={r.id} h="30px">
              {r.text}
              {!simpleAdd && (
                <>
                  <Button colorScheme="teal" size="xs" aria-label="Edit text">
                    <EditIcon />
                  </Button>
                  <Button colorScheme="teal" size="xs" aria-label="Pause">
                    <ViewOffIcon />
                  </Button>
                  <Button colorScheme="teal" size="xs" aria-label="Delete">
                    <DeleteIcon />
                  </Button>
                </>
              )}
            </ListItem>
          ))}
        </UnorderedList>
      </GridItem>
      <GridItem area="blank" />
      <GridItem area="footer">
        <Button onClick={finish} colorScheme="teal" mr="10px">
          Finish
        </Button>
        <Button onClick={toggleAdvanced} mr="10px">
          {simpleAdd ? 'Advanced Edit' : 'Hide Advanced'}
        </Button>
      </GridItem>
    </Grid>
  )
}

export default EditRatings
