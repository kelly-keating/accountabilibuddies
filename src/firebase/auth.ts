import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"

const auth = getAuth()
export default auth

export function getUserId (): string | null {
  return auth.currentUser?.uid || null
}

export function register (email: string, password: string, errFn: (code: string) => void) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch(({ code }) => errFn(readError(code)))
}

export function login (email: string, password: string, errFn: (code: string) => void) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch(({ code }) => errFn(readError(code)))
}

export function logout () {
  return signOut(auth)
    .then(() => {
      console.log('LOGGED OUT')
    }).catch((error) => {
      console.log('LOG OUT ERROR:', error.code, error.message)
    })
}

function readError (code: string) {
  console.log(code)
  switch (code) {
    case 'auth/weak-password':
      return 'Password too weak'
    case 'auth/email-already-in-use':
      return 'Email already registered'
    case 'auth/wrong-password':
      return 'Password incorrect'
    case 'auth/user-not-found':
      return 'Email incorrect'
    case 'auth/too-many-requests':
      return 'Too many requests - please try again later'
    default:
      return code
  }
}
