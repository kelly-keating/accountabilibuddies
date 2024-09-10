import { FirebaseUser } from '../models'
import { getDatabase, ref, set, get, remove } from 'firebase/database'

import { getUserId } from './auth'
import { getNextWednesday, getThisWednesday } from '../dateUtils'

const db = getDatabase()
export default db

// USER

export async function checkUserExists(uid: string) {
  const userInfoRef = ref(db, `users/` + uid)
  try {
    const snapshot = await get(userInfoRef)
    return snapshot.exists()
  } catch (error) {
    console.error(error)
  }
}

export function addNewUser(userDetails: FirebaseUser) {
  const uid = getUserId() || userDetails.uid
  const newUserData = {
    displayName: userDetails.displayName,
    photoUrl: userDetails.photoURL,
  }

  const userRef = ref(db, `users/` + uid)
  set(userRef, newUserData)

  setUserActive(uid)
}

// RATINGS

export function addNewUserRating(text: string) {
  const uid = getUserId()
  const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

  const ratingRef = ref(db, `users/${uid}/ratings/` + uniqueId)
  const ratingObj = {
    id: uniqueId,
    current: true,
    text,
  }

  set(ratingRef, ratingObj)
}

export function updateRatingText(id: string, newText: string) {
  const uid = getUserId()
  const ratingLabelRef = ref(db, `users/${uid}/ratings/${id}/text`)

  set(ratingLabelRef, newText)
}

export function updateRatingActive(id: string, newState: boolean) {
  const uid = getUserId()
  const ratingLabelRef = ref(db, `users/${uid}/ratings/${id}/current`)

  set(ratingLabelRef, newState)
}

export function deleteRatingForever(id: string) {
  const uid = getUserId()
  const ratingLabelRef = ref(db, `users/${uid}/ratings/` + id)

  remove(ratingLabelRef)
}

export function updateRatingThisWeek(ratingId: string, val: number) {
  const uid = getUserId()
  const date = getThisWednesday()
  const ratingRef = ref(db, `ratings/${uid}/${date}/${ratingId}`)

  set(ratingRef, val)
}

// GOALS

export function addNewGoal(text: string) {
  const uid = getUserId()
  const date = getNextWednesday()
  const goalRef = ref(db, `goals/${uid}/${date}`)

  const newGoal = {
    text,
    date,
  }

  set(goalRef, newGoal)
}

export function updateGoalText(text: string) {
  const uid = getUserId()
  const date = getNextWednesday()
  const goalRef = ref(db, `goals/${uid}/${date}/text`)

  set(goalRef, text)
}

export function setGoalComplete(date: string, status: boolean) {
  const uid = getUserId()
  const goalRef = ref(db, `goals/${uid}/${date}/completed`)

  set(goalRef, status)
}

// ACTIVE USERS

export function setUserActive(uid: string) {
  const activeRef = ref(db, `activeUsers/` + uid)
  set(activeRef, true)
}
