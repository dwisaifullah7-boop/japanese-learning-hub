import { PageHeader } from '@/components/shared/PageHeader'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { VerbConjugatorClient, VerbItem } from './VerbConjugatorClient'
import { Sparkles, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const ESSENTIAL_VERBS: VerbItem[] = [
  {
    id: 'okimasu',
    kanji: '起きます',
    kana: 'おきます',
    romaji: 'okimasu',
    meaning: 'Bangun tidur',
    group: 'Group 2 (Ichidan)',
    masu: '起きます (おきます)',
    masen: '起きません (おきません)',
    mashita: '起きました (おきました)',
    masendeshita: '起きませんでした (おきませんでした)',
  },
  {
    id: 'nemasu',
    kanji: '寝ます',
    kana: 'ねます',
    romaji: 'nemasu',
    meaning: 'Tidur',
    group: 'Group 2 (Ichidan)',
    masu: '寝ます (ねます)',
    masen: '寝ません (ねません)',
    mashita: '寝ました (ねました)',
    masendeshita: '寝ませんでした (ねませんでした)',
  },
  {
    id: 'hatarakimasu',
    kanji: '働きます',
    kana: 'はたらきます',
    romaji: 'hatarakimasu',
    meaning: 'Bekerja',
    group: 'Group 1 (Godan)',
    masu: '働きます (はたらきます)',
    masen: '働きません (はたらきません)',
    mashita: '働きました (はたらきました)',
    masendeshita: '働きませんでした (はたらきませんでした)',
  },
  {
    id: 'yasumimasu',
    kanji: '休みます',
    kana: 'やすみます',
    romaji: 'yasumimasu',
    meaning: 'Beristirahat / Libur',
    group: 'Group 1 (Godan)',
    masu: '休みます (やすみます)',
    masen: '休みません (やすみません)',
    mashita: '休みました (やすみました)',
    masendeshita: '休みませんでした (やすみませんでした)',
  },
  {
    id: 'benkyoushimasu',
    kanji: '勉強します',
    kana: 'べんきょうします',
    romaji: 'benkyoushimasu',
    meaning: 'Belajar',
    group: 'Group 3 (Irregular)',
    masu: '勉強します (べんきょうします)',
    masen: '勉強しません (べんきょうしません)',
    mashita: '勉強しました (べんきょうしました)',
    masendeshita: '勉強しませんでした (べんきょうしませんでした)',
  },
  {
    id: 'owarimasu',
    kanji: '終わります',
    kana: 'おわります',
    romaji: 'owarimasu',
    meaning: 'Selesai / Berakhir',
    group: 'Group 1 (Godan)',
    masu: '終わります (おわります)',
    masen: '終わりません (おわりません)',
    mashita: '終わりました (おわりました)',
    masendeshita: '終わりませんでした (おわりませんでした)',
  },
  {
    id: 'ikimasu',
    kanji: '行きます',
    kana: 'いきます',
    romaji: 'ikimasu',
    meaning: 'Pergi',
    group: 'Group 1 (Godan)',
    masu: '行きます (いきます)',
    masen: '行きません (いきません)',
    mashita: '行きました (いきました)',
    masendeshita: '行きませんでした (いきませんでした)',
  },
  {
    id: 'kimasu',
    kanji: '来ます',
    kana: 'きます',
    romaji: 'kimasu',
    meaning: 'Datang',
    group: 'Group 3 (Irregular)',
    masu: '来ます (きます)',
    masen: '来ません (きません)',
    mashita: '来ました (きました)',
    masendeshita: '来ませんでした (きませんでした)',
  },
  {
    id: 'kaerimasu',
    kanji: '帰ります',
    kana: 'かえります',
    romaji: 'kaerimasu',
    meaning: 'Pulang',
    group: 'Group 1 (Godan)',
    masu: '帰ります (かえります)',
    masen: '帰りません (かえりません)',
    mashita: '帰りました (かえりました)',
    masendeshita: '帰りませんでした (かえりませんでした)',
  },
  {
    id: 'tabemasu',
    kanji: '食べます',
    kana: 'たべます',
    romaji: 'tabemasu',
    meaning: 'Makan',
    group: 'Group 2 (Ichidan)',
    masu: '食べます (たべます)',
    masen: '食べません (たべません)',
    mashita: '食べました (たべました)',
    masendeshita: '食べませんでした (たべませんでした)',
  },
  {
    id: 'nomimasu',
    kanji: '飲みます',
    kana: 'のみます',
    romaji: 'nomimasu',
    meaning: 'Minum',
    group: 'Group 1 (Godan)',
    masu: '飲みます (のみます)',
    masen: '飲みません (のみません)',
    mashita: '飲みました (のみました)',
    masendeshita: '飲みませんでした (のみませんでした)',
  },
  {
    id: 'mimasu',
    kanji: '見ます',
    kana: 'みます',
    romaji: 'mimasu',
    meaning: 'Melihat / Menonton',
    group: 'Group 2 (Ichidan)',
    masu: '見ます (みます)',
    masen: '見ません (みません)',
    mashita: '見ました (みました)',
    masendeshita: '見ませんでした (みませんでした)',
  },
]

export default function VerbsConjugationPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Learn', href: '/learn' },
          { label: 'Konjugasi Kata Kerja' },
        ]}
      />

      <PageHeader
        title="Tabel Konjugasi Kata Kerja (動詞の活用)"
        description="Panduan interaktif konjugasi 4 bentuk Masu formal (Kini Positif, Negatif, Lampau, & Lampau Negatif) dengan audio pelafalan."
        icon={<Sparkles className="w-8 h-8 text-blue-600" />}
      />

      {/* Intro Guide Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 text-sm text-blue-950 space-y-4">
        <h3 className="font-bold text-base flex items-center gap-2 text-blue-900">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Memahami Pola Konjugasi Masu (Bentuk Formal Sopan)
        </h3>
        <p className="text-blue-900/90 text-xs sm:text-sm leading-relaxed">
          Dalam bahasa Jepang sopan (Polite Style / 丁寧語), setiap kata kerja memiliki 4 variasi bentuk dasar tergantung waktu dan apakah kalimat tersebut positif atau negatif.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <div className="bg-white/80 p-3 rounded-xl border border-blue-100 text-center">
            <span className="text-[10px] font-bold text-emerald-700 uppercase">Positif</span>
            <p className="text-base font-bold font-japanese text-gray-900">〜ます</p>
            <span className="text-[10px] text-gray-500">Masa kini / Akan</span>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-blue-100 text-center">
            <span className="text-[10px] font-bold text-rose-700 uppercase">Negatif</span>
            <p className="text-base font-bold font-japanese text-gray-900">〜ません</p>
            <span className="text-[10px] text-gray-500">Tidak melakukan</span>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-blue-100 text-center">
            <span className="text-[10px] font-bold text-blue-700 uppercase">Lampau</span>
            <p className="text-base font-bold font-japanese text-gray-900">〜ました</p>
            <span className="text-[10px] text-gray-500">Telah melakukan</span>
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-blue-100 text-center">
            <span className="text-[10px] font-bold text-purple-700 uppercase">Lampau Negatif</span>
            <p className="text-base font-bold font-japanese text-gray-900">〜ませんでした</p>
            <span className="text-[10px] text-gray-500">Tidak (waktu lalu)</span>
          </div>
        </div>
      </div>

      {/* Interactive Verb Conjugation Client */}
      <VerbConjugatorClient verbs={ESSENTIAL_VERBS} />

      {/* CTA to Practice */}
      <div className="text-center py-6 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <h4 className="text-lg font-bold text-gray-900">Uji Penguasaan Kata Kerjamu!</h4>
        <p className="text-xs text-gray-500">Latih kosakata kata kerja dan polanya dalam latihan pilihan ganda atau flashcard.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/practice/flashcard?type=vocabulary"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm transition-colors"
          >
            Latihan Flashcard Kata Kerja <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/exam/session?preset=bab4"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 border border-blue-300 rounded-xl hover:bg-blue-50 font-medium text-sm transition-colors"
          >
            Ujian Bab 4 (Waktu & Kata Kerja) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
