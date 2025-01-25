import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { getUserData } from "@/lib/db"

export async function GET() {
  const session = await getServerSession()

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const userData = await getUserData(session.user.email)

  if (!userData) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(userData)
}

