import { getDatabase, ref, onValue, set, remove } from "firebase/database"

// import { getUserId } from './auth'

const db = getDatabase()
export default db

type ListenerFn = (data: any) => void

export function startListening (
  usersFn: ListenerFn,
  activeUsersFn: ListenerFn,
  ratingsFn: ListenerFn,
) {
  const activeUsersRef = ref(db, `active-users`)
  const usersRef = ref(db, `users`)
  const ratingsRef = ref(db, `ratings`)

  onValue(activeUsersRef, (snapshot) => activeUsersFn(snapshot.val()))
  onValue(usersRef, (snapshot) => usersFn(snapshot.val()))
  onValue(ratingsRef, (snapshot) => ratingsFn(snapshot.val()))
}

// // USER

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
