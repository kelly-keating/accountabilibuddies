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
import { ActiveUsers, AllUsers, Goals, Ratings } from '../../models'

import { DataSnapshot, onValue, ref } from 'firebase/database'
import db from '../db'

interface Props {
  children: ReactNode
}

type PotentialActive = ActiveUsers | null
type PotentialGoals = Goals | null
type PotentialRatings = Ratings | null
type PotentialUsers = AllUsers | null
interface Data {
  activeUsers: PotentialActive
  goals: PotentialGoals
  ratings: PotentialRatings
  users: PotentialUsers
  loading: boolean
}

const DataContext = createContext<Data>({
  activeUsers: null,
  goals: null,
  ratings: null,
  users: null,
  loading: true,
})

export const DataProvider = ({ children }: Props) => {
  const [activeUsers, setActiveUsers] = useState<PotentialActive>(null)
  const [goals, setGoals] = useState<PotentialGoals>(null)
  const [ratings, setRatings] = useState<PotentialRatings>(null)
  const [users, setUsers] = useState<PotentialUsers>(null)
  const [loading, setLoading] = useState(true)

  const stillLoading = useRef({
    active: true,
    goals: true,
    ratings: true,
    users: true,
  })

  useEffect(() => {
    const activeUsersRef = ref(db, `activeUsers`)
    const goalsRef = ref(db, `goals`)
    const ratingsRef = ref(db, `ratings`)
    const usersRef = ref(db, `users`)

    const gotData = (
      fn: Dispatch<SetStateAction<any>>,
      str: 'active' | 'goals' | 'ratings' | 'users',
    ): ((snapshot: DataSnapshot) => void) => {
      return (snapshot) => {
        fn(snapshot.val())
        if (stillLoading.current[str]) {
          stillLoading.current[str] = false
          const { active, goals, ratings, users } = stillLoading.current
          if (!active && !goals && !ratings && !users) {
            setLoading(false)
          }
        }
      }
    }

    const unsubActives = onValue(activeUsersRef, gotData(setActiveUsers, 'active'))
    const unsubGoals = onValue(goalsRef, gotData(setGoals, 'goals'))
    const unsubRatings = onValue(ratingsRef, gotData(setRatings, 'ratings'))
    const unsubUsers = onValue(usersRef, gotData(setUsers, 'users'))

    return () => {
      unsubActives()
      unsubGoals()
      unsubRatings()
      unsubUsers()
    }
  }, [])

  return (
    <DataContext.Provider value={{ activeUsers, goals, ratings, users, loading }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  return useContext(DataContext)
}
