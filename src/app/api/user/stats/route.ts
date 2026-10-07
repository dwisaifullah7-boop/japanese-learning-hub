import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getUserStats } from '@/lib/progress'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const stats = await getUserStats(session.user.id)
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
