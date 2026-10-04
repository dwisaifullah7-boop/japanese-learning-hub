import Link from 'next/link'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { FileText, Award, Clock, Sparkles, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react'

export default async function ExamPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  // Fetch past exam history
  const history = await prisma.examResult.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 10,
  })

  const availableExams = [
    {
      id: 'comprehensive',
      title: 'Ujian Evaluasi Komprehensif (N5)',
      description: 'Campuran 15 soal dari kosakata, kanji, partikel, tata bahasa, hiragana, & katakana.',
      questionCount: 15,
      timeMinutes: 10,
      passingScore: '70%',
      color: 'border-blue-200 bg-blue-50/50 hover:border-blue-400',
      badge: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'grammar-particle',
      title: 'Ujian Partikel & Tata Bahasa',
      description: 'Fokus 10 soal khusus penggunaan partikel (は, に, で, を) dan pola kalimat dasar.',
      questionCount: 10,
      timeMinutes: 8,
      passingScore: '70%',
      color: 'border-purple-200 bg-purple-50/50 hover:border-purple-400',
      badge: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'kanji-vocab',
      title: 'Ujian Kanji & Kosakata',
      description: 'Fokus 10 soal pengenalan karakter Kanji dasar dan kosakata Minna no Nihongo.',
      questionCount: 10,
      timeMinutes: 8,
      passingScore: '70%',
      color: 'border-amber-200 bg-amber-50/50 hover:border-amber-400',
      badge: 'bg-amber-100 text-amber-700',
    },
  ]

  const formatDuration = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60)
    const secs = totalSec % 60
    return `${mins}m ${secs}s`
  }

  return (
    <div className="space-y-10">
      <PageHeader
        title="Exam Hub"
        description="Uji kemampuan dan ukur sejauh mana penguasaan bahasa Jepang Anda."
        icon={<Award className="w-8 h-8" />}
      />

      {/* Exam Categories */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          Pilih Ujian yang Tersedia
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availableExams.map(exam => (
            <div
              key={exam.id}
              className={`bg-white p-6 rounded-2xl border ${exam.color} shadow-sm transition-all flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase ${exam.badge}`}>
                  Standard Exam
                </span>
                <h3 className="text-xl font-bold text-gray-900 pt-1">{exam.title}</h3>
                <p className="text-sm text-gray-600">{exam.description}</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-3 gap-2 text-xs text-center border-t border-b border-gray-100 py-3">
                  <div>
                    <span className="text-gray-400 block">Jumlah Soal</span>
                    <span className="font-bold text-gray-800">{exam.questionCount} Soal</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Waktu</span>
                    <span className="font-bold text-gray-800">{exam.timeMinutes} Menit</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Kelulusan</span>
                    <span className="font-bold text-gray-800">{exam.passingScore}</span>
                  </div>
                </div>

                <Link href={`/exam/session?preset=${exam.id}`} className="block">
                  <Button className="w-full gap-2 font-semibold">
                    Mulai Ujian <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rules Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 text-sm text-blue-900 flex items-start gap-4">
        <ShieldCheck className="w-8 h-8 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-base text-blue-950">Petunjuk Pengerjaan Ujian:</h4>
          <ul className="list-disc list-inside space-y-1 text-blue-800/90 text-xs sm:text-sm">
            <li>Timer akan berjalan otomatis begitu ujian dimulai. Jawaban tersimpan di sistem.</li>
            <li>Nilai minimal kelulusan adalah <strong>70.0%</strong>.</li>
            <li>Hasil ujian akan otomatis memperbarui tingkat <strong>Mastery</strong> materi Anda.</li>
          </ul>
        </div>
      </div>

      {/* Past Exam History */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-600" />
          Riwayat Hasil Ujian
        </h2>

        {history.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center space-y-2">
            <Sparkles className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="font-semibold text-gray-700">Belum Ada Riwayat Ujian</p>
            <p className="text-xs text-gray-500">Pilih salah satu ujian di atas untuk mulai menguji kemampuanmu.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">Nama Ujian</th>
                    <th className="px-6 py-4">Skor</th>
                    <th className="px-6 py-4">Nilai (%)</th>
                    <th className="px-6 py-4">Durasi</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {history.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">{item.title}</td>
                      <td className="px-6 py-4 text-gray-700">
                        {item.score} / {item.totalQuestions}
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">{item.percentage}%</td>
                      <td className="px-6 py-4 text-gray-500">{formatDuration(item.durationSeconds)}</td>
                      <td className="px-6 py-4">
                        {item.passed ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" /> LULUS
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 px-2.5 py-1 rounded-full">
                            <XCircle className="w-3.5 h-3.5" /> GAGAL
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right text-xs text-gray-400">
                        {new Date(item.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
