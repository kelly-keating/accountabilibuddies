import { DeleteIcon, EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { List, ListIcon, ListItem } from "@chakra-ui/react"

function IconKey() {
  return (
    <List>
      <ListItem>
        <ListIcon as={ViewIcon} /> Show this each week
      </ListItem>
      <ListItem>
        <ListIcon as={ViewOffIcon} /> Stop asking about this
      </ListItem>
      <ListItem>
        <ListIcon as={EditIcon} /> Change text
      </ListItem>
      <ListItem>
        <ListIcon as={DeleteIcon} /> Totally remove data
      </ListItem>
    </List>
  )
}

export default IconKey
