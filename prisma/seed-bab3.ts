import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Memulai seed Bab 3 Minna no Nihongo (Tempat, Arah, Fasilitas & Kanji)...')

  // 1. Dapatkan Course
  let course = await prisma.course.findFirst()
  if (!course) {
    course = await prisma.course.create({
      data: { title: 'Minna no Nihongo 1', description: 'Buku pelajaran bahasa Jepang dasar untuk pemula.' },
    })
  }

  // 2. Buat Lesson Bab 3
  let lesson3 = await prisma.lesson.findFirst({ where: { title: 'Bab 3' } })
  if (!lesson3) {
    lesson3 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 3',
        description: 'Tempat, Arah, Lokasi (ここ・そこ・あそこ・どこ), Fasilitas Umum, dan Kanji Arah Mata Angin.',
        order: 3,
      },
    })
    console.log('✅ Lesson Bab 3 dibuat:', lesson3.id)
  }

  // 3. Vocabulary Bab 3 (15 Kosakata Lokasi & Fasilitas)
  const vocab3 = [
    { word: 'ここ', kana: 'ここ', romaji: 'koko', meaning: 'Di sini (dekat pembicara)', wordType: 'Pronoun' },
    { word: 'そこ', kana: 'そこ', romaji: 'soko', meaning: 'Di situ (dekat lawan bicara)', wordType: 'Pronoun' },
    { word: 'あそこ', kana: 'あそこ', romaji: 'asoko', meaning: 'Di sana (jauh dari keduanya)', wordType: 'Pronoun' },
    { word: 'どこ', kana: 'どこ', romaji: 'doko', meaning: 'Di mana (tanya tempat)', wordType: 'Pronoun' },
    { word: 'こちら', kana: 'こちら', romaji: 'kochira', meaning: 'Sebelah sini (arah / sopan)', wordType: 'Pronoun' },
    { word: 'そちら', kana: 'そちら', romaji: 'sochira', meaning: 'Sebelah situ (arah / sopan)', wordType: 'Pronoun' },
    { word: 'あちら', kana: 'あちら', romaji: 'achira', meaning: 'Sebelah sana (arah / sopan)', wordType: 'Pronoun' },
    { word: 'どちら', kana: 'どちら', romaji: 'dochira', meaning: 'Sebelah mana (arah / sopan)', wordType: 'Pronoun' },
    { word: 'きょうしつ', kanji: '教室', kana: 'きょうしつ', romaji: 'kyoushitsu', meaning: 'Ruang kelas', wordType: 'Noun' },
    { word: 'しょくどう', kanji: '食堂', kana: 'しょくどう', romaji: 'shokudou', meaning: 'Kantin / Ruang makan', wordType: 'Noun' },
    { word: 'じむしょ', kanji: '事務所', kana: 'じむしょ', romaji: 'jimusho', meaning: 'Kantor', wordType: 'Noun' },
    { word: 'かいぎしつ', kanji: '会議室', kana: 'かいぎしつ', romaji: 'kaigishitsu', meaning: 'Ruang rapat', wordType: 'Noun' },
    { word: 'うけつけ', kanji: '受付', kana: 'うけつけ', romaji: 'uketsuke', meaning: 'Resepsionis / Bagian penerima tamu', wordType: 'Noun' },
    { word: 'へや', kanji: '部屋', kana: 'へや', romaji: 'heya', meaning: 'Kamar / Ruangan', wordType: 'Noun' },
    { word: 'かいだん', kanji: '階段', kana: 'かいだん', romaji: 'kaidan', meaning: 'Tangga', wordType: 'Noun' },
  ]

  const existV3 = await prisma.vocabulary.findMany({ select: { word: true } })
  const existV3Set = new Set(existV3.map(v => v.word))
  const newV3 = vocab3.filter(v => !existV3Set.has(v.word))
  if (newV3.length > 0) {
    await prisma.vocabulary.createMany({ data: newV3.map(v => ({ ...v, lessonId: lesson3.id })) })
    console.log(`✅ Vocab Bab 3 ditambahkan: ${newV3.length} kata`)
  }

  // 4. Grammar Bab 3 (4 Pola Kalimat Lokasi & Arah)
  const grammar3 = [
    {
      pattern: 'ここ/そこ/あそこ は [Tempat] です',
      meaning: 'Di sini/situ/sana adalah [Tempat]',
      usage: 'Menjelaskan lokasi atau keberadaan suatu fasilitas atau ruangan.',
      example: 'ここは きょうしつです。',
      translation: 'Di sini adalah ruang kelas.',
      note: 'ここ (dekat saya), そこ (dekat kamu), あそこ (jauh dari kita berdua).',
    },
    {
      pattern: '[Benda/Orang] は [Tempat] です',
      meaning: '[Benda/Orang] ada di [Tempat]',
      usage: 'Menyatakan letak atau keberadaan subjek tertentu.',
      example: 'たなかさんは じむしょです。',
      translation: 'Sdr. Tanaka ada di kantor.',
      note: 'Bisa juga disingkat untuk menjawab pertanyaan lokasi: じむしょです。',
    },
    {
      pattern: '[Tempat] は どこ/どちら ですか',
      meaning: 'Di mana [Tempat]?',
      usage: 'Menanyakan keberadaan suatu ruangan atau fasilitas. Gunakan どちら untuk nuansa lebih sopan.',
      example: 'おてあらいは どこですか。',
      translation: 'Toilet ada di mana?',
      note: 'どちら adalah bentuk halus dari どこ dan juga bisa menanyakan arah/asal negara.',
    },
    {
      pattern: '[Negara] の [Benda] です',
      meaning: '[Benda] buatan [Negara]',
      usage: 'Menyatakan negara asal produksi atau merek dari suatu produk.',
      example: 'これは にほんの くるまです。',
      translation: 'Ini adalah mobil buatan Jepang.',
      note: 'Partikel の di sini berfungsi menerangkan asal pembuatan / negara produsen.',
    },
  ]

  const existG3 = await prisma.grammar.findMany({ select: { pattern: true } })
  const existG3Set = new Set(existG3.map(g => g.pattern))
  const newG3 = grammar3.filter(g => !existG3Set.has(g.pattern))
  if (newG3.length > 0) {
    await prisma.grammar.createMany({ data: newG3.map(g => ({ ...g, lessonId: lesson3.id })) })
    console.log(`✅ Grammar Bab 3 ditambahkan: ${newG3.length} pola`)
  }

  // 5. Kanji Bab 3 (8 Kanji Mata Angin & Bagian Tubuh JLPT N5)
  const kanji3 = [
    { character: '東', hiragana: 'ひがし', romaji: 'higashi', meaning: 'Timur', onyomi: 'トウ (tou)', kunyomi: 'ひがし (higashi)', jlptLevel: 'N5' },
    { character: '西', hiragana: 'にし', romaji: 'nishi', meaning: 'Barat', onyomi: 'セイ, サイ (sei, sai)', kunyomi: 'にし (nishi)', jlptLevel: 'N5' },
    { character: '南', hiragana: 'みなみ', romaji: 'minami', meaning: 'Selatan', onyomi: 'ナン (nan)', kunyomi: 'みなみ (minami)', jlptLevel: 'N5' },
    { character: '北', hiragana: 'きた', romaji: 'kita', meaning: 'Utara', onyomi: 'ホク (hoku)', kunyomi: 'きた (kita)', jlptLevel: 'N5' },
    { character: '口', hiragana: 'くち', romaji: 'kuchi', meaning: 'Mulut, Pintu keluar/masuk', onyomi: 'コウ, ク (kou, ku)', kunyomi: 'くち (kuchi)', jlptLevel: 'N5' },
    { character: '目', hiragana: 'め', romaji: 'me', meaning: 'Mata', onyomi: 'モク, ボク (moku, boku)', kunyomi: 'め (me)', jlptLevel: 'N5' },
    { character: '手', hiragana: 'て', romaji: 'te', meaning: 'Tangan', onyomi: 'シュ (shu)', kunyomi: 'て (te)', jlptLevel: 'N5' },
    { character: '足', hiragana: 'あし', romaji: 'ashi', meaning: 'Kaki, Cukup', onyomi: 'ソク (soku)', kunyomi: 'あし, た・りる (ashi, ta-riru)', jlptLevel: 'N5' },
  ]

  const existK3 = await prisma.kanji.findMany({ select: { character: true } })
  const existK3Set = new Set(existK3.map(k => k.character))
  const newK3 = kanji3.filter(k => !existK3Set.has(k.character))
  if (newK3.length > 0) {
    await prisma.kanji.createMany({ data: newK3.map(k => ({ ...k, lessonId: lesson3.id })) })
    console.log(`✅ Kanji Bab 3 ditambahkan: ${newK3.length} karakter`)
  }

  console.log('\n🎉 Seed Bab 3 selesai dengan sukses!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding Bab 3:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
