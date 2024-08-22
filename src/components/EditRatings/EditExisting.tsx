import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { UpdateMode } from "../../models"
import { useData } from "../../firebase/contexts/data"
import { getUserId } from "../../firebase/auth"
import { updateRatingText } from "../../firebase/db"

interface Props {
  currentId: string
  setMode: (mode: UpdateMode, id?: string) => void
}

function EditExisting({ currentId, setMode }: Props) {
  const uid = getUserId()
  const { users } = useData()

  const currentRating = (users && uid) ? users[uid].ratings[currentId] : null

  const [formText, setFormText] = useState(currentRating?.text || "")
  
  useEffect(() => {
    if (users && uid && users[uid].ratings[currentId]){
      setFormText(users[uid].ratings[currentId].text)
    }
  }, [currentId, users, uid])

  const handleType = (e: ChangeEvent<HTMLInputElement>) => {
    setFormText(e.target.value)
  }

  const updateName = (e: FormEvent) => {
    e.preventDefault()

    if (currentRating?.text !== formText){
      updateRatingText(currentId, formText)
    }

    setMode('displayOnly')
  }

  if (!currentRating) return null

  return (
    <Box>
      <form onSubmit={updateName} className="newEntry_form">
        <FormControl isRequired>
            <FormLabel m="0">
              Update {currentRating.text}:
            </FormLabel>
            <InputGroup>
              <Input type="text" value={formText} onChange={handleType} />
              <InputRightElement width="4.5rem">
                <Button type="submit" h="1.75rem" size="sm">
                  Save
                </Button>
              </InputRightElement>
            </InputGroup>
        </FormControl>
      </form>
      <Button onClick={() => setMode('displayOnly')}>Cancel</Button>
    </Box>
  )
}

export default EditExisting
