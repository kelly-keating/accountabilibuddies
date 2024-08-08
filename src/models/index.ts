import { User } from 'firebase/auth'

export type FirebaseUser = User

export interface Fruit {
  id: number
  name: string
  rating: number
}

export interface Vinyl {
  id: number
  artist: string
  title: string
  image: string
}
