import { Button } from '@chakra-ui/react'

interface Props {
  showEdit: boolean
  openEdit: () => void
  closeEdit: () => void
}

function ShowRatingButton({ showEdit, openEdit, closeEdit }: Props) {
  return (
    <Button as="button" onClick={showEdit ? closeEdit : openEdit} mr="10px">
      {showEdit ? 'Cancel Edit' : 'Edit your entries'}
    </Button>
  )
}

export default ShowRatingButton
