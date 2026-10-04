import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getWeakMaterials } from '@/lib/mastery'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 })
    }

    const weak = await getWeakMaterials(session.user.id, 20)
    return NextResponse.json({ items: weak })
  } catch (error) {
    console.error('Error fetching weak materials:', error)
    return NextResponse.json({ message: 'Gagal mengambil data materi lemah.' }, { status: 500 })
  }
}
