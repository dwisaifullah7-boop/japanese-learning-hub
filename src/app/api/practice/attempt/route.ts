import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized. Silakan login terlebih dahulu.' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { materialType, materialId, isCorrect } = body

    if (!materialType || !materialId || typeof isCorrect !== 'boolean') {
      return NextResponse.json(
        { message: 'Payload tidak valid. materialType, materialId, dan isCorrect wajib diisi.' },
        { status: 400 }
      )
    }

    const attempt = await prisma.practiceAttempt.create({
      data: {
        userId: session.user.id,
        materialType,
        materialId,
        isCorrect,
      },
    })

    return NextResponse.json(
      { message: 'Practice attempt tersimpan.', attempt },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving practice attempt:', error)
    return NextResponse.json(
      { message: 'Gagal menyimpan data latihan.' },
      { status: 500 }
    )
  }
}
