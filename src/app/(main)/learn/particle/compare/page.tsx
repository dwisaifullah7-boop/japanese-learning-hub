import { PageHeader } from '@/components/shared/PageHeader'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { AudioButton } from '@/components/shared/AudioButton'
import { Sparkles, HelpCircle, ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

interface ComparisonPair {
  id: string
  title: string
  particleA: string
  particleB: string
  summary: string
  diffA: string
  diffB: string
  examples: {
    sentenceA: string
    transA: string
    audioA: string
    sentenceB: string
    transB: string
    audioB: string
    explanation: string
  }[]
}

const COMPARISON_PAIRS: ComparisonPair[] = [
  {
    id: 'wa-vs-ga',
    title: 'は (wa) vs が (ga)',
    particleA: 'は (wa)',
    particleB: 'が (ga)',
    summary: 'は menekankan apa yang terjadi pada topik (informasi setelah は), sedangkan が menekankan subjek itu sendiri (siapa/apa yang melakukan).',
    diffA: 'Menandai topik utama kalimat. Penekanan ada pada predikat/penjelasan di belakangnya.',
    diffB: 'Menandai subjek spesifik atau informasi baru. Penekanan ada pada kata sebelum が.',
    examples: [
      {
        sentenceA: 'わたしは がくせいです。',
        transA: 'Saya adalah seorang siswa.',
        audioA: 'わたしは がくせいです。',
        sentenceB: 'だれが がくせいですか。わたしが がくせいです。',
        transB: 'Siapa yang siswa? Sayalah siswanya.',
        audioB: 'わたしが がくせいです。',
        explanation: 'Gunakan は untuk mengenalkan diri, gunakan が ketika menjawab pertanyaan "siapa/mana".',
      },
    ],
  },
  {
    id: 'ni-vs-de',
    title: 'に (ni) vs で (de)',
    particleA: 'に (ni)',
    particleB: 'で (de)',
    summary: 'に menandai keberadaan diam atau titik tujuan, sedangkan で menandai lokasi tempat aksi/kegiatan dilakukan.',
    diffA: 'Menunjukkan keberadaan (います/あります) atau titik akhir tujuan (行きます/入ります).',
    diffB: 'Menunjukkan tempat terjadinya suatu aktivitas (勉強します/食べます/働きます).',
    examples: [
      {
        sentenceA: '学校に行きます。',
        transA: 'Pergi ke sekolah. (Tujuan pergerakan)',
        audioA: 'がっこうに いきます。',
        sentenceB: '学校で 勉強します。',
        transB: 'Belajar di sekolah. (Lokasi aktivitas)',
        audioB: 'がっこうで べんきょうします。',
        explanation: 'に mengarahkan ke sekolah, sedangkan で menjelaskan aktivitas belajar di sekolah.',
      },
    ],
  },
  {
    id: 'ni-vs-e',
    title: 'に (ni) vs へ (e)',
    particleA: 'に (ni)',
    particleB: 'へ (e)',
    summary: 'に menekankan destinasi/titik tujuan akhir, sedangkan へ menekankan arah pergerakan (menuju ke arah...).',
    diffA: 'Fokus pada target/titik persinggahan akhir.',
    diffB: 'Fokus pada proses/arah perjalanan.',
    examples: [
      {
        sentenceA: '東京に行きます。',
        transA: 'Pergi (sampai) ke Tokyo.',
        audioA: 'とうきょうに いきます。',
        sentenceB: '日本へ 行きます。',
        transB: 'Pergi (menuju arah) Jepang.',
        audioB: 'にほんへ いきます。',
        explanation: 'Keduanya sering bisa saling menggantikan untuk kata kerja berpindah (行きます/来ます/帰ります).',
      },
    ],
  },
  {
    id: 'wa-vs-mo',
    title: 'は (wa) vs も (mo)',
    particleA: 'は (wa)',
    particleB: 'も (mo)',
    summary: 'は berarti "adapun/mengenai", sedangkan も berarti "juga/pun".',
    diffA: 'Menandai topik kalimat.',
    diffB: 'Menggantikan は/が untuk menyatakan kesamaan ("juga").',
    examples: [
      {
        sentenceA: '田中さんは 日本人です。',
        transA: 'Sdr. Tanaka adalah orang Jepang.',
        audioA: 'たなかさんは にほんじんです。',
        sentenceB: '山田さんも 日本人です。',
        transB: 'Sdr. Yamada JUGA orang Jepang.',
        audioB: 'やまださんも にほんじんです。',
        explanation: 'Gunakan も untuk menggantikan は ketika predikatnya sama.',
      },
    ],
  },
]

export default function ParticleComparisonPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Learn', href: '/learn' },
          { label: 'Particle', href: '/learn/particle' },
          { label: 'Perbandingan Partikel' },
        ]}
      />

      <PageHeader
        title="Perbandingan Partikel (助詞の比較)"
        description="Panduan lengkap memahami perbedaan partikel bahasa Jepang yang sering membingungkan."
        icon={<Sparkles className="w-8 h-8 text-amber-500" />}
      />

      {/* Intro Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-amber-950 space-y-2">
        <h3 className="font-bold text-base flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          Mengapa Partikel Sering Membingungkan?
        </h3>
        <p className="text-amber-900/90 text-xs sm:text-sm">
          Satu kata kerja bisa menggunakan partikel berbeda tergantung nuansa yang ingin disampaikan.
          Pahami perbedaan pasangan partikel di bawah ini agar tidak keliru saat ujian & berbicara!
        </p>
      </div>

      {/* Comparison Cards Grid */}
      <div className="space-y-6">
        {COMPARISON_PAIRS.map(pair => (
          <div key={pair.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-indigo-900 p-5 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold font-japanese">{pair.title}</h3>
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-semibold">
                Perbandingan Partikel
              </span>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-sm text-gray-700 font-medium bg-gray-50 p-4 rounded-xl border border-gray-100">
                💡 <strong>Ringkasan:</strong> {pair.summary}
              </p>

              {/* Side-by-side Explanation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-xl space-y-1">
                  <h4 className="font-bold text-blue-900 text-lg font-japanese">{pair.particleA}</h4>
                  <p className="text-xs text-blue-800">{pair.diffA}</p>
                </div>

                <div className="bg-purple-50/70 border border-purple-200 p-4 rounded-xl space-y-1">
                  <h4 className="font-bold text-purple-900 text-lg font-japanese">{pair.particleB}</h4>
                  <p className="text-xs text-purple-800">{pair.diffB}</p>
                </div>
              </div>

              {/* Interactive Examples */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Contoh Perbandingan Kalimat:
                </h4>

                {pair.examples.map((ex, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Example A */}
                      <div className="bg-white p-3 rounded-lg border flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-900 font-japanese text-base">{ex.sentenceA}</p>
                          <p className="text-xs text-gray-500">{ex.transA}</p>
                        </div>
                        <AudioButton audioUrl={`comp-${pair.id}-a`} size="sm" />
                      </div>

                      {/* Example B */}
                      <div className="bg-white p-3 rounded-lg border flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-900 font-japanese text-base">{ex.sentenceB}</p>
                          <p className="text-xs text-gray-500">{ex.transB}</p>
                        </div>
                        <AudioButton audioUrl={`comp-${pair.id}-b`} size="sm" />
                      </div>
                    </div>

                    <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                      🎯 <strong>Catatan Penggunaan:</strong> {ex.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA to Practice */}
      <div className="text-center py-6 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <h4 className="text-lg font-bold text-gray-900">Uji Pemahaman Partikelmu!</h4>
        <p className="text-xs text-gray-500">
          Latih penggunaan partikel dalam soal pilihan ganda interaktif.
        </p>
        <Link
          href="/practice/multiple-choice?type=particle"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm transition-colors"
        >
          Mulai Kuis Partikel <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
