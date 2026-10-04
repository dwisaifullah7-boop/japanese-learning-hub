import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { updateMastery } from '@/lib/mastery'

interface SubmittedAnswer {
  materialType: string
  materialId: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  questionText?: string
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized. Silakan login terlebih dahulu.' }, { status: 401 })
    }

    const userId = session.user.id

    const body = await req.json()
    const { title, durationSeconds, answers } = body as {
      title?: string
      durationSeconds?: number
      answers?: SubmittedAnswer[]
    }

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ message: 'Jawaban ujian tidak valid.' }, { status: 400 })
    }

    const totalQuestions = answers.length
    const score = answers.filter(a => a.isCorrect).length
    const percentage = Math.round((score / totalQuestions) * 1000) / 10
    const passed = percentage >= 70.0
    const examTitle = title || 'Ujian Bahasa Jepang'
    const duration = durationSeconds || 0

    // 1. Save ExamResult to database
    const examResult = await prisma.examResult.create({
      data: {
        userId,
        title: examTitle,
        score,
        totalQuestions,
        percentage,
        passed,
        durationSeconds: duration,
      },
    })

    // 2. Update Mastery for each question answered in the exam asynchronously/in parallel
    await Promise.all(
      answers.map(ans =>
        updateMastery(userId, ans.materialType, ans.materialId, ans.isCorrect).catch(err =>
          console.error(`Gagal update mastery untuk ${ans.materialId}:`, err)
        )
      )
    )

    return NextResponse.json(
      {
        message: 'Hasil ujian berhasil disimpan.',
        result: examResult,
        answers,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting exam:', error)
    return NextResponse.json({ message: 'Gagal menyimpan hasil ujian.' }, { status: 500 })
  }
}
