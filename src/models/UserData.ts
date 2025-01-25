import type { ObjectId } from "mongodb"

export interface UserData {
  _id: ObjectId
  email: string
  name: string
  image: string
  twitterUsername: string
  createdAt: Date
  lastLogin: Date
  bio?: string
  location?: string
  website?: string
  followers?: number
  following?: number
  isVerified: boolean
}

export type UserDataInput = Omit<UserData, "_id" | "createdAt" | "lastLogin">

