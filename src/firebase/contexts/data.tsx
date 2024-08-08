import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { onValue, ref } from 'firebase/database'
import db from '../db'
import { ActiveUsers, AllUsers, Ratings } from '../../models'

interface Props {
  children: ReactNode
}
interface Data {
  activeUsers: ActiveUsers | null,
  ratings: Ratings | null,
  users: AllUsers | null,
}

const DataContext = createContext<Data>({
  activeUsers: null,
  ratings: null,
  users: null,
})

export const DataProvider = ({ children }: Props) => {
  const [activeUsers, setActiveUsers] = useState<ActiveUsers | null>(null)
  const [ratings, setRatings] = useState<Ratings | null>(null)
  const [users, setUsers] = useState<AllUsers | null>(null)

  useEffect(() => {
    const activeUsersRef = ref(db, `active-users`)
    const ratingsRef = ref(db, `ratings`)
    const usersRef = ref(db, `users`)

    const unsubActives = onValue(activeUsersRef, (snapshot) => setActiveUsers(snapshot.val()))
    const unsubRatings = onValue(ratingsRef, (snapshot) => setRatings(snapshot.val()))
    const unsubUsers = onValue(usersRef, (snapshot) => setUsers(snapshot.val()))

    return () => {
      unsubActives()
      unsubRatings()
      unsubUsers()
    }
  }, [])

  return (
    <DataContext.Provider value={{ activeUsers, ratings, users }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
}