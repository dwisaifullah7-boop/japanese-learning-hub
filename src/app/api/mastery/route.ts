import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getMasterySummary } from '@/lib/mastery'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 })
    }

    const summary = await getMasterySummary(session.user.id)
    return NextResponse.json(summary)
  } catch (error) {
    console.error('Error fetching mastery summary:', error)
    return NextResponse.json({ message: 'Gagal mengambil data mastery.' }, { status: 500 })
  }
}
