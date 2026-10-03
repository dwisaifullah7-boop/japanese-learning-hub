import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Memulai seeding database...')

  // 1. Buat Course
  const course = await prisma.course.create({
    data: {
      title: 'Minna no Nihongo 1',
      description: 'Buku pelajaran bahasa Jepang dasar untuk pemula.',
    },
  })
  console.log('✅ Course created:', course.title)

  // 2. Buat Lesson Bab 1
  const lesson = await prisma.lesson.create({
    data: {
      courseId: course.id,
      title: 'Bab 1',
      description: 'Perkenalan dasar, Hiragana dasar (A-I-U-E-O), dan kosakata sederhana.',
      order: 1,
    },
  })
  console.log('✅ Lesson created:', lesson.title)

  // 3. Seeding Hiragana (Tambahkan beberapa lagi)
  const hiraganaData = [
    { character: 'あ', romaji: 'a', example: 'あさ (asa) - Pagi' },
    { character: 'い', romaji: 'i', example: 'いぬ (inu) - Anjing' },
    { character: 'う', romaji: 'u', example: 'うみ (umi) - Laut' },
    { character: 'え', romaji: 'e', example: 'えき (eki) - Stasiun' },
    { character: 'お', romaji: 'o', example: 'おかあさん (okaasan) - Ibu' },
    { character: 'か', romaji: 'ka', example: 'かさ (kasa) - Payung' },
    { character: 'き', romaji: 'ki', example: 'き (ki) - Pohon' },
    { character: 'く', romaji: 'ku', example: 'くち (kuchi) - Mulut' },
  ]

  await prisma.hiragana.createMany({
    data: hiraganaData.map(h => ({ ...h, lessonId: lesson.id })),
  })
  console.log('✅ Hiragana seeded:', hiraganaData.length, 'characters')

  // 4. Seeding Vocabulary (Tambahkan beberapa lagi)
  const vocabData = [
    { word: 'わたし', kanji: '私', kana: 'わたし', romaji: 'watashi', meaning: 'Saya', wordType: 'Pronoun' },
    { word: 'がくせい', kanji: '学生', kana: 'がくせい', romaji: 'gakusei', meaning: 'Pelajar', wordType: 'Noun' },
    { word: 'せんせい', kanji: '先生', kana: 'せんせい', romaji: 'sensei', meaning: 'Guru', wordType: 'Noun' },
    { word: 'ほん', kanji: '本', kana: 'ほん', romaji: 'hon', meaning: 'Buku', wordType: 'Noun' },
    { word: 'くるま', kanji: '車', kana: 'くるま', romaji: 'kuruma', meaning: 'Mobil', wordType: 'Noun' },
  ]

  await prisma.vocabulary.createMany({
    data: vocabData.map(v => ({ ...v, lessonId: lesson.id })),
  })
  console.log('✅ Vocabulary seeded:', vocabData.length, 'words')

  // 5. Seeding Particle (Contoh untuk Bab 1)
  const particleData = [
    { 
      particle: 'は', 
      reading: 'wa',
      meaning: 'Penanda topik', 
      function: 'Menandai topik dalam kalimat.', 
      pattern: '[Topik] は [Keterangan] です。', 
      example: 'わたしは がくせいです。', 
      translation: 'Saya adalah pelajar.',
      commonMistake: 'Sering dibaca "ha" padahal sebagai partikel dibaca "wa".'
    },
    {
      particle: 'を',
      reading: 'o',
      meaning: 'Penanda objek',
      function: 'Menandai objek langsung dari kata kerja.',
      pattern: '[Objek] を [Kata Kerja]',
      example: 'みず を のみます。',
      translation: 'Minum air.',
      commonMistake: 'Sering dibaca "wo" padahal dalam pengucapan modern dibaca "o".'
    },
    {
      particle: 'へ',
      reading: 'e',
      meaning: 'Penanda arah/tujuan',
      function: 'Menandai tujuan atau arah pergerakan.',
      pattern: '[Tempat] へ [Kata Kerja Pergerakan]',
      example: 'にほん へ いきます。',
      translation: 'Pergi ke Jepang.',
      commonMistake: 'Sering dibaca "he" padahal sebagai partikel dibaca "e".'
    },
  ]

  await prisma.particle.createMany({
    data: particleData.map(p => ({ ...p, lessonId: lesson.id })),
  })
  console.log('✅ Particle seeded:', particleData.length, 'particles')

  console.log('🎉 Seeding selesai!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
