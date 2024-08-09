import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react'
import { DataSnapshot, onValue, ref } from 'firebase/database'
import db from '../db'
import { ActiveUsers, AllUsers, Ratings } from '../../models'

interface Props {
  children: ReactNode
}

type PotentialActive = ActiveUsers | null
type PotentialRatings = Ratings | null
type PotentialUsers = AllUsers | null
interface Data {
  activeUsers: PotentialActive
  ratings: PotentialRatings
  users: PotentialUsers
  loading: boolean
}

const DataContext = createContext<Data>({
  activeUsers: null,
  ratings: null,
  users: null,
  loading: true,
})

export const DataProvider = ({ children }: Props) => {
  const [activeUsers, setActiveUsers] = useState<PotentialActive>(null)
  const [ratings, setRatings] = useState<PotentialRatings>(null)
  const [users, setUsers] = useState<PotentialUsers>(null)
  const [loading, setLoading] = useState(true)

  const stillLoading = useRef({
    active: true,
    ratings: true,
    users: true,
  })

  useEffect(() => {
    const activeUsersRef = ref(db, `active-users`)
    const ratingsRef = ref(db, `ratings`)
    const usersRef = ref(db, `users`)

    const gotData = (
      fn: Dispatch<SetStateAction<any>>,
      str: 'active' | 'ratings' | 'users',
    ): ((snapshot: DataSnapshot) => void) => {
      return (snapshot) => {
        fn(snapshot.val())
        if (stillLoading.current[str]) {
          stillLoading.current[str] = false
          const { active, ratings, users } = stillLoading.current
          if (!active && !ratings && !users) {
            setLoading(false)
          }
        }
      }
    }

    const unsubActives = onValue(activeUsersRef, gotData(setActiveUsers, 'active'))
    const unsubRatings = onValue(ratingsRef, gotData(setRatings, 'ratings'))
    const unsubUsers = onValue(usersRef, gotData(setUsers, 'users'))

    return () => {
      unsubActives()
      unsubRatings()
      unsubUsers()
    }
  }, [])

  return (
    <DataContext.Provider value={{ activeUsers, ratings, users, loading }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  return useContext(DataContext)
}
