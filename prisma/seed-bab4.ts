import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Memulai seed Bab 4 Minna no Nihongo (Waktu, Kata Kerja & Konjugasi Masu)...')

  // 1. Dapatkan Course
  let course = await prisma.course.findFirst()
  if (!course) {
    course = await prisma.course.create({
      data: { title: 'Minna no Nihongo 1', description: 'Buku pelajaran bahasa Jepang dasar untuk pemula.' },
    })
  }

  // 2. Buat Lesson Bab 4
  let lesson4 = await prisma.lesson.findFirst({ where: { title: 'Bab 4' } })
  if (!lesson4) {
    lesson4 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 4',
        description: 'Waktu (今 ～時 ～分), Hari (何曜日), Rentang Waktu (～から ～まで), dan Pengenalan Konjugasi Kata Kerja (～ます / ～ません / ～ました / ～ませんでした).',
        order: 4,
      },
    })
    console.log('✅ Lesson Bab 4 dibuat:', lesson4.id)
  }

  // 3. Vocabulary Bab 4 (Kata Kerja Dasar & Istilah Waktu)
  const vocab4 = [
    { word: 'おきます', kanji: '起きます', kana: 'おきます', romaji: 'okimasu', meaning: 'Bangun tidur', wordType: 'Verb' },
    { word: 'ねます', kanji: '寝ます', kana: 'ねます', romaji: 'nemasu', meaning: 'Tidur', wordType: 'Verb' },
    { word: 'はたらきます', kanji: '働きます', kana: 'はたらきます', romaji: 'hatarakimasu', meaning: 'Bekerja', wordType: 'Verb' },
    { word: 'やすみます', kanji: '休みます', kana: 'やすみます', romaji: 'yasumimasu', meaning: 'Beristirahat / Libur', wordType: 'Verb' },
    { word: 'べんきょうします', kanji: '勉強します', kana: 'べんきょうします', romaji: 'benkyoushimasu', meaning: 'Belajar', wordType: 'Verb' },
    { word: 'おわります', kanji: '終わります', kana: 'おわります', romaji: 'owarimasu', meaning: 'Selesai / Berakhir', wordType: 'Verb' },
    { word: 'いま', kanji: '今', kana: 'いま', romaji: 'ima', meaning: 'Sekarang', wordType: 'Noun' },
    { word: 'なんじ', kanji: '何時', kana: 'なんじ', romaji: 'nanji', meaning: 'Jam berapa', wordType: 'Noun' },
    { word: 'なんぷん', kanji: '何分', kana: 'なんぷん', romaji: 'nanpun', meaning: 'Menit berapa', wordType: 'Noun' },
    { word: 'はん', kanji: '半', kana: 'はん', romaji: 'han', meaning: 'Setengah (30 menit)', wordType: 'Noun' },
    { word: 'ごぜん', kanji: '午前', kana: 'ごぜん', romaji: 'gozen', meaning: 'Pagi hari / AM', wordType: 'Noun' },
    { word: 'ごご', kanji: '午後', kana: 'ごご', romaji: 'gogo', meaning: 'Siang-malam hari / PM', wordType: 'Noun' },
    { word: 'あさ', kanji: '朝', kana: 'あさ', romaji: 'asa', meaning: 'Pagi', wordType: 'Noun' },
    { word: 'ひる', kanji: '昼', kana: 'ひる', romaji: 'hiru', meaning: 'Siang', wordType: 'Noun' },
    { word: 'ばん', kanji: '晩', kana: 'ばん', romaji: 'ban', meaning: 'Malam', wordType: 'Noun' },
    { word: 'まいにち', kanji: '毎日', kana: 'まいにち', romaji: 'mainichi', meaning: 'Setiap hari', wordType: 'Adverb' },
  ]

  const existV4 = await prisma.vocabulary.findMany({ select: { word: true } })
  const existV4Set = new Set(existV4.map(v => v.word))
  const newV4 = vocab4.filter(v => !existV4Set.has(v.word))
  if (newV4.length > 0) {
    await prisma.vocabulary.createMany({ data: newV4.map(v => ({ ...v, lessonId: lesson4.id })) })
    console.log(`✅ Vocab Bab 4 ditambahkan: ${newV4.length} kata`)
  }

  // 4. Grammar Bab 4 (Konjugasi Masu, Waktu, dan Rentang)
  const grammar4 = [
    {
      pattern: 'いま [Waktu/Jam] です',
      meaning: 'Sekarang jam [Waktu]',
      usage: 'Menyatakan jam dan menit saat ini. Menit menggunakan hitungan 分 (fun/pun).',
      example: 'いま ７じ はんです。',
      translation: 'Sekarang jam 7 lewat 30 menit (setengah 8).',
      note: '4時 dibaca よじ (yoji), 7時 dibaca しちじ (shichiji), 9時 dibaca くじ (kuji).',
    },
    {
      pattern: '[Kata Kerja] ます / ません / ました / ませんでした',
      meaning: 'Bentuk sopan formal kata kerja (Kini, Negatif, Lampau, Lampau Negatif)',
      usage: 'Pondasi konjugasi kata kerja bahasa Jepang. Mengubah bentuk akhir kamus menjadi bentuk sopan.',
      example: 'きのう べんきょうしました。',
      translation: 'Kemarin saya sudah belajar.',
      note: 'ます (akan/biasa), ません (tidak), ました (sudah/lampau), ませんでした (tidak dilakukan di waktu lampau).',
    },
    {
      pattern: '[Waktu] に [Kata Kerja]',
      meaning: 'Melakukan tindakan pada [Waktu]',
      usage: 'Partikel に dipakai untuk menandai waktu yang memuat angka pasti (jam, tanggal, hari).',
      example: 'まいあさ ６じに おきます。',
      translation: 'Setiap pagi saya bangun pada jam 6.',
      note: 'Kata waktu relatif seperti きょう (hari ini), あした (besok), まいにち (setiap hari) TIDAK menggunakan partikel に.',
    },
    {
      pattern: '[Waktu 1] から [Waktu 2] まで',
      meaning: 'Dari [Waktu 1] sampai [Waktu 2]',
      usage: 'Menyatakan rentang waktu kerja, jam operasional toko, atau durasi kegiatan.',
      example: 'ぎんこうは ９じから ３じまでです。',
      translation: 'Bank buka dari jam 9 sampai jam 3.',
      note: 'から dan まで juga bisa digunakan terpisah, misalnya: ９じから はたらきます (bekerja mulai jam 9).',
    },
  ]

  const existG4 = await prisma.grammar.findMany({ select: { pattern: true } })
  const existG4Set = new Set(existG4.map(g => g.pattern))
  const newG4 = grammar4.filter(g => !existG4Set.has(g.pattern))
  if (newG4.length > 0) {
    await prisma.grammar.createMany({ data: newG4.map(g => ({ ...g, lessonId: lesson4.id })) })
    console.log(`✅ Grammar Bab 4 ditambahkan: ${newG4.length} pola`)
  }

  // 5. Kanji Bab 4 (8 Kanji Waktu & Dasar JLPT N5)
  const kanji4 = [
    { character: '時', hiragana: 'とき / じ', romaji: 'toki / ji', meaning: 'Waktu, Jam', onyomi: 'ジ (ji)', kunyomi: 'とき (toki)', jlptLevel: 'N5' },
    { character: '分', hiragana: 'わかる / ふん', romaji: 'wakaru / fun', meaning: 'Menit, Mengerti, Bagian', onyomi: 'フン, ブン (fun, bun)', kunyomi: 'わ・かる (wa-karu)', jlptLevel: 'N5' },
    { character: '半', hiragana: 'なかば / はん', romaji: 'nakaba / han', meaning: 'Setengah', onyomi: 'ハン (han)', kunyomi: 'なか・ば (naka-ba)', jlptLevel: 'N5' },
    { character: '今', hiragana: 'いま / こん', romaji: 'ima / kon', meaning: 'Sekarang', onyomi: 'コン, キン (kon, kin)', kunyomi: 'いま (ima)', jlptLevel: 'N5' },
    { character: '毎', hiragana: 'まい', romaji: 'mai', meaning: 'Setiap', onyomi: 'マイ (mai)', kunyomi: 'ごと (goto)', jlptLevel: 'N5' },
    { character: '何', hiragana: 'なに / なん', romaji: 'nani / nan', meaning: 'Apa, Berapa', onyomi: 'カ (ka)', kunyomi: 'なに, なん (nani, nan)', jlptLevel: 'N5' },
    { character: '午', hiragana: 'ご', romaji: 'go', meaning: 'Tengah hari / Siang', onyomi: 'ゴ (go)', kunyomi: 'うま (uma)', jlptLevel: 'N5' },
    { character: '前', hiragana: 'まえ / ぜん', romaji: 'mae / zen', meaning: 'Depan, Sebelum', onyomi: 'ゼン (zen)', kunyomi: 'まえ (mae)', jlptLevel: 'N5' },
  ]

  const existK4 = await prisma.kanji.findMany({ select: { character: true } })
  const existK4Set = new Set(existK4.map(k => k.character))
  const newK4 = kanji4.filter(k => !existK4Set.has(k.character))
  if (newK4.length > 0) {
    await prisma.kanji.createMany({ data: newK4.map(k => ({ ...k, lessonId: lesson4.id })) })
    console.log(`✅ Kanji Bab 4 ditambahkan: ${newK4.length} karakter`)
  }

  console.log('\n🎉 Seed Bab 4 selesai dengan sukses!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding Bab 4:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
