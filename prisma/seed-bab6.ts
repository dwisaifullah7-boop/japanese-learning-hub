import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Memulai seed Bab 6 Minna no Nihongo (Aksi Sehari-hari, Objek を, Tempat Aksi で, & Ajakan)...')

  // 1. Dapatkan Course
  let course = await prisma.course.findFirst()
  if (!course) {
    course = await prisma.course.create({
      data: { title: 'Minna no Nihongo 1', description: 'Buku pelajaran bahasa Jepang dasar untuk pemula.' },
    })
  }

  // 2. Buat Lesson Bab 6
  let lesson6 = await prisma.lesson.findFirst({ where: { title: 'Bab 6' } })
  if (!lesson6) {
    lesson6 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 6',
        description: 'Kata Kerja Transitive & Objek Langsung (を), Tempat Aksi (で), Sapaan Ajakan (～ませんか・～ましょう), dan Aktivitas Sehari-hari.',
        order: 6,
      },
    })
    console.log('✅ Lesson Bab 6 dibuat:', lesson6.id)
  }

  // 3. Vocabulary Bab 6 (16 Kata Kerja Aksi, Makanan, Minuman & Media)
  const vocab6 = [
    { word: 'たべます', kanji: '食べます', kana: 'たべます', romaji: 'tabemasu', meaning: 'Makan', wordType: 'Verb' },
    { word: 'のみます', kanji: '飲みます', kana: 'のみます', romaji: 'nomimasu', meaning: 'Minum', wordType: 'Verb' },
    { word: 'すいます', kanji: '吸います', kana: 'すいます', romaji: 'suimasu', meaning: 'Menghisap (rokok)', wordType: 'Verb' },
    { word: 'みます', kanji: '見ます', kana: 'みます', romaji: 'mimasu', meaning: 'Melihat / Menonton', wordType: 'Verb' },
    { word: 'ききます', kanji: '聞きます', kana: 'ききます', romaji: 'kikimasu', meaning: 'Mendengar', wordType: 'Verb' },
    { word: 'よみます', kanji: '読みます', kana: 'よみます', romaji: 'yomimasu', meaning: 'Membaca', wordType: 'Verb' },
    { word: 'かきます', kanji: '書きます', kana: 'かきます', romaji: 'kakimasu', meaning: 'Menulis / Menggambar', wordType: 'Verb' },
    { word: 'かいます', kanji: '買います', kana: 'かいます', romaji: 'kaimasu', meaning: 'Membeli', wordType: 'Verb' },
    { word: 'とります', kanji: '撮ります', kana: 'とります', romaji: 'torimasu', meaning: 'Mengambil (foto)', wordType: 'Verb' },
    { word: 'ごはん', kanji: 'ご飯', kana: 'ごはん', romaji: 'gohan', meaning: 'Nasi / Makanan', wordType: 'Noun' },
    { word: 'パン', kana: 'パン', romaji: 'pan', meaning: 'Roti', wordType: 'Noun' },
    { word: 'みず', kanji: '水', kana: 'みず', romaji: 'mizu', meaning: 'Air minum', wordType: 'Noun' },
    { word: 'おちゃ', kanji: 'お茶', kana: 'おちゃ', romaji: 'ocha', meaning: 'Teh hijau', wordType: 'Noun' },
    { word: 'おさけ', kanji: 'お酒', kana: 'おさけ', romaji: 'osake', meaning: 'Sake / Minuman beralkohol', wordType: 'Noun' },
    { word: 'えいが', kanji: '映画', kana: 'えいが', romaji: 'eiga', meaning: 'Film / Bioskop', wordType: 'Noun' },
    { word: 'てがみ', kanji: '手紙', kana: 'てがみ', romaji: 'tegami', meaning: 'Surat', wordType: 'Noun' },
  ]

  const existV6 = await prisma.vocabulary.findMany({ select: { word: true } })
  const existV6Set = new Set(existV6.map(v => v.word))
  const newV6 = vocab6.filter(v => !existV6Set.has(v.word))
  if (newV6.length > 0) {
    await prisma.vocabulary.createMany({ data: newV6.map(v => ({ ...v, lessonId: lesson6.id })) })
    console.log(`✅ Vocab Bab 6 ditambahkan: ${newV6.length} kata`)
  }

  // 4. Grammar Bab 6 (Objek を, Tempat Aksi で, Ajakan ～ませんか & ～ましょう)
  const grammar6 = [
    {
      pattern: '[Kata Benda] を [Kata Kerja Transitive]',
      meaning: 'Melakukan aksi terhadap [Kata Benda]',
      usage: 'Partikel を (dibaca "o") menandai objek penderita langsung yang dikenai pekerjaan oleh kata kerja.',
      example: 'あさごはんを たべます。',
      translation: 'Makan sarapan pagi.',
      note: 'Partikel を hanya digunakan untuk kata kerja transitive yang memerlukan objek sasaran.',
    },
    {
      pattern: '[Tempat] で [Kata Kerja]',
      meaning: 'Melakukan aksi di [Tempat]',
      usage: 'Partikel で menandai lokasi tempat berlangsungnya suatu kegiatan aktif (bukan sekadar keberadaan diam).',
      example: 'レストランで ごはんを たべました。',
      translation: 'Makan nasi di restoran.',
      note: 'Bandingkan dengan partikel に yang digunakan untuk keberadaan (います/あります) atau titik tujuan (行きます).',
    },
    {
      pattern: 'いっしょに [Kata Kerja] ませんか',
      meaning: 'Maukah / Bagaimana kalau kita [Kata Kerja] bersama?',
      usage: 'Digunakan untuk mengajak lawan bicara melakukan sesuatu secara sopan dan memberi ruang bagi lawan bicara untuk menolak.',
      example: 'いっしょに えいがを みませんか。',
      translation: 'Maukah menonton film bersama-sama?',
      note: 'Menjawab ajakan ini secara positif: ええ、いいですね (Ya, boleh juga).',
    },
    {
      pattern: '[Kata Kerja] ましょう / ましょうか',
      meaning: 'Ayo kita [Kata Kerja] / Bagaimana kalau saya bantu [Kata Kerja]?',
      usage: '～ましょう digunakan untuk ajakan tegas ("Ayo kita!"). ～ましょうか digunakan untuk menawarkan bantuan proaktif.',
      example: 'ロビーで やすみましょう。',
      translation: 'Mari beristirahat di lobi.',
      note: 'Contoh penawaran bantuan: てつだいましょうか (Bagaimana kalau saya bantu?).',
    },
  ]

  const existG6 = await prisma.grammar.findMany({ select: { pattern: true } })
  const existG6Set = new Set(existG6.map(g => g.pattern))
  const newG6 = grammar6.filter(g => !existG6Set.has(g.pattern))
  if (newG6.length > 0) {
    await prisma.grammar.createMany({ data: newG6.map(g => ({ ...g, lessonId: lesson6.id })) })
    console.log(`✅ Grammar Bab 6 ditambahkan: ${newG6.length} pola`)
  }

  // 5. Kanji Bab 6 (8 Kanji Makanan, Komunikasi & Aksi JLPT N5)
  const kanji6 = [
    { character: '食', hiragana: 'たべる / しょく', romaji: 'taberu / shoku', meaning: 'Makan, Makanan', onyomi: 'ショク, ジキ (shoku, jiki)', kunyomi: 'た・べる, く・う (ta-beru, ku-u)', jlptLevel: 'N5' },
    { character: '飲', hiragana: 'のむ / いん', romaji: 'nomu / in', meaning: 'Minum, Minuman', onyomi: 'イン (in)', kunyomi: 'の・む (no-mu)', jlptLevel: 'N5' },
    { character: '見', hiragana: 'みる / けん', romaji: 'miru / ken', meaning: 'Melihat, Menonton', onyomi: 'ケン (ken)', kunyomi: 'み・る, み・せる (mi-ru, mi-seru)', jlptLevel: 'N5' },
    { character: '聞', hiragana: 'きく / ぶん', romaji: 'kiku / bun', meaning: 'Mendengar, Bertanya', onyomi: 'ブン, モン (bun, mon)', kunyomi: 'き・く, き・こえる (ki-ku, ki-koeru)', jlptLevel: 'N5' },
    { character: '読', hiragana: 'よむ / どく', romaji: 'yomu / doku', meaning: 'Membaca', onyomi: 'ドク, トク (doku, toku)', kunyomi: 'よ・む (yo-mu)', jlptLevel: 'N5' },
    { character: '書', hiragana: 'かく / しょ', romaji: 'kaku / sho', meaning: 'Menulis, Dokumen/Buku', onyomi: 'ショ (sho)', kunyomi: 'か・く (ka-ku)', jlptLevel: 'N5' },
    { character: '買', hiragana: 'かう / ばい', romaji: 'kau / bai', meaning: 'Membeli', onyomi: 'バイ (bai)', kunyomi: 'か・う (ka-u)', jlptLevel: 'N5' },
    { character: '話', hiragana: 'はなす / わ', romaji: 'hanasu / wa', meaning: 'Berbicara, Cerita', onyomi: 'ワ (wa)', kunyomi: 'はな・す, はなし (hana-su, hanashi)', jlptLevel: 'N5' },
  ]

  const existK6 = await prisma.kanji.findMany({ select: { character: true } })
  const existK6Set = new Set(existK6.map(k => k.character))
  const newK6 = kanji6.filter(k => !existK6Set.has(k.character))
  if (newK6.length > 0) {
    await prisma.kanji.createMany({ data: newK6.map(k => ({ ...k, lessonId: lesson6.id })) })
    console.log(`✅ Kanji Bab 6 ditambahkan: ${newK6.length} karakter`)
  }

  console.log('\n🎉 Seed Bab 6 selesai dengan sukses!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding Bab 6:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
