export function getRecentWednesdays() {
  const now = new Date()
  const currentDay = now.getDay()
  const daysSinceLastWednesday = (currentDay - 3 + 7) % 7 || 7

  const lastWednesday = new Date()
  lastWednesday.setDate(now.getDate() - daysSinceLastWednesday)

  const recentWednesdays = [getNextWednesday()]

  for (let i = 0; i < 4; i++) {
    recentWednesdays.push(formatDate.dateToString(lastWednesday))
    lastWednesday.setDate(lastWednesday.getDate() - 7)
  }

  return recentWednesdays
}

export function getNextWednesday() {
  const now = new Date()
  const currentDay = now.getDay()
  // btw - Wednesday is day 3 in week
  const daysUntilWednesday = (3 - currentDay + 7) % 7

  const nextWednesday = new Date(now)
  nextWednesday.setDate(now.getDate() + daysUntilWednesday)
  return formatDate.dateToString(nextWednesday)
}

export const formatDate = {
  dateToString: (givenDate) => {
    const year = givenDate.getFullYear()
    const month = String(givenDate.getMonth() + 1).padStart(2, '0')
    const day = String(givenDate.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  },
  firebaseToDisplay: (str) => {
    const [year, month, day] = str.split('-')
    return [day, month, year].join('/')
  },
  displayToFirebase: (str) => {
    const [day, month, year] = str.split('/')
    return [year, month, day].join('-')
  },
}
