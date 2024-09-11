import { Button } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'

function ToggleEditButton() {
  const [params, setSearchParams] = useSearchParams()

  const closeEdit = () => setSearchParams()
  const openEdit = () => {
    params.set('edit', 'true')
    setSearchParams(params)
  }
  const showEdit = Boolean(params.get('edit'))

  return (
    <Button as="button" onClick={showEdit ? closeEdit : openEdit} mr="10px">
      {showEdit ? 'Cancel Edit' : 'Edit your weekly goals'}
    </Button>
  )
}

export default ToggleEditButton
