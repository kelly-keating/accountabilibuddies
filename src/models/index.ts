import * as FirebaseAuth from 'firebase/auth'

export type FirebaseUser = FirebaseAuth.User
export interface User {
  displayName: string
  photoUrl: string
  lastEntry: string | null
  ratings: Record<string, RatingKeys>
}

export type AllUsers = Record<string, User>
export type ActiveUsers = Record<string, boolean>

export interface RatingKeys {
  id: string
  text: string
  current: boolean
  col?: string
}
export type Ratings = Record<string, Record<string, Record<string, number>>>

export type UpdateMode = "displayOnly" | "update" | "delete"
