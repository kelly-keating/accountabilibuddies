import * as FirebaseAuth from 'firebase/auth'

// ----- USERS -----

export type FirebaseUser = FirebaseAuth.User
export interface User {
  displayName: string
  photoUrl: string
  lastEntry: string | null
  ratings: Record<string, RatingKey>
}
export type AllUsers = Record<string, User>
export type ActiveUsers = Record<string, boolean>

// ----- GOALS -----

export interface Goal {
  date: string
  text: string
  completed?: boolean
}
export type Goals = Record<string, Record<string, Goal>>

// ----- RATINGS -----

export interface RatingKey {
  id: string
  text: string
  current: boolean
  col?: string
}
export type Ratings = Record<string, Record<string, Record<string, number>>>

// ----- MISC -----

export type UpdateMode = 'displayOnly' | 'update' | 'delete'
