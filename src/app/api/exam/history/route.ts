import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 })
    }

    const history = await prisma.examResult.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })

    return NextResponse.json({ history })
  } catch (error) {
    console.error('Error fetching exam history:', error)
    return NextResponse.json({ message: 'Gagal mengambil riwayat ujian.' }, { status: 500 })
  }
}
