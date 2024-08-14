import { getDatabase, ref, set, get } from 'firebase/database'
import { FirebaseUser } from '../models'
import { getUserId } from './auth'
import { getNextWednesday } from '../dateUtils'

// import { getUserId } from './auth'

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

export function updateRatingThisWeek(ratingId: string, val: number) {
  const uid = getUserId()
  const date = getNextWednesday()
  const ratingRef = ref(db, `ratings/${uid}/${date}/${ratingId}`)

  set(ratingRef, val)
}

// ACTIVE USERS

export function setUserActive(uid: string) {
  const activeRef = ref(db, `activeUsers/` + uid)
  set(activeRef, true)
}
