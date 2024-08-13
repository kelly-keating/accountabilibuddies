import { getUserId } from '../firebase/auth'

function ThisWeek() {
  const uid = getUserId()

  return (
    <h2>ThisWeek</h2>
  )
}

export default ThisWeek
