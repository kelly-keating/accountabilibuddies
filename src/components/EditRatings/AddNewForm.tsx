import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { FormEvent } from 'react'

interface Props {
  addFn: (e: FormEvent) => void
}

function AddNewForm({ addFn }: Props) {
  return (
    <form onSubmit={addFn} className="newEntry_form">
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
  )
}

export default AddNewForm
