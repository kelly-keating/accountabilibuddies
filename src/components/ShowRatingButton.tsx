import { Button } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'

function ShowRatingButton() {
  const { pathname } = useLocation()
  const goTo = useNavigate()

  const isEditPage = pathname.includes("goals")
  const closeEdit = () => goTo("/")
  const openEdit = () => goTo("/goals?edit=true")

  return (
    <Button as="button" onClick={isEditPage ? closeEdit : openEdit} mr="10px">
      {isEditPage ? 'Cancel Edit' : 'Edit your entries'}
    </Button>
  )
}

export default ShowRatingButton
