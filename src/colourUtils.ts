import { dateIs } from './dateUtils'
import { Goal } from './models'

export function lightenColour(hex: string, percent: number) {
  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)

  r = Math.min(255, Math.floor(r + ((255 - r) * percent) / 100))
  g = Math.min(255, Math.floor(g + ((255 - g) * percent) / 100))
  b = Math.min(255, Math.floor(b + ((255 - b) * percent) / 100))

  const newHex = `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`

  return newHex
}

export function getGenericColour(idx: number) {
  const cols = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#d88484',
    '#ca82d1',
    '#84d8d6',
  ]
  return cols[idx % cols.length]
}

export function showAsIncomplete(goal: Goal) {
  if (goal.completed === false) return true
  if (!goal.completed && dateIs.past(goal.date)) return true
  return false
}
export function getGoalCompletedCol(goal: Goal) {
  if (goal.completed) return 'green'
  if (showAsIncomplete(goal)) return 'red'
  return 'black'
}
