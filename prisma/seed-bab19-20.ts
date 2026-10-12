import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Memulai seed Bab 19 & Bab 20 Minna no Nihongo (Bentuk Ta, Pengalaman & Bentuk Biasa/Kasual)...')

  // 1. Dapatkan Course
  let course = await prisma.course.findFirst()
  if (!course) {
    course = await prisma.course.create({
      data: { title: 'Minna no Nihongo 1', description: 'Buku pelajaran bahasa Jepang dasar untuk pemula.' },
    })
  }

  // 2. Buat Lesson Bab 19
  let lesson19 = await prisma.lesson.findFirst({ where: { title: 'Bab 19' } })
  if (!lesson19) {
    lesson19 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 19',
        description: 'Kata Kerja Bentuk-Ta (た形), Pengalaman Pernah (～たことが あります), Perwakilan Tindakan (～たり、～たり します), dan Perubahan Kondisi (～くなります / ～になります).',
        order: 19,
      },
    })
    console.log('✅ Lesson Bab 19 dibuat:', lesson19.id)
  }

  // 3. Buat Lesson Bab 20
  let lesson20 = await prisma.lesson.findFirst({ where: { title: 'Bab 20' } })
  if (!lesson20) {
    lesson20 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 20',
        description: 'Bentuk Biasa / Kasual (普通形 - Futsūkei), Percakapan Santai Teman & Keluarga, Perubahan Kopula (だ / だった / じゃない), dan Penghilangan Partikel.',
        order: 20,
      },
    })
    console.log('✅ Lesson Bab 20 dibuat:', lesson20.id)
  }

  // 4. Vocabulary Bab 19 (Ta-form, Climbing, Cleaning, Changes)
  const vocab19 = [
    { word: 'のぼります', kanji: '登ります', kana: 'のぼります', romaji: 'noborimasu', meaning: 'Mendaki / Memanjat (gunung)', wordType: 'Verb' },
    { word: 'とまります', kanji: '泊まります', kana: 'とまります', romaji: 'tomarimasu', meaning: 'Menginap (di hotel/ryokan)', wordType: 'Verb' },
    { word: 'そうじします', kanji: '掃除します', kana: 'そうじします', romaji: 'soujishimasu', meaning: 'Membersihkan (kamar/rumah)', wordType: 'Verb' },
    { word: 'せんたくします', kanji: '洗濯します', kana: 'せんたくします', romaji: 'sentakushimasu', meaning: 'Mencuci baju', wordType: 'Verb' },
    { word: 'れんしゅうします', kanji: '練習します', kana: 'れんしゅうします', romaji: 'renshuushimasu', meaning: 'Berlatih / Latihan', wordType: 'Verb' },
    { word: 'なります', kana: 'なります', romaji: 'narimasu', meaning: 'Menjadi / Berubah kondisi', wordType: 'Verb' },
    { word: 'ねむい', kanji: '眠い', kana: 'ねむい', romaji: 'nemui', meaning: 'Mengantuk', wordType: 'i-adjective' },
    { word: 'つよい', kanji: '強い', kana: 'つよい', romaji: 'tsuyoi', meaning: 'Kuat', wordType: 'i-adjective' },
    { word: 'よわい', kanji: '弱い', kana: 'よわい', romaji: 'yowai', meaning: 'Lemah', wordType: 'i-adjective' },
    { word: 'ちょうし', kanji: '調子', kana: 'ちょうし', romaji: 'choushi', meaning: 'Kondisi kesehatan / Performa mesin', wordType: 'Noun' },
    { word: 'ゴルフ', kana: 'ゴルフ', romaji: 'gorufu', meaning: 'Olahraga golf', wordType: 'Noun' },
    { word: 'すもう', kanji: '相撲', kana: 'すもう', romaji: 'sumou', meaning: 'Gulat sumo tradisional', wordType: 'Noun' },
    { word: 'おちゃ', kanji: 'お茶', kana: 'おちゃ', romaji: 'ocha', meaning: 'Upacara minum teh / Teh hijau', wordType: 'Noun' },
    { word: 'ひ', kanji: '日', kana: 'ひ', romaji: 'hi', meaning: 'Hari / Tanggal tertentu', wordType: 'Noun' },
    { word: 'いちど', kanji: '一度', kana: 'いちど', romaji: 'ichido', meaning: 'Satu kali (pernah)', wordType: 'Adverb' },
    { word: 'いちども', kanji: '一度も', kana: 'いちども', romaji: 'ichidomo', meaning: 'Satu kali pun (belum pernah + negatif)', wordType: 'Adverb' },
    { word: 'だんだん', kana: 'だんだん', romaji: 'dandan', meaning: 'Lambat laun / Sedikit demi sedikit', wordType: 'Adverb' },
    { word: 'もうすぐ', kana: 'もうすぐ', romaji: 'mousugu', meaning: 'Sebentar lagi / Segera', wordType: 'Adverb' },
    { word: 'おかげさまで', kana: 'おかげさまで', romaji: 'okagesamade', meaning: 'Berkat doa/bantuan Anda (kabar baik)', wordType: 'Expression' },
    { word: '乾杯', kanji: '乾杯', kana: 'かんぱい', romaji: 'kanpai', meaning: 'Bersulang! (Cheers)', wordType: 'Expression' },
  ]

  // 5. Vocabulary Bab 20 (Casual conversation words, Everyday colloquial)
  const vocab20 = [
    { word: 'いります', kanji: '要ります', kana: 'いります', romaji: 'irimasu', meaning: 'Memerlukan / Butuh', wordType: 'Verb' },
    { word: 'しらべます', kanji: '調べます', kana: 'しらべます', romaji: 'shirabemasu', meaning: 'Menyelidiki / Memeriksa / Mencari info', wordType: 'Verb' },
    { word: 'なおします', kanji: '直します', kana: 'なおします', romaji: 'naoshimasu', meaning: 'Memperbaiki / Membetulkan', wordType: 'Verb' },
    { word: 'しゅうりします', kanji: '修理します', kana: 'しゅうりします', romaji: 'shuurishimasu', meaning: 'Mereparasi / Menservis (mesin)', wordType: 'Verb' },
    { word: 'でんわします', kanji: '電話します', kana: 'でんわします', romaji: 'denwashimasu', meaning: 'Menelepon', wordType: 'Verb' },
    { word: 'ぼく', kanji: '僕', kana: 'ぼく', romaji: 'boku', meaning: 'Aku (pria kasual santai)', wordType: 'Pronoun' },
    { word: 'きみ', kanji: '君', kana: 'きみ', romaji: 'kimi', meaning: 'Kamu (santai/akrab)', wordType: 'Pronoun' },
    { word: '～くん', kanji: '～君', kana: '～くん', romaji: '~kun', meaning: 'Panggilan akrab teman sebaya/adik pria', wordType: 'Suffix' },
    { word: 'うん', kana: 'うん', romaji: 'un', meaning: 'Ya / Iya (kasual dari hai)', wordType: 'Interjection' },
    { word: 'ううん', kana: 'ううん', romaji: 'uun', meaning: 'Tidak / Bukan (kasual dari iie)', wordType: 'Interjection' },
    { word: 'サラリーマン', kana: 'サラリーマン', romaji: 'sarariiman', meaning: 'Karyawan kantor bergaji tetap', wordType: 'Noun' },
    { word: 'ことば', kanji: '言葉', kana: 'ことば', romaji: 'kotoba', meaning: 'Kata / Bahasa', wordType: 'Noun' },
    { word: 'ぶっか', kanji: '物価', kana: 'ぶっか', romaji: 'bukka', meaning: 'Harga barang kebutuhan hidup', wordType: 'Noun' },
    { word: 'きもの', kanji: '着物', kana: 'きもの', romaji: 'kimono', meaning: 'Baju tradisional kimono', wordType: 'Noun' },
    { word: 'ビザ', kana: 'ビザ', romaji: 'biza', meaning: 'Visa (izin tinggal kunjungan)', wordType: 'Noun' },
    { word: 'はじめ', kanji: '初め', kana: 'はじめ', romaji: 'hajime', meaning: 'Awal mula / Pertama-tama', wordType: 'Noun' },
    { word: 'おわり', kanji: '終わり', kana: 'おわり', romaji: 'owari', meaning: 'Akhir / Selesai', wordType: 'Noun' },
    { word: 'こっち', kana: 'こっち', romaji: 'kocchi', meaning: 'Sini / Sebelah sini (kasual dari kochira)', wordType: 'Pronoun' },
    { word: 'そっち', kana: 'そっち', romaji: 'socchi', meaning: 'Situ / Sebelah situ (kasual dari sochira)', wordType: 'Pronoun' },
    { word: 'あっち', kana: 'あっち', romaji: 'acchi', meaning: 'Sana / Sebelah sana (kasual dari achira)', wordType: 'Pronoun' },
    { word: 'どっち', kana: 'どっち', romaji: 'docchi', meaning: 'Mana / Yang mana (kasual dari dochira)', wordType: 'Pronoun' },
    { word: 'みんなで', kana: 'みんなで', romaji: 'minnade', meaning: 'Bersama-sama semuanya', wordType: 'Adverb' },
    { word: 'けど', kana: 'けど', romaji: 'kedo', meaning: 'Tetapi / Tapi (kasual dari ga)', wordType: 'Conjunction' },
  ]

  const existVocab = await prisma.vocabulary.findMany({ select: { word: true } })
  const existVocabSet = new Set(existVocab.map((v) => v.word))

  const newVocab19 = vocab19.filter((v) => !existVocabSet.has(v.word)).map((v) => ({ ...v, lessonId: lesson19.id }))
  if (newVocab19.length > 0) {
    await prisma.vocabulary.createMany({ data: newVocab19 })
    console.log(`✅ Vocab Bab 19 ditambahkan: ${newVocab19.length}`)
  }

  const newVocab20 = vocab20.filter((v) => !existVocabSet.has(v.word)).map((v) => ({ ...v, lessonId: lesson20.id }))
  if (newVocab20.length > 0) {
    await prisma.vocabulary.createMany({ data: newVocab20 })
    console.log(`✅ Vocab Bab 20 ditambahkan: ${newVocab20.length}`)
  }

  // 6. Grammar Bab 19 (Bentuk Ta, Pengalaman, Tari-Tari, Narimasu)
  const grammar19 = [
    {
      pattern: 'Kata Kerja Bentuk-Ta (た形) Konjugasi',
      meaning: 'Bentuk lampau informal (aturan sama persis dengan Bentuk-Te, ganti te ➔ ta, de ➔ da)',
      usage: 'Grup 1: かった (kau), まった (matsu), とった (toru), のんだ (nomu), かいた (kaku), いった (iku). Grup 2: たべた (taberu). Grup 3: した (suru), きた (kuru).',
      example: 'たべた (tabeta), いった (itta), のんだ (nonda), した (shita).',
      translation: 'Sudah makan, sudah pergi, sudah minum, sudah melakukan.',
      note: 'Fondasi penting untuk menyatakan pengalaman dan percakapan kasual.',
      lessonId: lesson19.id,
    },
    {
      pattern: 'Kata Kerja た + ことが あります / ありません',
      meaning: 'Pernah / Belum pernah [Mengalami suatu hal]',
      usage: 'Menyatakan riwayat atau pengalaman masa lampau sepanjang hidup pembicara.',
      example: 'ふじさんに のぼった ことが あります。うまに のった ことが ありません。',
      translation: 'Saya pernah mendaki Gunung Fuji. Belum pernah naik kuda.',
      note: 'Untuk belum pernah sama sekali gunakan: いちども ～たことがありません.',
      lessonId: lesson19.id,
    },
    {
      pattern: 'KK1 たり、KK2 たり します / しました',
      meaning: 'Melakukan kegiatan seperti [Aksi 1], [Aksi 2], dan sebagainya',
      usage: 'Menyebutkan beberapa contoh kegiatan perwakilan secara acak tanpa terikat kronologi waktu kaku.',
      example: 'にちようびは テニスを したり、えいがを みたり します。',
      translation: 'Hari Minggu saya bermain tenis, menonton film, dan lain sebagainya.',
      note: 'Bandingkan dengan Bab 16 (KK て、KK て) yang wajib berurutan urutan waktunya.',
      lessonId: lesson19.id,
    },
    {
      pattern: 'Kata Sifat-i (～く) / Kata Sifat-na & KB (～に) + なります',
      meaning: 'Menjadi / Berubah menjadi [Kondisi]',
      usage: 'Menyatakan perubahan status alami atau situasi seiring berjalannya waktu.',
      example: 'だんだん あたたかく なります。もうすぐ ２０さいに なります。げんきに なりました。',
      translation: 'Lambat laun menjadi hangat. Sebentar lagi menjadi berusia 20 tahun. Sudah menjadi sehat kembali.',
      note: 'I-adj: lepas い ganti く. Na-adj & KB: tambah に.',
      lessonId: lesson19.id,
    },
  ]

  // 7. Grammar Bab 20 (Futsūkei / Bentuk Biasa)
  const grammar20 = [
    {
      pattern: 'Bentuk Biasa / Kasual (普通形 - Futsūkei) Konjugasi',
      meaning: 'Tingkat kesopanan informal untuk berbicara dengan teman sebaya, keluarga, atau bawahan',
      usage: 'KK Positif: Jisho-kei (かく). KK Negatif: Nai-kei (かかない). KK Lampau: Ta-kei (かいた). KK Negatif Lampau: Nakatta-kei (かなかた). KB/Na-Adj: だ (positif), じゃない (negatif), だった (lampau), じゃなかった (negatif lampau).',
      example: 'いく (ikimasu), いかない (ikimasen), いった (ikimashita), いかなかった (ikimasendeshita).',
      translation: 'Pergi, tidak pergi, sudah pergi, tidak pergi (lampau).',
      note: 'Gunakan hanya dengan orang yang sudah akrab dan setara derajat sosialnya.',
      lessonId: lesson20.id,
    },
    {
      pattern: 'Percakapan Tanya Kasual (Intonasi Naik Tanpa か)',
      meaning: 'Menanyakan sesuatu secara santun kasual tanpa partikel か di akhir kalimat',
      usage: 'Cukup naikkan intonasi nada di suku kata terakhir. Jawab dengan うん (ya) atau ううん (tidak).',
      example: 'あした 東京へ 行く？ …うん、行く。/ …ううん、行かない。',
      translation: 'Besok kamu pergi ke Tokyo? ...Iya, pergi. / ...Nggak, nggak pergi.',
      note: 'Partikel penanda objek を atau subjek が sering dihilangkan jika maknanya sudah jelas dari konteks.',
      lessonId: lesson20.id,
    },
    {
      pattern: 'Bentuk Biasa + けど (Tetapi)',
      meaning: 'Padanan kasual dari が / ですが (tetapi / ngomong-ngomong)',
      usage: 'Menghubungkan klausa pertentangan atau pembuka kalimat secara santai.',
      example: '今 お金が ないけど、大丈夫？',
      translation: 'Sekarang aku nggak ada uang, nggak apa-apa nih?',
      note: 'Bisa digunakan di akhir kalimat untuk menggantungkan pernyataan secara halus.',
      lessonId: lesson20.id,
    },
  ]

  const existGrammar = await prisma.grammar.findMany({ select: { pattern: true } })
  const existGrammarSet = new Set(existGrammar.map((g) => g.pattern))

  const newGrammar19 = grammar19.filter((g) => !existGrammarSet.has(g.pattern))
  if (newGrammar19.length > 0) {
    await prisma.grammar.createMany({ data: newGrammar19 })
    console.log(`✅ Grammar Bab 19 ditambahkan: ${newGrammar19.length}`)
  }

  const newGrammar20 = grammar20.filter((g) => !existGrammarSet.has(g.pattern))
  if (newGrammar20.length > 0) {
    await prisma.grammar.createMany({ data: newGrammar20 })
    console.log(`✅ Grammar Bab 20 ditambahkan: ${newGrammar20.length}`)
  }

  // 8. Kanji Bab 19 & 20
  const kanji19And20 = [
    // Bab 19 (6 Kanji)
    { character: '登', hiragana: 'のぼ・る / とう', romaji: 'nobo-ru / tou', meaning: 'Mendaki, Memanjat', onyomi: 'トウ, ト (tou, to)', kunyomi: 'のぼ・る (nobo-ru)', jlptLevel: 'N4', lessonId: lesson19.id },
    { character: '泊', hiragana: 'と・まる / はく', romaji: 'to-maru / haku', meaning: 'Menginap', onyomi: 'ハク (haku)', kunyomi: 'と・まる, と・める (to-maru, to-meru)', jlptLevel: 'N4', lessonId: lesson19.id },
    { character: '掃', hiragana: 'は・く / そう', romaji: 'ha-ku / sou', meaning: 'Menyapu, Membersihkan', onyomi: 'ソウ (sou)', kunyomi: 'は・く (ha-ku)', jlptLevel: 'N3', lessonId: lesson19.id },
    { character: '除', hiragana: 'のぞ・く / じょ', romaji: 'nozo-ku / jo', meaning: 'Menghilangkan, Kecuali', onyomi: 'ジョ, ジ (jo, ji)', kunyomi: 'のぞ・く (nozo-ku)', jlptLevel: 'N3', lessonId: lesson19.id },
    { character: '練', hiragana: 'ね・る / れん', romaji: 'ne-ru / ren', meaning: 'Melatih, Menempa', onyomi: 'レン (ren)', kunyomi: 'ね・る (ne-ru)', jlptLevel: 'N4', lessonId: lesson19.id },
    { character: '習', hiragana: 'なら・う / しゅう', romaji: 'nara-u / shuu', meaning: 'Belajar, Membiasakan', onyomi: 'シュウ (shuu)', kunyomi: 'なら・う (nara-u)', jlptLevel: 'N5', lessonId: lesson19.id },

    // Bab 20 (8 Kanji)
    { character: '要', hiragana: 'い・る / よう', romaji: 'i-ru / you', meaning: 'Perlu, Penting, Pokok', onyomi: 'ヨウ (you)', kunyomi: 'い・る, かなめ (i-ru, kaname)', jlptLevel: 'N4', lessonId: lesson20.id },
    { character: '調', hiragana: 'しら・べる / ちょう', romaji: 'shira-beru / chou', meaning: 'Menyelidiki, Nada, Kondisi', onyomi: 'チョウ (chou)', kunyomi: 'しら・べる, ととの・う (shira-beru, totono-u)', jlptLevel: 'N4', lessonId: lesson20.id },
    { character: '直', hiragana: 'なお・す / ちょく', romaji: 'nao-su / choku', meaning: 'Lurus, Memperbaiki, Segera', onyomi: 'チョク, ジキ (choku, jiki)', kunyomi: 'なお・す, なお・る, ただ・ちに (nao-su, nao-ru, tada-chini)', jlptLevel: 'N4', lessonId: lesson20.id },
    { character: '修', hiragana: 'おさ・める / しゅう', romaji: 'osa-meru / shuu', meaning: 'Memperbaiki, Menuntut ilmu', onyomi: 'シュウ, シュ (shuu, shu)', kunyomi: 'おさ・める (osa-meru)', jlptLevel: 'N3', lessonId: lesson20.id },
    { character: '理', hiragana: 'ことわり / り', romaji: 'kotowari / ri', meaning: 'Alasan, Logika, Pengaturan', onyomi: 'リ (ri)', kunyomi: '-', jlptLevel: 'N4', lessonId: lesson20.id },
    { character: '僕', hiragana: 'ぼく', romaji: 'boku', meaning: 'Aku (laki-laki), Hamba', onyomi: 'ボク (boku)', kunyomi: '-', jlptLevel: 'N3', lessonId: lesson20.id },
    { character: '君', hiragana: 'きみ / くん', romaji: 'kimi / kun', meaning: 'Kamu, Penguasa, Tuan', onyomi: 'クン (kun)', kunyomi: 'きみ (kimi)', jlptLevel: 'N3', lessonId: lesson20.id },
    { character: '初', hiragana: 'はじ・め / しょ', romaji: 'haji-me / sho', meaning: 'Pertama, Awal', onyomi: 'ショ (sho)', kunyomi: 'はじ・め, はつ, うい (haji-me, hatsu, ui)', jlptLevel: 'N4', lessonId: lesson20.id },
  ]

  const existKanji = await prisma.kanji.findMany({ select: { character: true } })
  const existKanjiSet = new Set(existKanji.map((k) => k.character))

  const newKanji = kanji19And20.filter((k) => !existKanjiSet.has(k.character))
  if (newKanji.length > 0) {
    await prisma.kanji.createMany({ data: newKanji })
    console.log(`✅ Kanji Bab 19 & 20 ditambahkan: ${newKanji.length} karakter`)
  }

  console.log('\n🎉 Seed Bab 19 & Bab 20 selesai dengan sukses!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding Bab 19 & 20:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
