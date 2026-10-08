import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Memulai seed Bab 5 Minna no Nihongo (Perpindahan, Transportasi & Penanggalan)...')

  // 1. Dapatkan Course
  let course = await prisma.course.findFirst()
  if (!course) {
    course = await prisma.course.create({
      data: { title: 'Minna no Nihongo 1', description: 'Buku pelajaran bahasa Jepang dasar untuk pemula.' },
    })
  }

  // 2. Buat Lesson Bab 5
  let lesson5 = await prisma.lesson.findFirst({ where: { title: 'Bab 5' } })
  if (!lesson5) {
    lesson5 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 5',
        description: 'Kata Kerja Perpindahan (行きます・来ます・帰ります), Partikel Arah (へ), Sarana Transportasi (で), dan Sistem Penanggalan Jepang.',
        order: 5,
      },
    })
    console.log('✅ Lesson Bab 5 dibuat:', lesson5.id)
  }

  // 3. Vocabulary Bab 5 (Kata Kerja Gerak, Kendaraan & Waktu Kalender)
  const vocab5 = [
    { word: 'いきます', kanji: '行きます', kana: 'いきます', romaji: 'ikimasu', meaning: 'Pergi', wordType: 'Verb' },
    { word: 'きます', kanji: '来ます', kana: 'きます', romaji: 'kimasu', meaning: 'Datang', wordType: 'Verb' },
    { word: 'かえります', kanji: '帰ります', kana: 'かえります', romaji: 'kaerimasu', meaning: 'Pulang / Kembali', wordType: 'Verb' },
    { word: 'こうこう', kanji: '高校', kana: 'こうこう', romaji: 'koukou', meaning: 'SMA (Sekolah Menengah Atas)', wordType: 'Noun' },
    { word: 'えき', kanji: '駅', kana: 'えき', romaji: 'eki', meaning: 'Stasiun kereta', wordType: 'Noun' },
    { word: 'ひこうき', kanji: '飛行機', kana: 'ひこうき', romaji: 'hikouki', meaning: 'Pesawat terbang', wordType: 'Noun' },
    { word: 'ふね', kanji: '船', kana: 'ふね', romaji: 'fune', meaning: 'Kapal laut', wordType: 'Noun' },
    { word: 'でんしゃ', kanji: '電車', kana: 'でんしゃ', romaji: 'densha', meaning: 'Kereta listrik', wordType: 'Noun' },
    { word: 'ちかてつ', kanji: '地下鉄', kana: 'ちかてつ', romaji: 'chikatetsu', meaning: 'Kereta bawah tanah / MRT', wordType: 'Noun' },
    { word: 'しんかんせん', kanji: '新幹線', kana: 'しんかんせん', romaji: 'shinkansen', meaning: 'Kereta cepat Shinkansen', wordType: 'Noun' },
    { word: 'バス', kana: 'バス', romaji: 'basu', meaning: 'Bus', wordType: 'Noun' },
    { word: 'タクシー', kana: 'タクシー', romaji: 'takushii', meaning: 'Taksi', wordType: 'Noun' },
    { word: 'じてんしゃ', kanji: '自転車', kana: 'じてんしゃ', romaji: 'jitensha', meaning: 'Sepeda', wordType: 'Noun' },
    { word: 'あるいて', kanji: '歩いて', kana: 'あるいて', romaji: 'aruite', meaning: 'Jalan kaki', wordType: 'Adverb' },
    { word: 'ともだち', kanji: '友達', kana: 'ともだち', romaji: 'tomodachi', meaning: 'Teman', wordType: 'Noun' },
    { word: 'たんじょうび', kanji: '誕生日', kana: 'たんじょうび', romaji: 'tanjoubi', meaning: 'Hari ulang tahun', wordType: 'Noun' },
  ]

  const existV5 = await prisma.vocabulary.findMany({ select: { word: true } })
  const existV5Set = new Set(existV5.map(v => v.word))
  const newV5 = vocab5.filter(v => !existV5Set.has(v.word))
  if (newV5.length > 0) {
    await prisma.vocabulary.createMany({ data: newV5.map(v => ({ ...v, lessonId: lesson5.id })) })
    console.log(`✅ Vocab Bab 5 ditambahkan: ${newV5.length} kata`)
  }

  // 4. Grammar Bab 5 (Pola Perpindahan, Transportasi, dan Rekan)
  const grammar5 = [
    {
      pattern: '[Tempat] へ 行きます / 来ます / 帰ります',
      meaning: 'Pergi / Datang / Pulang ke [Tempat]',
      usage: 'Partikel へ (dibaca "e") menandai arah atau tempat tujuan dari kata kerja perpindahan gerak.',
      example: 'きょうとへ いきます。',
      translation: 'Pergi ke Kyoto.',
      note: 'Partikel に juga dapat menggantikan へ untuk menunjukkan titik akhir kedatangan (misal: 日本に行きます).',
    },
    {
      pattern: 'どこ[へ]も 行きません / 行きませんでした',
      meaning: 'Tidak pergi ke mana pun',
      usage: 'Kata tanya tempat (どこ) digabung partikel も untuk menyatakan penyangkalan negatif total.',
      example: 'にちようびは どこも いきませんでした。',
      translation: 'Hari Minggu saya tidak pergi ke mana-mana.',
      note: 'Partikel へ boleh dihilangkan: どこも 行きません sama artinya dengan どこへも 行きません.',
    },
    {
      pattern: '[Kendaraan] で 行きます / 来ます / 帰ります',
      meaning: 'Pergi dengan / naik [Kendaraan]',
      usage: 'Partikel で menunjukkan sarana transportasi atau alat yang digunakan untuk bepergian.',
      example: 'ひこうきで にほんへ きました。',
      translation: 'Datang ke Jepang dengan pesawat terbang.',
      note: 'Khusus untuk jalan kaki, gunakan あるいて (aruite) TANPA partikel で (misal: えきから あるいて かえります).',
    },
    {
      pattern: '[Orang] と [Kata Kerja]',
      meaning: 'Melakukan tindakan bersama [Orang]',
      usage: 'Partikel と menandai rekan atau orang yang menyertai dalam melakukan kegiatan.',
      example: 'かぞくと にほんへ いきます。',
      translation: 'Pergi ke Jepang bersama keluarga.',
      note: 'Jika sendirian tanpa teman, gunakan ひとりで (hitoride) tanpa partikel と.',
    },
  ]

  const existG5 = await prisma.grammar.findMany({ select: { pattern: true } })
  const existG5Set = new Set(existG5.map(g => g.pattern))
  const newG5 = grammar5.filter(g => !existG5Set.has(g.pattern))
  if (newG5.length > 0) {
    await prisma.grammar.createMany({ data: newG5.map(g => ({ ...g, lessonId: lesson5.id })) })
    console.log(`✅ Grammar Bab 5 ditambahkan: ${newG5.length} pola`)
  }

  // 5. Kanji Bab 5 (8 Kanji Gerak, Tanggal & Lokasi JLPT N5)
  const kanji5 = [
    { character: '行', hiragana: 'いく / おこなう', romaji: 'iku / okonau', meaning: 'Pergi, Melakukan', onyomi: 'コウ, ギョウ (kou, gyou)', kunyomi: 'い・く, おこな・う (i-ku, okona-u)', jlptLevel: 'N5' },
    { character: '来', hiragana: 'くる / きたる', romaji: 'kuru / kitaru', meaning: 'Datang, Mendatang', onyomi: 'ライ (rai)', kunyomi: 'く・る, きた・る (ku-ru, kita-ru)', jlptLevel: 'N5' },
    { character: '帰', hiragana: 'かえる', romaji: 'kaeru', meaning: 'Pulang, Kembali', onyomi: 'キ (ki)', kunyomi: 'かえ・る (kae-ru)', jlptLevel: 'N5' },
    { character: '年', hiragana: 'とし / ねん', romaji: 'toshi / nen', meaning: 'Tahun, Usia', onyomi: 'ネン (nen)', kunyomi: 'とし (toshi)', jlptLevel: 'N5' },
    { character: '校', hiragana: 'こう', romaji: 'kou', meaning: 'Sekolah', onyomi: 'コウ (kou)', kunyomi: '-', jlptLevel: 'N5' },
    { character: '店', hiragana: 'みせ / てん', romaji: 'mise / ten', meaning: 'Toko, Kedai', onyomi: 'テン (ten)', kunyomi: 'みせ (mise)', jlptLevel: 'N5' },
    { character: '駅', hiragana: 'えき', romaji: 'eki', meaning: 'Stasiun', onyomi: 'エキ (eki)', kunyomi: '-', jlptLevel: 'N5' },
    { character: '車', hiragana: 'くるま / しゃ', romaji: 'kuruma / sha', meaning: 'Mobil, Kendaraan, Roda', onyomi: 'シャ (sha)', kunyomi: 'くるま (kuruma)', jlptLevel: 'N5' },
  ]

  const existK5 = await prisma.kanji.findMany({ select: { character: true } })
  const existK5Set = new Set(existK5.map(k => k.character))
  const newK5 = kanji5.filter(k => !existK5Set.has(k.character))
  if (newK5.length > 0) {
    await prisma.kanji.createMany({ data: newK5.map(k => ({ ...k, lessonId: lesson5.id })) })
    console.log(`✅ Kanji Bab 5 ditambahkan: ${newK5.length} karakter`)
  }

  console.log('\n🎉 Seed Bab 5 selesai dengan sukses!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding Bab 5:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
