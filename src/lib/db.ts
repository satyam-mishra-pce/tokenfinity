import { type Db } from "mongodb"
import clientPromise from "./mongodb"

let cachedDb: Db | null = null

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }

  const client = await clientPromise
  const db = client.db()
  cachedDb = db
  return db
}

export async function getUserData(email: string) {
  const db = await connectToDatabase()
  const userCollection = db.collection("userData")
  return userCollection.findOne({ email })
}

export async function updateUserData(email: string, data: Partial<UserData>) {
  const db = await connectToDatabase()
  const userCollection = db.collection("userData")
  return userCollection.updateOne({ email }, { $set: data })
}

interface UserData {
  email: string
  name: string
  image: string
  twitterUsername: string
  createdAt: Date
  lastLogin: Date
}

