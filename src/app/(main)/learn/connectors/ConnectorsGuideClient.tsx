'use client'

import { useState } from 'react'
import { AudioButton } from '@/components/shared/AudioButton'
import { Link2, Sparkles, CheckCircle2, ShieldAlert, User, ArrowRight, BookOpen } from 'lucide-react'

interface ConnectorTopic {
  id: string
  title: string
  formula: string
  description: string
  badge: string
  badgeColor: string
  examples: {
    japanese: string
    kana: string
    romaji: string
    translation: string
    breakdown: string
  }[]
  ruleNote: string
}

const CONNECTOR_TOPICS: ConnectorTopic[] = [
  {
    id: 'verb-chains',
    title: 'Rangkaian Aksi Berurutan (Chronological Order)',
    formula: 'KK1 て、KK2 て、... KK (Akhir)',
    description: 'Menyambungkan 2 atau lebih aksi secara kronologis waktu. Tenses waktu (lampau atau masa depan) sepenuhnya ditentukan oleh kata kerja paling terakhir.',
    badge: 'Urutan Aksi',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    examples: [
      {
        japanese: '朝 ６時に 起きて、ジョギングを して、シャワーを 浴びます。',
        kana: 'あさ ろくじに おきて、ジョギングを して、シャワーを あびます。',
        romaji: 'Asa rokuji ni okite, jogingu o shite, shawaa o abimasu.',
        translation: 'Pagi hari bangun jam 6, jogging, lalu mandi shower.',
        breakdown: 'おきて (Grup 2) + して (Grup 3) + あびます (Grup 2)',
      },
      {
        japanese: '昨日は 銀座へ 行って、映画を 見て、友達と ご飯を 食べました。',
        kana: 'きのうは ぎんざへ いって、えいがを みて、ともだちと ごはんを たべました。',
        romaji: 'Kinou wa Ginza e itte, eiga o mite, tomodachi to gohan o tabemashita.',
        translation: 'Kemarin pergi ke Ginza, nonton film, lalu makan bersama teman.',
        breakdown: 'Bentuk lampau (-mashita) hanya ditaruh di kata kerja paling ujung.',
      },
    ],
    ruleNote: '⚠️ Urutan kalimat wajib sesuai dengan urutan waktu kejadian yang sesungguhnya terjadi di dunia nyata.',
  },
  {
    id: 'te-kara',
    title: 'Setelah Aksi Selesai (After Doing X)',
    formula: 'KK1 て + から、KK2',
    description: 'Menegaskan bahwa Aksi 2 baru bisa dimulai atau dilakukan hanya setelah Aksi 1 benar-benar rampung selesai.',
    badge: 'Syarat Waktu',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
    examples: [
      {
        japanese: '国へ 帰ってから、父の 会社で 働きます。',
        kana: 'くにへ かえってから、ちちの かいしゃで はたらきます。',
        romaji: 'Kuni e kaette kara, chichi no kaisha de hatarakimasu.',
        translation: 'Setelah pulang ke tanah air, saya akan bekerja di perusahaan ayah saya.',
        breakdown: 'かえって (Bentuk-Te) + から (setelah tuntas)',
      },
      {
        japanese: 'お金を 入れてから、ボタンを 押して ください。',
        kana: 'おかねを いれてから、ボタンを おして ください。',
        romaji: 'Okane o irete kara, botan o oshite kudasai.',
        translation: 'Setelah memasukkan uang, silakan tekan tombolnya.',
        breakdown: 'いれて (masukkan) + から (baru tekan tombol)',
      },
    ],
    ruleNote: '💡 Jangan ubah KK1 menjadi bentuk lampau (tidak boleh: *かえったから). KK1 selalu bentuk-Te.',
  },
  {
    id: 'adjective-connectors',
    title: 'Menggabungkan Dua Kata Sifat (And / Serta)',
    formula: 'I-Adj (～くて) / Na-Adj & KB (～で)',
    description: 'Menghubungkan dua sifat atau predikat yang searah (positif + positif, atau negatif + negatif). Untuk sifat berlawanan, gunakan partikel が (tetapi).',
    badge: 'Sifat Setara',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
    examples: [
      {
        japanese: 'ミラーさんは 若くて、とても 親切です。',
        kana: 'ミラーさんは わかくて、とても しんせつです。',
        romaji: 'Miraa-san wa wakakute, totemo shinsetsu desu.',
        translation: 'Sdr. Miller masih muda dan sangat ramah.',
        breakdown: 'わかい (i-adj) -> buang い ganti くて',
      },
      {
        japanese: 'この部屋は 広くて、明るいです。',
        kana: 'この へやは ひろくて、あかるいです。',
        romaji: 'Kono heya wa hirokute, akarui desu.',
        translation: 'Kamar ini luas dan terang.',
        breakdown: 'ひろい (i-adj) -> ひろくて',
      },
      {
        japanese: '奈良は 静かで、きれいな 町です。',
        kana: 'ならは しずかで、きれいな まちです。',
        romaji: 'Nara wa shizuka de, kirei na machi desu.',
        translation: 'Nara adalah kota yang tenang dan indah.',
        breakdown: 'しずか (na-adj) -> tambah で',
      },
    ],
    ruleNote: '⭐ Pengecualian penting: Kata sifat いい (bagus) jika digabung menjadi よくて (bukan iikute).',
  },
  {
    id: 'body-attribute',
    title: 'Deskripsi Fisik & Karakteristik (Topic & Attribute)',
    formula: 'KB1 は KB2 が [Kata Sifat] です',
    description: 'KB1 bertindak sebagai subjek/topik utama (orang atau wilayah), sedangkan KB2 adalah bagian anggota tubuh atau bagian spesifik yang dinilai kualitasnya.',
    badge: 'Deskripsi Fisik',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    examples: [
      {
        japanese: 'マリアさんは 目が 大きいです。',
        kana: 'マリアさんは めが おおきいです。',
        romaji: 'Maria-san wa me ga ookii desu.',
        translation: 'Maria matanya besar.',
        breakdown: 'マリアさん (Topik は) + 目 (Bagian tubuh が) + 大きい (Sifat)',
      },
      {
        japanese: 'サントスさんは 背が 高くて、髪が 黒いです。',
        kana: 'サントスさんは せが たかくて、かみが くろいです。',
        romaji: 'Santosu-san wa se ga takakute, kami ga kuroi desu.',
        translation: 'Santos badannya tinggi dan rambutnya hitam.',
        breakdown: 'Menggabungkan deskripsi fisik dengan rumus くて!',
      },
      {
        japanese: '日本は 食べ物が 美味しいですが、高いです。',
        kana: 'にほんは たべものが おいしいですが、たかいです。',
        romaji: 'Nihon wa tabemono ga oishii desu ga, takai desu.',
        translation: 'Jepang makanannya enak, tetapi mahal.',
        breakdown: 'Negara (は) + Aspek (が)',
      },
    ],
    ruleNote: '🎯 Gunakan rumus ini daripada menerjemahkan kata demi kata (*マリアさんのめはおおきいです kurang alami).',
  },
  {
    id: 'permissions-rules',
    title: 'Izin (May I?) vs Larangan Keras (Must Not)',
    formula: '～てもいいですか (Izin) vs ～てはいけません (Larangan)',
    description: 'Meminta izin secara santun kepada orang lain, atau menyampaikan larangan tegas berdasarkan norma hukum dan tata tertib.',
    badge: 'Izin & Larangan',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300',
    examples: [
      {
        japanese: 'ここで 写真を 撮っても いいですか。…ええ、いいですよ。',
        kana: 'ここで しゃしんを とっても いいですか。…ええ、いいですよ。',
        romaji: 'Koko de shashin o totte mo ii desu ka. ...Ee, ii desu yo.',
        translation: 'Bolehkah saya mengambil foto di sini? ...Ya, silakan boleh.',
        breakdown: 'とって (Te-form) + もいいですか',
      },
      {
        japanese: 'ここで タバコを 吸っては いけません。',
        kana: 'ここで タバコを すっては いけません。',
        romaji: 'Koko de tabako o sutte wa ikemasen.',
        translation: 'Dilarang merokok di sini.',
        breakdown: 'すって (Te-form) + はいけません (Larangan mutlak)',
      },
    ],
    ruleNote: '🚫 Untuk menolak izin secara halus dalam situasi sosial, orang Jepang lebih sering mengatakan "すみません、ちょっと..." daripada "～てはいけません".',
  },
]

export function ConnectorsGuideClient() {
  const [activeTab, setActiveTab] = useState<string>('verb-chains')

  const activeTopic = CONNECTOR_TOPICS.find((t) => t.id === activeTab) || CONNECTOR_TOPICS[0]

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-900 via-slate-900 to-indigo-950 p-6 md:p-8 text-white shadow-xl border border-teal-500/20">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-3 py-1 text-xs font-semibold text-teal-300 border border-teal-400/30">
            <Link2 className="h-3.5 w-3.5" />
            Minna no Nihongo Bab 15 & 16 Guide
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Panduan Penyambung Kalimat, Izin & Deskripsi Fisik
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Tingkatkan kemampuan menyusun kalimat kompleks! Kuasai cara menyambung aksi berturutan{' '}
            <span className="text-sky-400 font-bold">～て、～て</span>, kepastian urutan waktu{' '}
            <span className="text-emerald-400 font-bold">～てから</span>, penggabungan kata sifat{' '}
            <span className="text-purple-400 font-bold">～くて / ～で</span>, izin & larangan, serta deskripsi fisik.
          </p>
        </div>
      </div>

      {/* Topic Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {CONNECTOR_TOPICS.map((topic) => {
          const isActive = topic.id === activeTab
          return (
            <button
              key={topic.id}
              onClick={() => setActiveTab(topic.id)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-500/25'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>{topic.title.split('(')[0]}</span>
            </button>
          )
        })}
      </div>

      {/* Active Topic Main Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${activeTopic.badgeColor}`}>
                {activeTopic.badge}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                {activeTopic.title}
              </h2>
            </div>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
              {activeTopic.description}
            </p>
          </div>

          <div className="bg-teal-50/60 dark:bg-teal-950/40 p-3 rounded-xl border border-teal-200/60 dark:border-teal-800/60">
            <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider block">
              Rumus Pola:
            </span>
            <span className="font-japanese text-sm md:text-base font-bold text-teal-900 dark:text-teal-200">
              {activeTopic.formula}
            </span>
          </div>
        </div>

        {/* Examples Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Contoh Kalimat & Pembongkaran Struktur:
          </h3>
          <div className="space-y-3">
            {activeTopic.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-japanese text-base md:text-lg font-bold text-slate-900 dark:text-white">
                      {ex.japanese}
                    </span>
                    <AudioButton audioUrl={ex.japanese} size="sm" />
                  </div>
                  <div className="text-xs font-medium text-teal-600 dark:text-teal-400">
                    {ex.kana} ({ex.romaji})
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold">
                    {ex.translation}
                  </div>
                  <div className="text-[11px] text-slate-500 italic mt-1">
                    🔍 {ex.breakdown}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rule Alert Note */}
        <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
          <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            {activeTopic.ruleNote}
          </div>
        </div>
      </div>
    </div>
  )
}
