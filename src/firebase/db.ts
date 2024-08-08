import { getDatabase, ref, set, remove, get } from "firebase/database"
import { FirebaseUser } from "../models"

// import { getUserId } from './auth'

const db = getDatabase()
export default db

// USER

export async function checkUserExists (uid: string) {
  const userInfoRef = ref(db, `users/` + uid)
  try {
    const snapshot = await get(userInfoRef)
    return snapshot.exists()
  } catch (error) {
    console.error(error)
  }
}

export function addNewUser (userDetails: FirebaseUser) {
  const newUserData = {
    displayName: userDetails.displayName,
    photoUrl: userDetails.photoURL,
    lastEntry: null,
    ratings: {}
  } // TODO: fb doesn't display these two nothing keys

  const userRef = ref(db, `users/` + userDetails.uid)
  set(userRef, newUserData)

  setUserActive(userDetails.uid)
}

// ACTIVE USERS

export function setUserActive (uid: string) {
  const activeRef = ref(db, `activeUsers/` + uid)
  set(activeRef, true)
}

// export function setUpdated () {
//   const userRef = ref(db, `${getUserId()}/user/lastUpdated`)
//   return set(userRef, Date.now())
// }

// // GROUP

// export function addGroup (name) {
//   const groupRef = ref(db, `${getUserId()}/groups/${name}`)
//   return set(groupRef, { placeholder: true })
// }

// export function deleteGroup (name) {
//   const groupRef = ref(db, `${getUserId()}/groups/${name}`)
//   return remove(groupRef)
// }

// export function saveFeedToGroup (feedId, group) {
//   const groupRef = ref(db, `${getUserId()}/groups/${group}/${feedId}`)
//   const feedRef = ref(db, `${getUserId()}/feeds/${feedId}/groups/${group}`)
//   return Promise.all([ set(groupRef, true), set(feedRef, true) ])
// }

// export function deleteFeedFromGroup (feedId, group) {
//   const groupRef = ref(db, `${getUserId()}/groups/${group}/${feedId}`)
//   const feedRef = ref(db, `${getUserId()}/feeds/${feedId}/groups/${group}`)
//   return Promise.all([ remove(groupRef), remove(feedRef) ])
// }

// // FEED

// export function addFeed (id, data) {
//   const feedRef = ref(db, `${getUserId()}/feeds/${id}`)
//   return set(feedRef, data)
// }

// export function deleteFeed (id) {
//   const feedRef = ref(db, `${getUserId()}/feeds/${id}`)
//   return remove(feedRef)
// }

// // VIDEO

// export function addVid (id, video) {
//   const videoRef = ref(db, `${getUserId()}/videos/${id}`)
//   return set(videoRef, video)
// }

// export function delVideo (id) {
//   const videoRef = ref(db, `${getUserId()}/videos/${id}`)
//   return remove(videoRef)
// }
