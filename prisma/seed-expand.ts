import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Memulai seed expansion database...')

  // 1. Dapatkan Lesson (Bab 1)
  let lesson = await prisma.lesson.findFirst({
    orderBy: { order: 'asc' },
  })

  if (!lesson) {
    console.log('⚠️ Lesson tidak ditemukan, mencari atau membuat Course default...')
    let course = await prisma.course.findFirst()
    if (!course) {
      course = await prisma.course.create({
        data: {
          title: 'Minna no Nihongo 1',
          description: 'Buku pelajaran bahasa Jepang dasar untuk pemula.',
        },
      })
    }
    lesson = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 1',
        description: 'Perkenalan dasar, Hiragana dasar, dan kosakata sederhana.',
        order: 1,
      },
    })
  }

  console.log(`📌 Menggunakan Lesson: "${lesson.title}" (ID: ${lesson.id})`)

  // 2. Data 46 Hiragana Lengkap (Gojūon)
  const allHiraganaData = [
    // A-row
    { character: 'あ', romaji: 'a', example: 'あさ (asa) - Pagi' },
    { character: 'い', romaji: 'i', example: 'いぬ (inu) - Anjing' },
    { character: 'う', romaji: 'u', example: 'うみ (umi) - Laut' },
    { character: 'え', romaji: 'e', example: 'えき (eki) - Stasiun' },
    { character: 'お', romaji: 'o', example: 'おかあさん (okaasan) - Ibu' },
    // Ka-row
    { character: 'か', romaji: 'ka', example: 'かさ (kasa) - Payung' },
    { character: 'き', romaji: 'ki', example: 'き (ki) - Pohon' },
    { character: 'く', romaji: 'ku', example: 'くち (kuchi) - Mulut' },
    { character: 'け', romaji: 'ke', example: 'けさ (kesa) - Pagi ini' },
    { character: 'こ', romaji: 'ko', example: 'こども (kodomo) - Anak-anak' },
    // Sa-row
    { character: 'さ', romaji: 'sa', example: 'さかな (sakana) - Ikan' },
    { character: 'し', romaji: 'shi', example: 'しお (shio) - Garam' },
    { character: 'す', romaji: 'su', example: 'すし (sushi) - Sushi' },
    { character: 'せ', romaji: 'se', example: 'せんせい (sensei) - Guru' },
    { character: 'そ', romaji: 'so', example: 'そら (sora) - Langit' },
    // Ta-row
    { character: 'た', romaji: 'ta', example: 'たまご (tamago) - Telur' },
    { character: 'ち', romaji: 'chi', example: 'ちかてつ (chikatetsu) - Kereta bawah tanah' },
    { character: 'つ', romaji: 'tsu', example: 'つくえ (tsukue) - Meja' },
    { character: 'て', romaji: 'te', example: 'て (te) - Tangan' },
    { character: 'と', romaji: 'to', example: 'ともだち (tomodachi) - Teman' },
    // Na-row
    { character: 'な', romaji: 'na', example: 'なつ (natsu) - Musim panas' },
    { character: 'に', romaji: 'ni', example: 'にく (niku) - Daging' },
    { character: 'ぬ', romaji: 'nu', example: 'ぬいぐるみ (nuigurumi) - Boneka' },
    { character: 'ね', romaji: 'ne', example: 'ねこ (neko) - Kucing' },
    { character: 'の', romaji: 'no', example: 'のみもの (nomimono) - Minuman' },
    // Ha-row
    { character: 'は', romaji: 'ha', example: 'はな (hana) - Bunga' },
    { character: 'ひ', romaji: 'hi', example: 'ひと (hito) - Orang' },
    { character: 'ふ', romaji: 'fu', example: 'ふね (fune) - Kapal' },
    { character: 'へ', romaji: 'he', example: 'へや (heya) - Kamar' },
    { character: 'ほ', romaji: 'ho', example: 'ほし (hoshi) - Bintang' },
    // Ma-row
    { character: 'ま', romaji: 'ma', example: 'まち (machi) - Kota' },
    { character: 'み', romaji: 'mi', example: 'みず (mizu) - Air' },
    { character: 'む', romaji: 'mu', example: 'むし (mushi) - Serangga' },
    { character: 'め', romaji: 'me', example: 'め (me) - Mata' },
    { character: 'も', romaji: 'mo', example: 'もり (mori) - Hutan' },
    // Ya-row
    { character: 'や', romaji: 'ya', example: 'やま (yama) - Gunung' },
    { character: 'ゆ', romaji: 'yu', example: 'ゆき (yuki) - Salju' },
    { character: 'よ', romaji: 'yo', example: 'よる (yoru) - Malam' },
    // Ra-row
    { character: 'ら', romaji: 'ra', example: 'らいしゅう (raishuu) - Minggu depan' },
    { character: 'り', romaji: 'ri', example: 'りんご (ringo) - Apel' },
    { character: 'る', romaji: 'ru', example: 'るす (rusu) - Tidak di rumah' },
    { character: 'れ', romaji: 're', example: 'れいぞuc (reizouko) - Kulkas' },
    { character: 'ろ', romaji: 'ro', example: 'ろうそく (rousoku) - Lilin' },
    // Wa-row & N
    { character: 'わ', romaji: 'wa', example: 'わたし (watashi) - Saya' },
    { character: 'を', romaji: 'wo', example: 'ほん を よむ (hon o yomu) - Membaca buku' },
    { character: 'ん', romaji: 'n', example: 'にほん (nihon) - Jepang' },
  ]

  const existingHiragana = await prisma.hiragana.findMany({ select: { character: true } })
  const existingHiraganaChars = new Set(existingHiragana.map(h => h.character))
  const newHiragana = allHiraganaData.filter(h => !existingHiraganaChars.has(h.character))

  if (newHiragana.length > 0) {
    await prisma.hiragana.createMany({
      data: newHiragana.map(h => ({ ...h, lessonId: lesson.id })),
    })
    console.log(`✅ Hiragana ditambahkan: ${newHiragana.length} karakter baru (Total sekarang: ${existingHiragana.length + newHiragana.length})`)
  } else {
    console.log(`ℹ️ Hiragana sudah lengkap (${existingHiragana.length} karakter).`)
  }

  // 3. Data Basic Katakana (15 karakter awal)
  const katakanaData = [
    { character: 'ア', romaji: 'a', example: 'アイス (aisu) - Es krim' },
    { character: 'イ', romaji: 'i', example: 'インド (indo) - India' },
    { character: 'ウ', romaji: 'u', example: 'ウイスキー (uisukii) - Wiski' },
    { character: 'エ', romaji: 'e', example: 'エレベーター (erebeetaa) - Lift' },
    { character: 'オ', romaji: 'o', example: 'オレンジ (orenji) - Jeruk' },
    { character: 'カ', romaji: 'ka', example: 'カメラ (kamera) - Kamera' },
    { character: 'キ', romaji: 'ki', example: 'キッチン (kicchin) - Dapur' },
    { character: 'ク', romaji: 'ku', example: 'クラス (kurasu) - Kelas' },
    { character: 'ケ', romaji: 'ke', example: 'ケーキ (keeki) - Kue' },
    { character: 'コ', romaji: 'ko', example: 'コーヒー (koohii) - Kopi' },
    { character: 'サ', romaji: 'sa', example: 'サラダ (sarada) - Salad' },
    { character: 'シ', romaji: 'shi', example: 'シャツ (shatsu) - Kemeja' },
    { character: 'ス', romaji: 'su', example: 'スポーツ (supootsu) - Olahraga' },
    { character: 'セ', romaji: 'se', example: 'セーター (seetaa) - Sweater' },
    { character: 'ソ', romaji: 'so', example: 'ソファ (sofa) - Sofa' },
  ]

  const existingKatakana = await prisma.katakana.findMany({ select: { character: true } })
  const existingKatakanaChars = new Set(existingKatakana.map(k => k.character))
  const newKatakana = katakanaData.filter(k => !existingKatakanaChars.has(k.character))

  if (newKatakana.length > 0) {
    await prisma.katakana.createMany({
      data: newKatakana.map(k => ({ ...k, lessonId: lesson.id })),
    })
    console.log(`✅ Katakana ditambahkan: ${newKatakana.length} karakter baru (Total sekarang: ${existingKatakana.length + newKatakana.length})`)
  } else {
    console.log(`ℹ️ Katakana sudah ada (${existingKatakana.length} karakter).`)
  }

  // 4. Data Basic Kanji (10 JLPT N5 Kanji)
  const kanjiData = [
    {
      character: '一',
      hiragana: 'いち',
      romaji: 'ichi',
      meaning: 'Satu',
      onyomi: 'イチ, イツ (ichi, itsu)',
      kunyomi: 'ひと・つ (hito-tsu)',
      jlptLevel: 'N5',
    },
    {
      character: '二',
      hiragana: 'に',
      romaji: 'ni',
      meaning: 'Dua',
      onyomi: 'ニ (ni)',
      kunyomi: 'ふた・つ (futa-tsu)',
      jlptLevel: 'N5',
    },
    {
      character: '三',
      hiragana: 'さん',
      romaji: 'san',
      meaning: 'Tiga',
      onyomi: 'サン (san)',
      kunyomi: 'みっ・つ (mit-tsu)',
      jlptLevel: 'N5',
    },
    {
      character: '日',
      hiragana: 'にち / ひ',
      romaji: 'nichi / hi',
      meaning: 'Hari, Matahari',
      onyomi: 'ニチ, ジツ (nichi, jitsu)',
      kunyomi: 'ひ, -び, -か (hi, -bi, -ka)',
      jlptLevel: 'N5',
    },
    {
      character: '月',
      hiragana: 'つき / げつ',
      romaji: 'tsuki / getsu',
      meaning: 'Bulan',
      onyomi: 'ゲツ, ガツ (getsu, gatsu)',
      kunyomi: 'つき (tsuki)',
      jlptLevel: 'N5',
    },
    {
      character: '人',
      hiragana: 'ひと / じん',
      romaji: 'hito / jin',
      meaning: 'Orang',
      onyomi: 'ジン, ニン (jin, nin)',
      kunyomi: 'ひと (hito)',
      jlptLevel: 'N5',
    },
    {
      character: '大',
      hiragana: 'おおきい / だい',
      romaji: 'ookii / dai',
      meaning: 'Besar',
      onyomi: 'ダイ, タイ (dai, tai)',
      kunyomi: 'おお・きい (oo-kii)',
      jlptLevel: 'N5',
    },
    {
      character: '小',
      hiragana: 'ちいさい / しょう',
      romaji: 'chiisai / shou',
      meaning: 'Kecil',
      onyomi: 'ショウ (shou)',
      kunyomi: 'ちい・さい, こ-, お- (chii-sai, ko-, o-)',
      jlptLevel: 'N5',
    },
    {
      character: '本',
      hiragana: 'ほん',
      romaji: 'hon',
      meaning: 'Buku, Asal',
      onyomi: 'ホン (hon)',
      kunyomi: 'もと (moto)',
      jlptLevel: 'N5',
    },
    {
      character: '水',
      hiragana: 'みず / すい',
      romaji: 'mizu / sui',
      meaning: 'Air',
      onyomi: 'スイ (sui)',
      kunyomi: 'みず (mizu)',
      jlptLevel: 'N5',
    },
  ]

  const existingKanji = await prisma.kanji.findMany({ select: { character: true } })
  const existingKanjiChars = new Set(existingKanji.map(k => k.character))
  const newKanji = kanjiData.filter(k => !existingKanjiChars.has(k.character))

  if (newKanji.length > 0) {
    await prisma.kanji.createMany({
      data: newKanji.map(k => ({ ...k, lessonId: lesson.id })),
    })
    console.log(`✅ Kanji ditambahkan: ${newKanji.length} karakter baru (Total sekarang: ${existingKanji.length + newKanji.length})`)
  } else {
    console.log(`ℹ️ Kanji sudah ada (${existingKanji.length} karakter).`)
  }

  // 5. Data Kosakata Tambahan (10 kosakata Minna no Nihongo Bab 1)
  const vocabData = [
    {
      word: 'にほんじん',
      kanji: '日本人',
      kana: 'にほんじん',
      romaji: 'nihonjin',
      meaning: 'Orang Jepang',
      wordType: 'Noun',
    },
    {
      word: 'かいしゃいん',
      kanji: '会社員',
      kana: 'かいしゃいん',
      romaji: 'kaishain',
      meaning: 'Karyawan perusahaan',
      wordType: 'Noun',
    },
    {
      word: 'いしゃ',
      kanji: '医者',
      kana: 'いしゃ',
      romaji: 'isha',
      meaning: 'Dokter',
      wordType: 'Noun',
    },
    {
      word: 'だいがく',
      kanji: '大学',
      kana: 'だいがく',
      romaji: 'daigaku',
      meaning: 'Universitas',
      wordType: 'Noun',
    },
    {
      word: 'びょういん',
      kanji: '病院',
      kana: 'びょういん',
      romaji: 'byouin',
      meaning: 'Rumah sakit',
      wordType: 'Noun',
    },
    {
      word: 'でんわ',
      kanji: '電話',
      kana: 'でんわ',
      romaji: 'denwa',
      meaning: 'Telepon',
      wordType: 'Noun',
    },
    {
      word: 'テレビ',
      kanji: 'テレビ',
      kana: 'テレビ',
      romaji: 'terebi',
      meaning: 'Televisi / TV',
      wordType: 'Noun',
    },
    {
      word: 'えいご',
      kanji: '英語',
      kana: 'えいご',
      romaji: 'eigo',
      meaning: 'Bahasa Inggris',
      wordType: 'Noun',
    },
    {
      word: 'にほんご',
      kanji: '日本語',
      kana: 'にほんご',
      romaji: 'nihongo',
      meaning: 'Bahasa Jepang',
      wordType: 'Noun',
    },
    {
      word: 'なまえ',
      kanji: '名前',
      kana: 'なまえ',
      romaji: 'namae',
      meaning: 'Nama',
      wordType: 'Noun',
    },
  ]

  const existingVocab = await prisma.vocabulary.findMany({ select: { word: true } })
  const existingVocabWords = new Set(existingVocab.map(v => v.word))
  const newVocab = vocabData.filter(v => !existingVocabWords.has(v.word))

  if (newVocab.length > 0) {
    await prisma.vocabulary.createMany({
      data: newVocab.map(v => ({ ...v, lessonId: lesson.id })),
    })
    console.log(`✅ Kosakata ditambahkan: ${newVocab.length} kata baru (Total sekarang: ${existingVocab.length + newVocab.length})`)
  } else {
    console.log(`ℹ️ Kosakata sudah ada (${existingVocab.length} kata).`)
  }

  // 6. Data Partikel Tambahan (5 partikel)
  const particleData = [
    {
      particle: 'が',
      reading: 'ga',
      meaning: 'Penanda subjek',
      function: 'Menandai subjek kalimat yang melakukan tindakan atau memiliki sifat tertentu.',
      pattern: '[Subjek] が [Predikat]',
      example: 'あめ が ふります。',
      translation: 'Hujan turun.',
      commonMistake: 'Sering tertukar dengan partikel は (wa). は untuk penanda topik umum, sedangkan が untuk subjek spesifik atau informasi baru.',
    },
    {
      particle: 'で',
      reading: 'de',
      meaning: 'Penanda tempat aktivitas / sarana',
      function: 'Menandai tempat terjadinya suatu kegiatan aksi atau sarana/alat/metode yang digunakan.',
      pattern: '[Tempat/Alat] で [Kata Kerja]',
      example: 'としょかん で べんきょうします。',
      translation: 'Belajar di perpustakaan.',
      commonMistake: 'Tertukar dengan partikel に (ni). Untuk tempat aktivitas gunakan で, untuk tempat keberadaan/tujuan gunakan に.',
    },
    {
      particle: 'に',
      reading: 'ni',
      meaning: 'Penanda waktu / tujuan / keberadaan',
      function: 'Menandai waktu spesifik kegiatan, tujuan perpindahan, atau tempat keberadaan suatu benda/orang.',
      pattern: '[Waktu/Tempat] に [Kata Kerja]',
      example: '７じ に おきます。',
      translation: 'Bangun pada jam 7.',
      commonMistake: 'Dipakai pada penanda waktu relatif seperti "besok (あした)" atau "setiap hari (まいにち)" yang seharusnya tidak memakai に.',
    },
    {
      particle: 'の',
      reading: 'no',
      meaning: 'Penanda kepemilikan / hubungan antar kata benda',
      function: 'Menghubungkan dua kata benda untuk menunjukkan kepemilikan, afiliasi, atau modifikasi.',
      pattern: '[Kata Benda 1] の [Kata Benda 2]',
      example: 'わたし の ほんです。',
      translation: 'Buku milik saya.',
      commonMistake: 'Urutan terbalik (meletakkan kata benda pemilik setelah kata bendanya).',
    },
    {
      particle: 'と',
      reading: 'to',
      meaning: 'Dan / Bersama (rekan)',
      function: 'Menghubungkan daftar kata benda secara sejajar atau menandai rekan saat melakukan aktivitas.',
      pattern: '[KB 1] と [KB 2] / [Rekan] と [Kata Kerja]',
      example: 'ともだち と えいが を みます。',
      translation: 'Menonton film bersama teman.',
      commonMistake: 'Menggunakan と untuk menyambung antarkalimat (と hanya dapat menghubungkan kata benda).',
    },
  ]

  const existingParticles = await prisma.particle.findMany({ select: { particle: true } })
  const existingParticleNames = new Set(existingParticles.map(p => p.particle))
  const newParticles = particleData.filter(p => !existingParticleNames.has(p.particle))

  if (newParticles.length > 0) {
    await prisma.particle.createMany({
      data: newParticles.map(p => ({ ...p, lessonId: lesson.id })),
    })
    console.log(`✅ Partikel ditambahkan: ${newParticles.length} partikel baru (Total sekarang: ${existingParticles.length + newParticles.length})`)
  } else {
    console.log(`ℹ️ Partikel sudah ada (${existingParticles.length} partikel).`)
  }

  // 7. Data Pola Tata Bahasa (5 pola dasar Bab 1)
  const grammarData = [
    {
      pattern: '～です',
      meaning: 'Adalah / Merupakan (penegas sopan)',
      usage: 'Diletakkan di akhir predikat kata benda atau kata sifat untuk menyatakan penegasan secara sopan (desu).',
      example: 'わたしは たなかです。',
      translation: 'Saya adalah Tanaka.',
      note: 'Merupakan bentuk sopan dari penegas "da" (だ). Pengucapan su di akhir biasanya diringkas (des).',
    },
    {
      pattern: '～じゃありません',
      meaning: 'Bukan / Tidak (negatif sopan)',
      usage: 'Bentuk negatif sopan dari です untuk predikat kata benda dalam percakapan sehari-hari.',
      example: 'わたしは がくせいじゃありません。',
      translation: 'Saya bukan pelajar.',
      note: 'Dalam situasi formal atau tulisan resmi, sering digunakan bentuk ～ではありません (dewa arimasen).',
    },
    {
      pattern: '～ですか',
      meaning: 'Apakah...? (kalimat tanya sopan)',
      usage: 'Partikel tanya か diletakkan di akhir kalimat untuk mengubah pernyataan menjadi pertanyaan sopan tanpa membalik susunan kata.',
      example: 'あなたは せんせいですか。',
      translation: 'Apakah Anda seorang guru?',
      note: 'Diucapkan dengan intonasi naik di akhir kalimat. Dalam teks Jepang formal tanda tanya (?) jarang dipakai, cukup tanda titik (。).',
    },
    {
      pattern: '～の～',
      meaning: 'Kepemilikan / Keterangan (KB1 menerangkan KB2)',
      usage: 'Menghubungkan dua kata benda. KB1 memodifikasi, menjelaskan, atau memiliki KB2.',
      example: 'これは わたし の ほんです。',
      translation: 'Ini adalah buku saya.',
      note: 'Bisa menyatakan pemilik (milik saya), asal institusi (mahasiswa universitas X), atau topik buku.',
    },
    {
      pattern: '～も～です',
      meaning: 'Juga / Pun',
      usage: 'Menggantikan partikel topik は ketika predikat atau kondisinya sama dengan subjek sebelumnya.',
      example: 'サントスさんも かいしゃいんです。',
      translation: 'Tuan Santos juga seorang karyawan.',
      note: 'Partikel も sepenuhnya menggantikan partikel は, tidak boleh digabungkan menjadi "はも" atau sebaliknya.',
    },
  ]

  const existingGrammar = await prisma.grammar.findMany({ select: { pattern: true } })
  const existingGrammarPatterns = new Set(existingGrammar.map(g => g.pattern))
  const newGrammar = grammarData.filter(g => !existingGrammarPatterns.has(g.pattern))

  if (newGrammar.length > 0) {
    await prisma.grammar.createMany({
      data: newGrammar.map(g => ({ ...g, lessonId: lesson.id })),
    })
    console.log(`✅ Tata Bahasa ditambahkan: ${newGrammar.length} pola baru (Total sekarang: ${existingGrammar.length + newGrammar.length})`)
  } else {
    console.log(`ℹ️ Tata Bahasa sudah ada (${existingGrammar.length} pola).`)
  }

  console.log('\n🎉 Seed expansion selesai dengan sukses!')
}

main()
  .catch((e) => {
    console.error('❌ Terjadi kesalahan saat seed expansion:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
