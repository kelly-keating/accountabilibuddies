export function getNextWednesday() {
  const now = new Date()
  const currentDay = now.getDay()

  // btw - Wednesday is day 3 in week
  const daysUntilWednesday = (3 - currentDay + 7) % 7

  const nextWednesday = new Date(now)
  nextWednesday.setDate(now.getDate() + daysUntilWednesday)

  const year = nextWednesday.getFullYear()
  const month = String(nextWednesday.getMonth() + 1).padStart(2, '0')
  const day = String(nextWednesday.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const formatDate = {
  firebaseToDisplay: (str) => {
    const [year, month, day] = str.split('-')
    return [day, month, year].join('/') 
  },
  displayToFirebase: (str) => {
    const [day, month, year] = str.split('/')
    return [year, month, day].join('-')
  },
}
