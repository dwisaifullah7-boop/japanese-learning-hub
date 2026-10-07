import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Memulai seed Bab 2 + Katakana lengkap...')

  // 1. Dapatkan Course
  let course = await prisma.course.findFirst()
  if (!course) {
    course = await prisma.course.create({
      data: { title: 'Minna no Nihongo 1', description: 'Buku pelajaran bahasa Jepang dasar untuk pemula.' },
    })
  }

  // 2. Buat Lesson Bab 2
  let lesson2 = await prisma.lesson.findFirst({ where: { title: 'Bab 2' } })
  if (!lesson2) {
    lesson2 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 2',
        description: 'Demonstratif (これ・それ・あれ), angka, harga, dan benda-benda di sekitar.',
        order: 2,
      },
    })
    console.log('✅ Lesson Bab 2 dibuat')
  }

  // 3. Lengkapi Katakana (31 karakter sisanya) — Bab 1 lesson
  const lesson1 = await prisma.lesson.findFirst({ where: { title: 'Bab 1' } })
  const lessonId1 = lesson1!.id

  const katakanaFull = [
    { character: 'タ', romaji: 'ta', example: 'タクシー (takushii) - Taksi' },
    { character: 'チ', romaji: 'chi', example: 'チーズ (chiizu) - Keju' },
    { character: 'ツ', romaji: 'tsu', example: 'ツアー (tsuaa) - Tur' },
    { character: 'テ', romaji: 'te', example: 'テスト (tesuto) - Tes' },
    { character: 'ト', romaji: 'to', example: 'トイレ (toire) - Toilet' },
    { character: 'ナ', romaji: 'na', example: 'ナイフ (naifu) - Pisau' },
    { character: 'ニ', romaji: 'ni', example: 'ニュース (nyuusu) - Berita' },
    { character: 'ヌ', romaji: 'nu', example: 'ヌードル (nuudoru) - Mie' },
    { character: 'ネ', romaji: 'ne', example: 'ネクタイ (nekutai) - Dasi' },
    { character: 'ノ', romaji: 'no', example: 'ノート (nooto) - Catatan' },
    { character: 'ハ', romaji: 'ha', example: 'ハンバーガー (hanbaagaa) - Hamburger' },
    { character: 'ヒ', romaji: 'hi', example: 'ヒーター (hiitaa) - Pemanas' },
    { character: 'フ', romaji: 'fu', example: 'フォーク (fooku) - Garpu' },
    { character: 'ヘ', romaji: 'he', example: 'ヘリコプター (herikoputaa) - Helikopter' },
    { character: 'ホ', romaji: 'ho', example: 'ホテル (hoteru) - Hotel' },
    { character: 'マ', romaji: 'ma', example: 'マスク (masuku) - Masker' },
    { character: 'ミ', romaji: 'mi', example: 'ミルク (miruku) - Susu' },
    { character: 'ム', romaji: 'mu', example: 'ムービー (muubii) - Film' },
    { character: 'メ', romaji: 'me', example: 'メニュー (menyuu) - Menu' },
    { character: 'モ', romaji: 'mo', example: 'モデル (moderu) - Model' },
    { character: 'ヤ', romaji: 'ya', example: 'ヤング (yangu) - Muda' },
    { character: 'ユ', romaji: 'yu', example: 'ユニフォーム (yunifoomu) - Seragam' },
    { character: 'ヨ', romaji: 'yo', example: 'ヨーグルト (yooguruto) - Yogurt' },
    { character: 'ラ', romaji: 'ra', example: 'ラジオ (rajio) - Radio' },
    { character: 'リ', romaji: 'ri', example: 'リモコン (rimokon) - Remote' },
    { character: 'ル', romaji: 'ru', example: 'ルール (ruuru) - Aturan' },
    { character: 'レ', romaji: 're', example: 'レストラン (resutoran) - Restoran' },
    { character: 'ロ', romaji: 'ro', example: 'ロボット (robotto) - Robot' },
    { character: 'ワ', romaji: 'wa', example: 'ワイン (wain) - Anggur' },
    { character: 'ヲ', romaji: 'wo', example: 'ヲタク (otaku) - Penggemar' },
    { character: 'ン', romaji: 'n', example: 'パン (pan) - Roti' },
  ]

  const existingKt = await prisma.katakana.findMany({ select: { character: true } })
  const existingKtSet = new Set(existingKt.map(k => k.character))
  const newKt = katakanaFull.filter(k => !existingKtSet.has(k.character))
  if (newKt.length > 0) {
    await prisma.katakana.createMany({ data: newKt.map(k => ({ ...k, lessonId: lessonId1 })) })
    console.log(`✅ Katakana ditambahkan: ${newKt.length} (Total: ${existingKt.length + newKt.length})`)
  }

  // 4. Vocabulary Bab 2 — Demonstratif & Benda
  const vocab2 = [
    { word: 'これ', kana: 'これ', romaji: 'kore', meaning: 'Ini (dekat pembicara)', wordType: 'Pronoun' },
    { word: 'それ', kana: 'それ', romaji: 'sore', meaning: 'Itu (dekat lawan bicara)', wordType: 'Pronoun' },
    { word: 'あれ', kana: 'あれ', romaji: 'are', meaning: 'Itu (jauh dari keduanya)', wordType: 'Pronoun' },
    { word: 'この', kana: 'この', romaji: 'kono', meaning: 'Yang ini (+ kata benda)', wordType: 'Adjective' },
    { word: 'その', kana: 'その', romaji: 'sono', meaning: 'Yang itu (+ kata benda)', wordType: 'Adjective' },
    { word: 'あの', kana: 'あの', romaji: 'ano', meaning: 'Yang itu / jauh (+ kata benda)', wordType: 'Adjective' },
    { word: 'じしょ', kanji: '辞書', kana: 'じしょ', romaji: 'jisho', meaning: 'Kamus', wordType: 'Noun' },
    { word: 'ざっし', kanji: '雑誌', kana: 'ざっし', romaji: 'zasshi', meaning: 'Majalah', wordType: 'Noun' },
    { word: 'しんぶん', kanji: '新聞', kana: 'しんぶん', romaji: 'shinbun', meaning: 'Koran', wordType: 'Noun' },
    { word: 'ノート', kana: 'ノート', romaji: 'nooto', meaning: 'Buku catatan', wordType: 'Noun' },
    { word: 'てちょう', kanji: '手帳', kana: 'てちょう', romaji: 'techou', meaning: 'Buku saku', wordType: 'Noun' },
    { word: 'めいし', kanji: '名刺', kana: 'めいし', romaji: 'meishi', meaning: 'Kartu nama', wordType: 'Noun' },
    { word: 'かさ', kanji: '傘', kana: 'かさ', romaji: 'kasa', meaning: 'Payung', wordType: 'Noun' },
    { word: 'かぎ', kana: 'かぎ', romaji: 'kagi', meaning: 'Kunci', wordType: 'Noun' },
    { word: 'とけい', kanji: '時計', kana: 'とけい', romaji: 'tokei', meaning: 'Jam', wordType: 'Noun' },
  ]

  const existV2 = await prisma.vocabulary.findMany({ select: { word: true } })
  const existV2Set = new Set(existV2.map(v => v.word))
  const newV2 = vocab2.filter(v => !existV2Set.has(v.word))
  if (newV2.length > 0) {
    await prisma.vocabulary.createMany({ data: newV2.map(v => ({ ...v, lessonId: lesson2.id })) })
    console.log(`✅ Vocab Bab 2 ditambahkan: ${newV2.length} kata`)
  }

  // 5. Grammar Bab 2
  const grammar2 = [
    {
      pattern: 'これ/それ/あれ は ～です',
      meaning: 'Ini/Itu adalah ~',
      usage: 'Digunakan untuk menunjuk dan memperkenalkan sebuah benda.',
      example: 'これは ほんです。',
      translation: 'Ini adalah buku.',
      note: 'これ = dekat pembicara, それ = dekat lawan bicara, あれ = jauh dari keduanya.',
    },
    {
      pattern: 'この/その/あの ～',
      meaning: 'Yang ini/itu ~',
      usage: 'Memodifikasi kata benda secara langsung. Selalu diikuti kata benda.',
      example: 'この ほんは わたしのです。',
      translation: 'Buku yang ini milik saya.',
      note: 'Berbeda dengan これ/それ/あれ yang berdiri sendiri, この/その/あの harus diikuti kata benda.',
    },
    {
      pattern: '～は ～ですか、～ですか',
      meaning: 'Apakah ~ ini ~ atau ~?',
      usage: 'Kalimat tanya pilihan (alternative question). Jawab langsung tanpa はい/いいえ.',
      example: 'これは ９ですか、７ですか。',
      translation: 'Ini angka 9 atau 7?',
      note: 'Tidak dijawab dengan はい atau いいえ, tapi langsung jawabannya.',
    },
    {
      pattern: '～は いくらですか',
      meaning: 'Berapa harga ~?',
      usage: 'Menanyakan harga suatu barang.',
      example: 'この とけいは いくらですか。',
      translation: 'Berapa harga jam ini?',
      note: 'Jawab dengan angka + えん (yen): ３０００えんです。',
    },
  ]

  const existG = await prisma.grammar.findMany({ select: { pattern: true } })
  const existGSet = new Set(existG.map(g => g.pattern))
  const newG = grammar2.filter(g => !existGSet.has(g.pattern))
  if (newG.length > 0) {
    await prisma.grammar.createMany({ data: newG.map(g => ({ ...g, lessonId: lesson2.id })) })
    console.log(`✅ Grammar Bab 2 ditambahkan: ${newG.length} pola`)
  }

  // 6. Kanji Bab 2
  const kanji2 = [
    { character: '山', hiragana: 'やま', romaji: 'yama', meaning: 'Gunung', onyomi: 'サン (san)', kunyomi: 'やま (yama)', jlptLevel: 'N5' },
    { character: '川', hiragana: 'かわ', romaji: 'kawa', meaning: 'Sungai', onyomi: 'セン (sen)', kunyomi: 'かわ (kawa)', jlptLevel: 'N5' },
    { character: '田', hiragana: 'た', romaji: 'ta', meaning: 'Sawah', onyomi: 'デン (den)', kunyomi: 'た (ta)', jlptLevel: 'N4' },
    { character: '中', hiragana: 'なか', romaji: 'naka', meaning: 'Tengah, Dalam', onyomi: 'チュウ (chuu)', kunyomi: 'なか (naka)', jlptLevel: 'N5' },
    { character: '上', hiragana: 'うえ', romaji: 'ue', meaning: 'Atas', onyomi: 'ジョウ (jou)', kunyomi: 'うえ, あ・げる (ue, a-geru)', jlptLevel: 'N5' },
    { character: '下', hiragana: 'した', romaji: 'shita', meaning: 'Bawah', onyomi: 'カ, ゲ (ka, ge)', kunyomi: 'した, さ・げる (shita, sa-geru)', jlptLevel: 'N5' },
    { character: '金', hiragana: 'かね', romaji: 'kane', meaning: 'Uang, Emas', onyomi: 'キン, コン (kin, kon)', kunyomi: 'かね (kane)', jlptLevel: 'N5' },
    { character: '火', hiragana: 'ひ', romaji: 'hi', meaning: 'Api', onyomi: 'カ (ka)', kunyomi: 'ひ (hi)', jlptLevel: 'N5' },
  ]

  const existK = await prisma.kanji.findMany({ select: { character: true } })
  const existKSet = new Set(existK.map(k => k.character))
  const newK = kanji2.filter(k => !existKSet.has(k.character))
  if (newK.length > 0) {
    await prisma.kanji.createMany({ data: newK.map(k => ({ ...k, lessonId: lesson2.id })) })
    console.log(`✅ Kanji Bab 2 ditambahkan: ${newK.length} karakter`)
  }

  console.log('\n🎉 Seed Bab 2 + Katakana lengkap selesai!')
}

main()
  .catch((e) => { console.error('❌ Error:', e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
