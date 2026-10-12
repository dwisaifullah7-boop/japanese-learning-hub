import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Memulai seed Bab 15 & Bab 16 Minna no Nihongo (Izin/Larangan & Rangkaian Kalimat/Deskripsi)...')

  // 1. Dapatkan Course
  let course = await prisma.course.findFirst()
  if (!course) {
    course = await prisma.course.create({
      data: { title: 'Minna no Nihongo 1', description: 'Buku pelajaran bahasa Jepang dasar untuk pemula.' },
    })
  }

  // 2. Buat Lesson Bab 15
  let lesson15 = await prisma.lesson.findFirst({ where: { title: 'Bab 15' } })
  if (!lesson15) {
    lesson15 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 15',
        description: 'Izin (～てもいいですか), Larangan (～てはいけません), dan Status/Kondisi Berkelanjutan (～ています: Menikah, Tinggal, Bekerja, Mengetahui).',
        order: 15,
      },
    })
    console.log('✅ Lesson Bab 15 dibuat:', lesson15.id)
  }

  // 3. Buat Lesson Bab 16
  let lesson16 = await prisma.lesson.findFirst({ where: { title: 'Bab 16' } })
  if (!lesson16) {
    lesson16 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 16',
        description: 'Urutan Aksi Berantai (～て、～て), Setelah Selesai (～てから), Penggabungan Kata Sifat (～くて / ～で), dan Deskripsi Karakteristik Fisik (～は～が).',
        order: 16,
      },
    })
    console.log('✅ Lesson Bab 16 dibuat:', lesson16.id)
  }

  // 4. Vocabulary Bab 15 (Permissions, Occupations, Status, Rules)
  const vocab15 = [
    { word: 'おきます', kanji: '置きます', kana: 'おきます', romaji: 'okimasu', meaning: 'Meletakkan / Menaruh', wordType: 'Verb' },
    { word: 'つくります', kanji: '作ります', kana: 'つくります', romaji: 'tsukurimasu', meaning: 'Membuat / Memproduksi', wordType: 'Verb' },
    { word: 'うります', kanji: '売ります', kana: 'うります', romaji: 'urimasu', meaning: 'Menjual', wordType: 'Verb' },
    { word: 'しります', kanji: '知ります', kana: 'しります', romaji: 'shirimasu', meaning: 'Mengetahui / Mengenal', wordType: 'Verb' },
    { word: 'すみます', kanji: '住みます', kana: 'すみます', romaji: 'sumimasu', meaning: 'Tinggal / Bermukim', wordType: 'Verb' },
    { word: 'けんきゅうします', kanji: '研究します', kana: 'けんきゅうします', romaji: 'kenkyuushimasu', meaning: 'Meneliti / Meriset', wordType: 'Verb' },
    { word: 'しっています', kanji: '知っています', kana: 'しっています', romaji: 'shitte imasu', meaning: 'Tahu / Kenal (bentuk status)', wordType: 'Verb' },
    { word: 'しりません', kanji: '知りません', kana: 'しりません', romaji: 'shirimasen', meaning: 'Tidak tahu / Tidak kenal', wordType: 'Verb' },
    { word: 'すんでいます', kanji: '住んでいます', kana: 'すんでいます', romaji: 'sunde imasu', meaning: 'Sedang tinggal (di kota/negara)', wordType: 'Verb' },
    { word: 'しりょう', kanji: '資料', kana: 'しりょう', romaji: 'shiryou', meaning: 'Dokumen / Data materi', wordType: 'Noun' },
    { word: 'カタログ', kana: 'カタログ', romaji: 'katarogu', meaning: 'Katalog', wordType: 'Noun' },
    { word: 'じこくひょう', kanji: '時刻表', kana: 'じこくひょう', romaji: 'jikokuhyou', meaning: 'Jadwal keberangkatan', wordType: 'Noun' },
    { word: 'ふく', kanji: '服', kana: 'ふく', romaji: 'fuku', meaning: 'Pakaian / Baju', wordType: 'Noun' },
    { word: 'せいひん', kanji: '製品', kana: 'せいひん', romaji: 'seihin', meaning: 'Produk buatan pabrik', wordType: 'Noun' },
    { word: 'ソフト', kana: 'ソフト', romaji: 'sofuto', meaning: 'Perangkat lunak (software)', wordType: 'Noun' },
    { word: 'せんもん', kanji: '専門', kana: 'せんもん', romaji: 'senmon', meaning: 'Keahlian khusus / Spesialisasi', wordType: 'Noun' },
    { word: 'はいしゃ', kanji: '歯医者', kana: 'はいしゃ', romaji: 'haisha', meaning: 'Dokter gigi', wordType: 'Noun' },
    { word: 'とこや', kanji: '床屋', kana: 'とこや', romaji: 'tokoya', meaning: 'Pangkas rambut pria (barbershop)', wordType: 'Noun' },
    { word: 'プレイガイド', kana: 'プレイガイド', romaji: 'pureigaido', meaning: 'Loket tiket pertunjukan', wordType: 'Noun' },
    { word: '独身', kanji: '独身', kana: 'どくしん', romaji: 'dokushin', meaning: 'Lajang / Belum menikah', wordType: 'Noun' },
    { word: 'とくに', kanji: '特に', kana: 'とくに', romaji: 'tokuni', meaning: 'Khususnya / Terutama', wordType: 'Adverb' },
    { word: 'おもいだします', kanji: '思い出します', kana: 'おもいだします', romaji: 'omoidashimasu', meaning: 'Teringat kembali', wordType: 'Verb' },
    { word: 'いらっしゃいます', kana: 'いらっしゃいます', romaji: 'irasshaimasu', meaning: 'Ada (bahasa hormat dari imasu)', wordType: 'Verb' },
    { word: '高校', kanji: '高校', kana: 'こうこう', romaji: 'koukou', meaning: 'Sekolah Menengah Atas (SMA)', wordType: 'Noun' },
  ]

  // 5. Vocabulary Bab 16 (Transitions, Sequences, Body Parts, Attributes)
  const vocab16 = [
    { word: 'のります', kanji: '乗ります', kana: 'のります', romaji: 'norimasu', meaning: 'Naik (kereta/bus/kendaraan)', wordType: 'Verb' },
    { word: 'おります', kanji: '降ります', kana: 'おります', romaji: 'orimasu', meaning: 'Turun (dari kereta/bus)', wordType: 'Verb' },
    { word: 'のりかえます', kanji: '乗り換えます', kana: 'のりかえます', romaji: 'norikaemasu', meaning: 'Pindah / Transit kendaraan', wordType: 'Verb' },
    { word: 'あびます', kanji: '浴びます', kana: 'あびます', romaji: 'abimasu', meaning: 'Mandi guyur (shower)', wordType: 'Verb' },
    { word: 'いれます', kanji: '入れます', kana: 'いれます', romaji: 'iremasu', meaning: 'Memasukkan', wordType: 'Verb' },
    { word: 'おろします', kanji: '下ろします', kana: 'おろします', romaji: 'oroshimasu', meaning: 'Menarik (uang dari bank/ATM)', wordType: 'Verb' },
    { word: 'おします', kanji: '押します', kana: 'おします', romaji: 'oshimasu', meaning: 'Menekan / Mendorong (tombol)', wordType: 'Verb' },
    { word: 'わかい', kanji: '若い', kana: 'わかい', romaji: 'wakai', meaning: 'Muda', wordType: 'i-adjective' },
    { word: 'ながい', kanji: '長い', kana: 'ながい', romaji: 'nagai', meaning: 'Panjang', wordType: 'i-adjective' },
    { word: 'みじかい', kanji: '短い', kana: 'みじかい', romaji: 'mijikai', meaning: 'Pendek', wordType: 'i-adjective' },
    { word: 'あかるい', kanji: '明るい', kana: 'あかるい', romaji: 'akarui', meaning: 'Terang / Ceria', wordType: 'i-adjective' },
    { word: 'くらい', kanji: '暗い', kana: 'くらい', romaji: 'kurai', meaning: 'Gelap / Murung', wordType: 'i-adjective' },
    { word: 'せがたかい', kanji: '背が高い', kana: 'せがたかい', romaji: 'se ga takai', meaning: 'Tinggi badannya', wordType: 'Expression' },
    { word: 'あたまがいい', kanji: '頭がいい', kana: 'あたまがいい', romaji: 'atama ga ii', meaning: 'Pintar / Cerdas', wordType: 'Expression' },
    { word: 'からだ', kanji: '体', kana: 'からだ', romaji: 'karada', meaning: 'Tubuh / Badan', wordType: 'Noun' },
    { word: 'あたま', kanji: '頭', kana: 'あたま', romaji: 'atama', meaning: 'Kepala', wordType: 'Noun' },
    { word: 'かお', kanji: '顔', kana: 'かお', romaji: 'kao', meaning: 'Wajah', wordType: 'Noun' },
    { word: 'め', kanji: '目', kana: 'め', romaji: 'me', meaning: 'Mata', wordType: 'Noun' },
    { word: 'みみ', kanji: '耳', kana: 'みみ', romaji: 'mimi', meaning: 'Telinga', wordType: 'Noun' },
    { word: 'くち', kanji: '口', kana: 'くち', romaji: 'kuchi', meaning: 'Mulut', wordType: 'Noun' },
    { word: 'は', kanji: '歯', kana: 'は', romaji: 'ha', meaning: 'Gigi', wordType: 'Noun' },
    { word: 'おなか', kana: 'おなか', romaji: 'onaka', meaning: 'Perut', wordType: 'Noun' },
    { word: 'あし', kanji: '足', kana: 'あし', romaji: 'ashi', meaning: 'Kaki', wordType: 'Noun' },
    { word: 'みどり', kanji: '緑', kana: 'みどり', romaji: 'midori', meaning: 'Warna hijau / Penghijauan', wordType: 'Noun' },
    { word: 'おてら', kanji: 'お寺', kana: 'おてら', romaji: 'otera', meaning: 'Kuil Buddha', wordType: 'Noun' },
    { word: 'じんじゃ', kanji: '神社', kana: 'じんじゃ', romaji: 'jinja', meaning: 'Kuil Shinto', wordType: 'Noun' },
    { word: 'どうやって', kana: 'どうやって', romaji: 'douyatte', meaning: 'Bagaimana caranya / Dengan cara apa', wordType: 'Adverb' },
    { word: 'どの～', kana: 'どの～', romaji: 'dono~', meaning: 'Yang mana (diikuti kata benda)', wordType: 'Pronoun' },
  ]

  const existVocab = await prisma.vocabulary.findMany({ select: { word: true } })
  const existVocabSet = new Set(existVocab.map((v) => v.word))

  const newVocab15 = vocab15.filter((v) => !existVocabSet.has(v.word)).map((v) => ({ ...v, lessonId: lesson15.id }))
  if (newVocab15.length > 0) {
    await prisma.vocabulary.createMany({ data: newVocab15 })
    console.log(`✅ Vocab Bab 15 ditambahkan: ${newVocab15.length}`)
  }

  const newVocab16 = vocab16.filter((v) => !existVocabSet.has(v.word)).map((v) => ({ ...v, lessonId: lesson16.id }))
  if (newVocab16.length > 0) {
    await prisma.vocabulary.createMany({ data: newVocab16 })
    console.log(`✅ Vocab Bab 16 ditambahkan: ${newVocab16.length}`)
  }

  // 6. Grammar Bab 15 (Izin, Larangan, Status Hasil Aksi)
  const grammar15 = [
    {
      pattern: 'Kata Kerja て + もいいですか',
      meaning: 'Bolehkah saya [Lakukan aksi]? (Meminta izin)',
      usage: 'Digunakan oleh pembicara untuk meminta izin melakukan suatu tindakan kepada lawan bicara. Jawabannya: ええ、いいですよ (Boleh) atau すみません、ちょっと... (Maaf, tidak boleh).',
      example: 'しゃしんを とっても いいですか。…ええ、いいですよ。',
      translation: 'Bolehkah saya mengambil foto? ...Ya, boleh.',
      note: 'Bentuk kasual: ～てもいい？',
      lessonId: lesson15.id,
    },
    {
      pattern: 'Kata Kerja て + はいけません',
      meaning: 'Tidak boleh / Dilarang [Lakukan aksi]',
      usage: 'Menyatakan larangan keras berdasarkan aturan hukum, tempat, atau instruksi guru/orang tua.',
      example: 'ここで たばこを すっては いけません。',
      translation: 'Dilarang merokok di sini.',
      note: 'Jawaban penolakan atas ～てもいいですか bisa menggunakan pola ini jika berupa aturan resmi.',
      lessonId: lesson15.id,
    },
    {
      pattern: 'Kata Kerja て + います (Status / Keadaan Hasil Aksi)',
      meaning: 'Menyatakan kondisi/status yang masih berlangsung akibat tindakan di masa lalu',
      usage: 'Berbeda dengan Bab 14 (sedang beraksi), di Bab 15 ～ています menyatakan keadaan tetap: Menikah (けっこんしています), Tinggal (すんでいます), Mengetahui (しっています), Membawa/Memiliki (もっています).',
      example: 'わたしは とうきょうに すんでいます。たなかさんを しっていますか。…いいえ、しりません。',
      translation: 'Saya tinggal di Tokyo. Apakah Anda mengenal Sdr. Tanaka? ...Tidak, saya tidak tahu/kenal.',
      note: 'PENTING: Negatif dari しっています adalah しりません (bukan しっていません).',
      lessonId: lesson15.id,
    },
    {
      pattern: '[Tempat / Toko] で [Barang] を うっています',
      meaning: 'Di [Tempat] menjual [Barang] (Keadaan bisnis/kegiatan rutin toko)',
      usage: 'Menyatakan barang apa yang diperdagangkan atau diproduksi oleh suatu toko/perusahaan.',
      example: 'あの みせで ふるい ほんを うっています。',
      translation: 'Toko itu menjual buku-buku bekas.',
      note: 'Partikel で penanda tempat diadakannya kegiatan bisnis.',
      lessonId: lesson15.id,
    },
  ]

  // 7. Grammar Bab 16 (Rangkaian Aksi, Te-kara, Penggabungan Sifat, Deskripsi Sub-Atribut)
  const grammar16 = [
    {
      pattern: 'KK1 て、KK2 て、... KK (Akhir)',
      meaning: 'Melakukan aksi 1, lalu aksi 2, lalu...',
      usage: 'Menghubungkan dua atau lebih kata kerja secara kronologis berurutan waktu. Bentuk tenses (lampau/bukan) ditentukan oleh kata kerja paling akhir.',
      example: 'あさ おきて、シャワーを あびて、かいしゃへ いきます。きのうは えいがを みて、おちゃを のみました。',
      translation: 'Pagi hari bangun tidur, mandi shower, lalu pergi ke kantor. Kemarin menonton film, lalu minum teh.',
      note: 'Urutan kejadian harus sesuai kronologi waktu sesungguhnya.',
      lessonId: lesson16.id,
    },
    {
      pattern: 'KK1 て + から、KK2',
      meaning: 'Setelah [Aksi 1] selesai, baru melakukan [Aksi 2]',
      usage: 'Menekankan bahwa aksi kedua baru bisa dan mutlak dimulai setelah aksi pertama tuntas.',
      example: 'くにへ かえってから、ちちの かいしゃで はたらきます。',
      translation: 'Setelah pulang ke negara asal, saya akan bekerja di perusahaan ayah saya.',
      note: 'KK1 tidak boleh diganti bentuk lampau (*かえったから salah konteks di sini).',
      lessonId: lesson16.id,
    },
    {
      pattern: 'Kata Sifat-i (～くて) / Kata Sifat-na & KB (～で) + Sambungan',
      meaning: 'Menggabungkan dua kata sifat/keadaan setara ("dan")',
      usage: 'I-adj: い dilepas diganti くて. Na-adj & KB: diganti で. Hanya untuk sifat yang searah (positif & positif, atau negatif & negatif).',
      example: 'ミラーさんは わかくて、げんきです。この へやは ひろくて、あかるいです。奈良は しずかで、きれいな まちです。',
      translation: 'Sdr. Miller muda dan bersemangat. Kamar ini luas dan terang. Nara adalah kota yang tenang dan cantik.',
      note: 'Untuk sifat bertolak belakang gunakan が (contoh: せまいですが、きれいです).',
      lessonId: lesson16.id,
    },
    {
      pattern: 'KB1 は KB2 が [Kata Sifat] です',
      meaning: 'Mengenai KB1, bagian KB2-nya itu [Sifat]',
      usage: 'KB1 adalah topik keseluruhan (orang/tempat), sedangkan KB2 adalah bagian tubuh atau atribut spesifiknya.',
      example: 'マリアさんは めが おおきいです。サントスさんは せが たかいです。にほんは たべものが たかいです。',
      translation: 'Maria matanya besar. Santos badannya tinggi. Jepang makanannya mahal.',
      note: 'Partikel は menunjuk subjek payung, partikel が menunjuk atribut yang dinilai.',
      lessonId: lesson16.id,
    },
    {
      pattern: 'どうやって [Tempat] へ 行きますか',
      meaning: 'Bagaimana cara / rute pergi ke [Tempat]?',
      usage: 'Menanyakan rute perjalanan atau langkah operasional transit kendaraan.',
      example: 'きょうとまで どうやって いきますか。…とうきょうえきから しんかんせんに のります。',
      translation: 'Bagaimana cara pergi sampai Kyoto? ...Naik Shinkansen dari Stasiun Tokyo.',
      note: 'Jawaban biasanya menggunakan rangkaian aksi KK て、... て.',
      lessonId: lesson16.id,
    },
  ]

  const existGrammar = await prisma.grammar.findMany({ select: { pattern: true } })
  const existGrammarSet = new Set(existGrammar.map((g) => g.pattern))

  const newGrammar15 = grammar15.filter((g) => !existGrammarSet.has(g.pattern))
  if (newGrammar15.length > 0) {
    await prisma.grammar.createMany({ data: newGrammar15 })
    console.log(`✅ Grammar Bab 15 ditambahkan: ${newGrammar15.length}`)
  }

  const newGrammar16 = grammar16.filter((g) => !existGrammarSet.has(g.pattern))
  if (newGrammar16.length > 0) {
    await prisma.grammar.createMany({ data: newGrammar16 })
    console.log(`✅ Grammar Bab 16 ditambahkan: ${newGrammar16.length}`)
  }

  // 8. Kanji Bab 15 & 16
  const kanji15And16 = [
    // Bab 15 (6 Kanji)
    { character: '置', hiragana: 'お・く / ち', romaji: 'o-ku / chi', meaning: 'Meletakkan, Menaruh', onyomi: 'チ (chi)', kunyomi: 'お・く (o-ku)', jlptLevel: 'N4', lessonId: lesson15.id },
    { character: '作', hiragana: 'つく・る / さく', romaji: 'tsuku-ru / saku', meaning: 'Membuat, Karya', onyomi: 'サク, サ (saku, sa)', kunyomi: 'つく・る (tsuku-ru)', jlptLevel: 'N5', lessonId: lesson15.id },
    { character: '売', hiragana: 'う・る / ばい', romaji: 'u-ru / bai', meaning: 'Menjual', onyomi: 'バイ (bai)', kunyomi: 'う・る, う・れる (u-ru, u-reru)', jlptLevel: 'N5', lessonId: lesson15.id },
    { character: '知', hiragana: 'し・る / ち', romaji: 'shi-ru / chi', meaning: 'Tahu, Mengetahui, Akal', onyomi: 'チ (chi)', kunyomi: 'し・る, し・らせる (shi-ru, shi-raseru)', jlptLevel: 'N5', lessonId: lesson15.id },
    { character: '住', hiragana: 'す・む / じゅう', romaji: 'su-mu / juu', meaning: 'Tinggal, Bermukim', onyomi: 'ジュウ (juu)', kunyomi: 'す・む, す・まう (su-mu, su-mau)', jlptLevel: 'N5', lessonId: lesson15.id },
    { character: '服', hiragana: 'ふく', romaji: 'fuku', meaning: 'Pakaian, Baju', onyomi: 'フク (fuku)', kunyomi: '-', jlptLevel: 'N4', lessonId: lesson15.id },

    // Bab 16 (8 Kanji)
    { character: '乗', hiragana: 'の・る / じょう', romaji: 'no-ru / jou', meaning: 'Naik (kendaraan)', onyomi: 'ジョウ (jou)', kunyomi: 'の・る, の・せる (no-ru, no-seru)', jlptLevel: 'N4', lessonId: lesson16.id },
    { character: '体', hiragana: 'からだ / たい', romaji: 'karada / tai', meaning: 'Tubuh, Badan', onyomi: 'タイ, テイ (tai, tei)', kunyomi: 'からだ (karada)', jlptLevel: 'N5', lessonId: lesson16.id },
    { character: '頭', hiragana: 'あたま / とう', romaji: 'atama / tou', meaning: 'Kepala', onyomi: 'トウ, ズ (tou, zu)', kunyomi: 'あたま, かしら (atama, kashira)', jlptLevel: 'N4', lessonId: lesson16.id },
    { character: '顔', hiragana: 'かお / がん', romaji: 'kao / gan', meaning: 'Wajah, Muka', onyomi: 'ガン (gan)', kunyomi: 'かお (kao)', jlptLevel: 'N4', lessonId: lesson16.id },
    { character: '目', hiragana: 'め / もく', romaji: 'me / moku', meaning: 'Mata', onyomi: 'モク, ボク (moku, boku)', kunyomi: 'め, ま (me, ma)', jlptLevel: 'N5', lessonId: lesson16.id },
    { character: '耳', hiragana: 'みみ / じ', romaji: 'mimi / ji', meaning: 'Telinga', onyomi: 'ジ (ji)', kunyomi: 'みみ (mimi)', jlptLevel: 'N5', lessonId: lesson16.id },
    { character: '口', hiragana: 'くち / こう', romaji: 'kuchi / kou', meaning: 'Mulut', onyomi: 'コウ, ク (kou, ku)', kunyomi: 'くち (kuchi)', jlptLevel: 'N5', lessonId: lesson16.id },
    { character: '足', hiragana: 'あし / そく', romaji: 'ashi / soku', meaning: 'Kaki, Cukup', onyomi: 'ソク (soku)', kunyomi: 'あし, た・りる (ashi, ta-riru)', jlptLevel: 'N5', lessonId: lesson16.id },
  ]

  const existKanji = await prisma.kanji.findMany({ select: { character: true } })
  const existKanjiSet = new Set(existKanji.map((k) => k.character))

  const newKanji = kanji15And16.filter((k) => !existKanjiSet.has(k.character))
  if (newKanji.length > 0) {
    await prisma.kanji.createMany({ data: newKanji })
    console.log(`✅ Kanji Bab 15 & 16 ditambahkan: ${newKanji.length} karakter`)
  }

  console.log('\n🎉 Seed Bab 15 & Bab 16 selesai dengan sukses!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding Bab 15 & 16:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
