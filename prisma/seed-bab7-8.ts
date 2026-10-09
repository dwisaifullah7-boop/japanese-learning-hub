import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Memulai seed Bab 7 & Bab 8 Minna no Nihongo (Alat/Pemberian & Kata Sifat)...')

  // 1. Dapatkan Course
  let course = await prisma.course.findFirst()
  if (!course) {
    course = await prisma.course.create({
      data: { title: 'Minna no Nihongo 1', description: 'Buku pelajaran bahasa Jepang dasar untuk pemula.' },
    })
  }

  // 2. Buat Lesson Bab 7
  let lesson7 = await prisma.lesson.findFirst({ where: { title: 'Bab 7' } })
  if (!lesson7) {
    lesson7 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 7',
        description: 'Alat & Sarana (で), Memberi & Menerima (あげます・もらいます), dan Keterangan Sudah / Belum (もう～ました / まだです).',
        order: 7,
      },
    })
    console.log('✅ Lesson Bab 7 dibuat:', lesson7.id)
  }

  // 3. Buat Lesson Bab 8
  let lesson8 = await prisma.lesson.findFirst({ where: { title: 'Bab 8' } })
  if (!lesson8) {
    lesson8 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 8',
        description: 'Kata Sifat (い形容詞 & な形容詞), Modifikasi Kata Benda, Kalimat Tanya どんな, dan Perubahan Negatif Kata Sifat.',
        order: 8,
      },
    })
    console.log('✅ Lesson Bab 8 dibuat:', lesson8.id)
  }

  // 4. Vocabulary Bab 7 (16 Kata: Alat, Sarana, Pemberian)
  const vocab7 = [
    { word: 'きります', kanji: '切ります', kana: 'きります', romaji: 'kirimasu', meaning: 'Memotong / Menggunting', wordType: 'Verb' },
    { word: 'おくります', kanji: '送ります', kana: 'おくります', romaji: 'okurimasu', meaning: 'Mengirim', wordType: 'Verb' },
    { word: 'あげます', kana: 'あげます', romaji: 'agemasu', meaning: 'Memberi', wordType: 'Verb' },
    { word: 'もらいます', kana: 'もらいます', romaji: 'moraimasu', meaning: 'Menerima', wordType: 'Verb' },
    { word: 'かします', kanji: '貸します', kana: 'かします', romaji: 'kashimasu', meaning: 'Meminjamkan', wordType: 'Verb' },
    { word: 'かります', kanji: '借ります', kana: 'かります', romaji: 'karimasu', meaning: 'Meminjam', wordType: 'Verb' },
    { word: 'おしえます', kanji: '教えます', kana: 'おしえます', romaji: 'oshiemasu', meaning: 'Mengajar / Memberitahu', wordType: 'Verb' },
    { word: 'ならいます', kanji: '習います', kana: 'ならいます', romaji: 'naraimasu', meaning: 'Belajar (dari orang lain)', wordType: 'Verb' },
    { word: 'はし', kana: 'はし', romaji: 'hashi', meaning: 'Sumpit', wordType: 'Noun' },
    { word: 'スプーン', kana: 'スプーン', romaji: 'supuun', meaning: 'Sendok', wordType: 'Noun' },
    { word: 'フォーク', kana: 'フォーク', romaji: 'fooku', meaning: 'Garpu', wordType: 'Noun' },
    { word: 'ナイフ', kana: 'ナイフ', romaji: 'naifu', meaning: 'Pisau', wordType: 'Noun' },
    { word: 'はさみ', kana: 'はさみ', romaji: 'hasami', meaning: 'Gunting', wordType: 'Noun' },
    { word: 'プレゼント', kana: 'プレゼント', romaji: 'purezento', meaning: 'Hadiah / Kado', wordType: 'Noun' },
    { word: 'にもつ', kanji: '荷物', kana: 'にもつ', romaji: 'nimotsu', meaning: 'Barang bawaan / Paket', wordType: 'Noun' },
    { word: 'もう', kana: 'もう', romaji: 'mou', meaning: 'Sudah', wordType: 'Adverb' },
  ]

  // 5. Vocabulary Bab 8 (16 Kata Sifat & Benda Penting)
  const vocab8 = [
    { word: 'ハンサム', kana: 'ハンサム', romaji: 'hansamu', meaning: 'Tampan / Ganteng', wordType: 'na-adjective' },
    { word: 'きれい', kana: 'きれい', romaji: 'kirei', meaning: 'Cantik / Bersih / Indah', wordType: 'na-adjective' },
    { word: 'しずか', kanji: '静か', kana: 'しずか', romaji: 'shizuka', meaning: 'Tenang / Sunyi', wordType: 'na-adjective' },
    { word: 'にぎやか', kana: 'にぎやか', romaji: 'nigiyaka', meaning: 'Ramai', wordType: 'na-adjective' },
    { word: 'ゆうめい', kanji: '有名', kana: 'ゆうめい', romaji: 'yuumei', meaning: 'Terkenal', wordType: 'na-adjective' },
    { word: 'しんせつ', kanji: '親切', kana: 'しんせつ', romaji: 'shinsetsu', meaning: 'Ramah / Baik hati', wordType: 'na-adjective' },
    { word: 'げんき', kanji: '元気', kana: 'げんき', romaji: 'genki', meaning: 'Sehat / Bersemangat', wordType: 'na-adjective' },
    { word: 'べんり', kanji: '便利', kana: 'べんり', romaji: 'benri', meaning: 'Praktis / Nyaman', wordType: 'na-adjective' },
    { word: 'おおきい', kanji: '大きい', kana: 'おおきい', romaji: 'ookii', meaning: 'Besar', wordType: 'i-adjective' },
    { word: 'ちいさい', kanji: '小さい', kana: 'ちいさい', romaji: 'chiisai', meaning: 'Kecil', wordType: 'i-adjective' },
    { word: 'あたらしい', kanji: '新しい', kana: 'あたらしい', romaji: 'atarashii', meaning: 'Baru', wordType: 'i-adjective' },
    { word: 'ふるい', kanji: '古い', kana: 'ふるい', romaji: 'furui', meaning: 'Lama / Kuno', wordType: 'i-adjective' },
    { word: 'いい', kanji: '良い', kana: 'いい', romaji: 'ii', meaning: 'Bagus / Baik', wordType: 'i-adjective' },
    { word: 'わるい', kanji: '悪い', kana: 'わるい', romaji: 'warui', meaning: 'Buruk / Jelek', wordType: 'i-adjective' },
    { word: 'あつい', kanji: '暑い', kana: 'あつい', romaji: 'atsui', meaning: 'Panas (cuaca/udara)', wordType: 'i-adjective' },
    { word: 'さむい', kanji: '寒い', kana: 'さむい', romaji: 'samui', meaning: 'Dingin (cuaca/udara)', wordType: 'i-adjective' },
  ]

  const existVocab = await prisma.vocabulary.findMany({ select: { word: true } })
  const existVocabSet = new Set(existVocab.map(v => v.word))

  const newV7 = vocab7.filter(v => !existVocabSet.has(v.word))
  if (newV7.length > 0) {
    await prisma.vocabulary.createMany({ data: newV7.map(v => ({ ...v, lessonId: lesson7.id })) })
    console.log(`✅ Vocab Bab 7 ditambahkan: ${newV7.length} kata`)
  }

  const newV8 = vocab8.filter(v => !existVocabSet.has(v.word))
  if (newV8.length > 0) {
    await prisma.vocabulary.createMany({ data: newV8.map(v => ({ ...v, lessonId: lesson8.id })) })
    console.log(`✅ Vocab Bab 8 ditambahkan: ${newV8.length} kata`)
  }

  // 6. Grammar Bab 7 (4 Pola: Alat で, あげます, もらいます, もう～ました)
  const grammar7 = [
    {
      pattern: '[Alat / Bahasa] で [Kata Kerja]',
      meaning: 'Melakukan aksi dengan / menggunakan [Alat / Bahasa]',
      usage: 'Partikel で menandai perkakas, sarana, atau alat komunikasi/bahasa yang dipakai untuk melakukan tindakan.',
      example: 'はしで ごはんを たべます。',
      translation: 'Makan nasi dengan sumpit.',
      note: 'Contoh bahasa: にほんごで てがみを かきました (Menulis surat dalam bahasa Jepang).',
    },
    {
      pattern: '[Pemberi] は [Penerima] に [Benda] を あげます',
      meaning: '[Pemberi] memberikan [Benda] kepada [Penerima]',
      usage: 'Menyatakan tindakan memberikan barang/hadiah kepada orang lain. Penerima ditandai dengan partikel に.',
      example: 'わたしは たなかさんに はなを あげました。',
      translation: 'Saya memberi bunga kepada Sdr. Tanaka.',
      note: 'Dilarang menggunakan あげます jika penerimanya adalah "saya" (gunakan くれました).',
    },
    {
      pattern: '[Penerima] は [Pemberi] に/から [Benda] を もらいます',
      meaning: '[Penerima] menerima / mendapatkan [Benda] dari [Pemberi]',
      usage: 'Menyatakan tindakan menerima barang dari orang lain atau organisasi (sekolah, perusahaan).',
      example: 'わたしは ははに プレゼントを もらいました。',
      translation: 'Saya menerima hadiah dari ibu.',
      note: 'Jika pemberinya berupa lembaga/organisasi (perusahaan, bank), gunakan から, bukan に.',
    },
    {
      pattern: 'もう [Kata Kerja] ましたか',
      meaning: 'Apakah sudah [Kata Kerja]?',
      usage: 'Menanyakan apakah suatu kegiatan telah selesai dilakukan saat ini.',
      example: 'もう ひるごはんを たべましたか。',
      translation: 'Apakah Anda sudah makan siang?',
      note: 'Jawaban positif: はい、もう たべました. Jawaban negatif: いいえ、まだです (Belum).',
    },
  ]

  // 7. Grammar Bab 8 (4 Pola: Kata Sifat Predikat, Modifikasi Benda, Negatif Sifat, Pertanyaan どんな)
  const grammar8 = [
    {
      pattern: '[Benda] は [i-Adj] です / [na-Adj] です',
      meaning: '[Benda] itu bersifat [Sifat]',
      usage: 'Menjadikan kata sifat sebagai predikat kalimat sopan (diakhiri です).',
      example: 'ふじさんは たかいです。このまちは しずかです。',
      translation: 'Gunung Fuji tinggi. Kota ini tenang.',
      note: 'Perhatikan bahwa な pada na-adjective DIHAPUS saat menjadi predikat (しずかです, bukan *しずかなです).',
    },
    {
      pattern: 'Negatif: [i-Adj]くないです / [na-Adj]じゃありません',
      meaning: 'Tidak [Sifat]',
      usage: 'Bentuk negatif formal kata sifat: i-adjective ganti い menjadi くない, na-adjective tambah じゃありません.',
      example: 'このほんは おもしろくないです。ここは べんりじゃありません。',
      translation: 'Buku ini tidak menarik. Tempat ini tidak praktis.',
      note: 'Pengecualian khusus: いい (bagus) bentuk negatifnya adalah よくないです (bukan *いくないです).',
    },
    {
      pattern: '[i-Adj] [Kata Benda] / [na-Adj] な [Kata Benda]',
      meaning: '[Kata Benda] yang [Sifat]',
      usage: 'Kata sifat menerangkan kata benda secara langsung di depannya.',
      example: 'しろい くるま / しずかな まち',
      translation: 'Mobil yang putih / Kota yang tenang.',
      note: 'Na-adjective WAJIB menyertakan partikel な saat menerangkan kata benda di belakangnya (しずかな まち).',
    },
    {
      pattern: '[Benda] は どんな [Kata Benda] ですか',
      meaning: '[Benda] adalah [Kata Benda] yang seperti apa?',
      usage: 'Menanyakan deskripsi atau karakteristik sifat dari suatu tempat, orang, atau benda.',
      example: 'ならは どんな まちですか。ふるい まちです。',
      translation: 'Nara adalah kota yang seperti apa? Kota yang kuno.',
      note: 'Jawab dengan kombinasi kata sifat + kata benda.',
    },
  ]

  const existGrammar = await prisma.grammar.findMany({ select: { pattern: true } })
  const existGrammarSet = new Set(existGrammar.map(g => g.pattern))

  const newG7 = grammar7.filter(g => !existGrammarSet.has(g.pattern))
  if (newG7.length > 0) {
    await prisma.grammar.createMany({ data: newG7.map(g => ({ ...g, lessonId: lesson7.id })) })
    console.log(`✅ Grammar Bab 7 ditambahkan: ${newG7.length} pola`)
  }

  const newG8 = grammar8.filter(g => !existGrammarSet.has(g.pattern))
  if (newG8.length > 0) {
    await prisma.grammar.createMany({ data: newG8.map(g => ({ ...g, lessonId: lesson8.id })) })
    console.log(`✅ Grammar Bab 8 ditambahkan: ${newG8.length} pola`)
  }

  // 8. Kanji Bab 7 & 8 (16 Kanji JLPT N5)
  const kanji7And8 = [
    // Bab 7 (8 Kanji)
    { character: '切', hiragana: 'きる / せつ', romaji: 'kiru / setsu', meaning: 'Memotong, Berharga/Krusial', onyomi: 'セツ, サイ (setsu, sai)', kunyomi: 'き・る, き・れる (ki-ru, ki-reru)', jlptLevel: 'N5', lessonId: lesson7.id },
    { character: '友', hiragana: 'とも / ゆう', romaji: 'tomo / yuu', meaning: 'Teman, Sahabat', onyomi: 'ユウ (yuu)', kunyomi: 'とも (tomo)', jlptLevel: 'N5', lessonId: lesson7.id },
    { character: '貸', hiragana: 'かす / たい', romaji: 'kasu / tai', meaning: 'Meminjamkan', onyomi: 'タイ (tai)', kunyomi: 'か・す (ka-su)', jlptLevel: 'N5', lessonId: lesson7.id },
    { character: '借', hiragana: 'かりる / しゃく', romaji: 'kariru / shaku', meaning: 'Meminjam', onyomi: 'シャク (shaku)', kunyomi: 'か・りる (ka-riru)', jlptLevel: 'N5', lessonId: lesson7.id },
    { character: '教', hiragana: 'おしえる / きょう', romaji: 'oshieru / kyou', meaning: 'Mengajar, Ajaran', onyomi: 'キョウ (kyou)', kunyomi: 'おし・える, おそ・わる (oshi-eru, oso-waru)', jlptLevel: 'N5', lessonId: lesson7.id },
    { character: '習', hiragana: 'ならう / しゅう', romaji: 'narau / shuu', meaning: 'Belajar, Membiasakan', onyomi: 'シュウ (shuu)', kunyomi: 'なら・う (nara-u)', jlptLevel: 'N5', lessonId: lesson7.id },
    { character: '送', hiragana: 'おくる / そう', romaji: 'okuru / sou', meaning: 'Mengirim, Mengantar', onyomi: 'ソウ (sou)', kunyomi: 'おく・る (oku-ru)', jlptLevel: 'N5', lessonId: lesson7.id },
    { character: '届', hiragana: 'とどける', romaji: 'todokeru', meaning: 'Menyampaikan, Sampai', onyomi: 'カイ (kai)', kunyomi: 'とど・く, とど・ける (todo-ku, todo-keru)', jlptLevel: 'N4', lessonId: lesson7.id },

    // Bab 8 (8 Kanji)
    { character: '静', hiragana: 'しずか / せい', romaji: 'shizuka / sei', meaning: 'Tenang, Diam', onyomi: 'セイ, ジョウ (sei, jou)', kunyomi: 'しず・か, しず・まる (shizu-ka, shizu-maru)', jlptLevel: 'N4', lessonId: lesson8.id },
    { character: '有', hiragana: 'ある / ゆう', romaji: 'aru / yuu', meaning: 'Ada, Memiliki', onyomi: 'ユウ, ウ (yuu, u)', kunyomi: 'あ・る (a-ru)', jlptLevel: 'N5', lessonId: lesson8.id },
    { character: '名', hiragana: 'な / めい', romaji: 'na / mei', meaning: 'Nama, Terkenal', onyomi: 'メイ, ミョウ (mei, myou)', kunyomi: 'な (na)', jlptLevel: 'N5', lessonId: lesson8.id },
    { character: '親', hiragana: 'おや / しん', romaji: 'oya / shin', meaning: 'Orang tua, Akrab/Ramah', onyomi: 'シン (shin)', kunyomi: 'おや, した・しい (oya, shita-shii)', jlptLevel: 'N5', lessonId: lesson8.id },
    { character: '新', hiragana: 'あたらしい / しん', romaji: 'atarashii / shin', meaning: 'Baru', onyomi: 'シン (shin)', kunyomi: 'あたら・しい, あら・た (atara-shii, ara-ta)', jlptLevel: 'N5', lessonId: lesson8.id },
    { character: '古', hiragana: 'ふるい / こ', romaji: 'furui / ko', meaning: 'Tua, Kuno', onyomi: 'コ (ko)', kunyomi: 'ふる・い, ふる・す (furu-i, furu-su)', jlptLevel: 'N5', lessonId: lesson8.id },
    { character: '白', hiragana: 'しろ / はく', romaji: 'shiro / haku', meaning: 'Putih', onyomi: 'ハク, ビャク (haku, byaku)', kunyomi: 'しろ, しろ・い (shiro, shiro-i)', jlptLevel: 'N5', lessonId: lesson8.id },
    { character: '黒', hiragana: 'くろ / こく', romaji: 'kuro / koku', meaning: 'Hitam', onyomi: 'コク (koku)', kunyomi: 'くろ, くろ・い (kuro, kuro-i)', jlptLevel: 'N5', lessonId: lesson8.id },
  ]

  const existKanji = await prisma.kanji.findMany({ select: { character: true } })
  const existKanjiSet = new Set(existKanji.map(k => k.character))
  const newKanji = kanji7And8.filter(k => !existKanjiSet.has(k.character))

  if (newKanji.length > 0) {
    await prisma.kanji.createMany({ data: newKanji })
    console.log(`✅ Kanji Bab 7 & 8 ditambahkan: ${newKanji.length} karakter`)
  }

  console.log('\n🎉 Seed Bab 7 & Bab 8 selesai dengan sukses!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding Bab 7 & 8:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
