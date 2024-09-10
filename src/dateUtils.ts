const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const
const meetingOn = 'Wednesday' // <---- Update as needed

export const meetingDay = {
  text: meetingOn,
  num: weekdays.indexOf(meetingOn),
}

export const formatDate = {
  dateToString: (givenDate: Date) => {
    const year = givenDate.getFullYear()
    const month = String(givenDate.getMonth() + 1).padStart(2, '0')
    const day = String(givenDate.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  },
  firebaseToDisplay: (str: string) => {
    const [year, month, day] = str.split('-')
    return [day, month, year].join('/')
  },
  displayToFirebase: (str: string) => {
    const [day, month, year] = str.split('/')
    return [year, month, day].join('-')
  },
}

export const dateIs = {
  past: (date: string) =>
    compareDate(date, (givenDate, today) => givenDate < today),
  today: (date: string) =>
    compareDate(
      date,
      (givenDate, today) => givenDate.toDateString() === today.toDateString(),
    ),
  future: (date: string) =>
    compareDate(date, (givenDate, today) => givenDate > today),
}

export function getThisWednesday() {
  return findComingWednesday(true)
}

export function getNextWednesday() {
  return findComingWednesday(false)
}

export function getRecentWednesdays() {
  const now = new Date()
  const currentDay = now.getDay()
  const daysSinceLastWednesday = (currentDay - meetingDay.num + 7) % 7 || 7

  const lastWednesday = new Date()
  lastWednesday.setDate(now.getDate() - daysSinceLastWednesday)

  const recentWednesdays = [getThisWednesday()]

  for (let i = 0; i < 4; i++) {
    recentWednesdays.push(formatDate.dateToString(lastWednesday))
    lastWednesday.setDate(lastWednesday.getDate() - 7)
  }

  return recentWednesdays
}

// ----- INTERNAL TOOLS -----

function findComingWednesday(todayInclusive: boolean) {
  const now = new Date()
  const currentDay = now.getDay()

  let daysUntilWednesday = (meetingDay.num - currentDay + 7) % 7
  if (!todayInclusive && daysUntilWednesday === 0) {
    daysUntilWednesday = 7
  }

  const nextWednesday = new Date(now)
  nextWednesday.setDate(now.getDate() + daysUntilWednesday)
  return formatDate.dateToString(nextWednesday)
}

function compareDate(
  dateStr: string,
  fn: (givenDate: Date, today: Date) => boolean,
) {
  const inputDate = new Date(dateStr)
  const currentDate = new Date()
  // compare date only, ignore time of day
  inputDate.setHours(0, 0, 0, 0)
  currentDate.setHours(0, 0, 0, 0)

  return fn(inputDate, currentDate)
}
