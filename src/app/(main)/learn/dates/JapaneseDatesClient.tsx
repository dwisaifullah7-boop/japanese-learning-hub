'use client'

import { useState } from 'react'
import { AudioButton } from '@/components/shared/AudioButton'
import { Calendar, Sparkles, Clock, Info, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DayItem {
  day: number
  kanji: string
  kana: string
  romaji: string
  isIrregular: boolean
  note?: string
}

interface MonthItem {
  month: number
  kanji: string
  kana: string
  romaji: string
  isSpecialReading: boolean
}

const DAYS_OF_MONTH: DayItem[] = [
  { day: 1, kanji: '1日', kana: 'ついたち', romaji: 'tsuitachi', isIrregular: true, note: 'Bentuk khusus, bukan *ichinichi' },
  { day: 2, kanji: '2日', kana: 'ふつか', romaji: 'futsuka', isIrregular: true },
  { day: 3, kanji: '3日', kana: 'みっか', romaji: 'mikka', isIrregular: true },
  { day: 4, kanji: '4日', kana: 'よっか', romaji: 'yokka', isIrregular: true, note: 'Konsonan ganda (kk)' },
  { day: 5, kanji: '5日', kana: 'いつか', romaji: 'itsuka', isIrregular: true },
  { day: 6, kanji: '6日', kana: 'むいか', romaji: 'muika', isIrregular: true },
  { day: 7, kanji: '7日', kana: 'なのか', romaji: 'nanoka', isIrregular: true },
  { day: 8, kanji: '8日', kana: 'ようか', romaji: 'youka', isIrregular: true, note: 'Vokal panjang (ou)' },
  { day: 9, kanji: '9日', kana: 'ここのか', romaji: 'kokonoka', isIrregular: true },
  { day: 10, kanji: '10日', kana: 'とおか', romaji: 'tooka', isIrregular: true, note: 'Vokal panjang (oo)' },
  { day: 11, kanji: '11日', kana: 'じゅういちにち', romaji: 'juuichinichi', isIrregular: false },
  { day: 12, kanji: '12日', kana: 'じゅうににち', romaji: 'juuninichi', isIrregular: false },
  { day: 13, kanji: '13日', kana: 'じゅうさんにち', romaji: 'juusannichi', isIrregular: false },
  { day: 14, kanji: '14日', kana: 'じゅうよっか', romaji: 'juuyokka', isIrregular: true, note: 'Bentuk khusus 4日 (yokka)' },
  { day: 15, kanji: '15日', kana: 'じゅうごにち', romaji: 'juugonichi', isIrregular: false },
  { day: 16, kanji: '16日', kana: 'じゅうろくにち', romaji: 'juurokunichi', isIrregular: false },
  { day: 17, kanji: '17日', kana: 'じゅうしちにち', romaji: 'juushichinichi', isIrregular: false },
  { day: 18, kanji: '18日', kana: 'じゅうはちにち', romaji: 'juuhachinichi', isIrregular: false },
  { day: 19, kanji: '19日', kana: 'じゅうくにち', romaji: 'juukunichi', isIrregular: false },
  { day: 20, kanji: '20日', kana: 'はつか', romaji: 'hatsuka', isIrregular: true, note: 'Bentuk khusus, bukan *nijuunichi' },
  { day: 21, kanji: '21日', kana: 'にじゅういちにち', romaji: 'nijuuichinichi', isIrregular: false },
  { day: 22, kanji: '22日', kana: 'にじゅうににち', romaji: 'nijuuninichi', isIrregular: false },
  { day: 23, kanji: '23日', kana: 'にじゅうさんにち', romaji: 'nijuusannichi', isIrregular: false },
  { day: 24, kanji: '24日', kana: 'にじゅうよっか', romaji: 'nijuuyokka', isIrregular: true, note: 'Bentuk khusus 4日 (yokka)' },
  { day: 25, kanji: '25日', kana: 'にじゅうごにち', romaji: 'nijuugonichi', isIrregular: false },
  { day: 26, kanji: '26日', kana: 'にじゅうろくにち', romaji: 'nijuurokunichi', isIrregular: false },
  { day: 27, kanji: '27日', kana: 'にじゅうしちにち', romaji: 'nijuushichinichi', isIrregular: false },
  { day: 28, kanji: '28日', kana: 'にじゅうはちにち', romaji: 'nijuuhachinichi', isIrregular: false },
  { day: 29, kanji: '29日', kana: 'にじゅうくにち', romaji: 'nijuukunichi', isIrregular: false },
  { day: 30, kanji: '30日', kana: 'さんじゅうにち', romaji: 'sanjuunichi', isIrregular: false },
  { day: 31, kanji: '31日', kana: 'さんじゅういちにち', romaji: 'sanjuuichinichi', isIrregular: false },
]

const MONTHS: MonthItem[] = [
  { month: 1, kanji: '1月', kana: 'いちがつ', romaji: 'ichigatsu', isSpecialReading: false },
  { month: 2, kanji: '2月', kana: 'にがつ', romaji: 'nigatsu', isSpecialReading: false },
  { month: 3, kanji: '3月', kana: 'さんがつ', romaji: 'sangatsu', isSpecialReading: false },
  { month: 4, kanji: '4月', kana: 'しがつ', romaji: 'shigatsu', isSpecialReading: true }, // Not yongatsu
  { month: 5, kanji: '5月', kana: 'ごがつ', romaji: 'gogatsu', isSpecialReading: false },
  { month: 6, kanji: '6月', kana: 'ろくがつ', romaji: 'rokugatsu', isSpecialReading: false },
  { month: 7, kanji: '7月', kana: 'しちがつ', romaji: 'shichigatsu', isSpecialReading: true }, // Not nanagatsu
  { month: 8, kanji: '8月', kana: 'はちがつ', romaji: 'hachigatsu', isSpecialReading: false },
  { month: 9, kanji: '9月', kana: 'くがつ', romaji: 'kugatsu', isSpecialReading: true }, // Not kyuugatsu
  { month: 10, kanji: '10月', kana: 'じゅうがつ', romaji: 'juugatsu', isSpecialReading: false },
  { month: 11, kanji: '11月', kana: 'じゅういちがつ', romaji: 'juuichigatsu', isSpecialReading: false },
  { month: 12, kanji: '12月', kana: 'じゅうにがつ', romaji: 'juunigatsu', isSpecialReading: false },
]

export function JapaneseDatesClient() {
  const [selectedDay, setSelectedDay] = useState<DayItem>(DAYS_OF_MONTH[0])
  const [selectedMonth, setSelectedMonth] = useState<MonthItem>(MONTHS[0])
  const [activeTab, setActiveTab] = useState<'days' | 'months'>('days')

  const combinedDateKanji = `${selectedMonth.kanji}${selectedDay.kanji}`
  const combinedDateKana = `${selectedMonth.kana} ${selectedDay.kana}`
  const combinedDateRomaji = `${selectedMonth.romaji} ${selectedDay.romaji}`

  return (
    <div className="space-y-8">
      {/* Interactive Date Composer Live Preview */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" /> Simulator Penanggalan Jepang
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-4xl sm:text-6xl font-black font-japanese tracking-wider">
                {combinedDateKanji}
              </p>
              <p className="text-xl sm:text-2xl text-blue-300 font-japanese font-semibold mt-1">
                {combinedDateKana}
              </p>
              <p className="text-sm text-gray-400 font-sans mt-0.5">
                {combinedDateRomaji} (Tanggal {selectedDay.day} Bulan {selectedMonth.month})
              </p>
            </div>

            <div className="flex sm:flex-col items-center gap-3 shrink-0">
              <AudioButton audioUrl={`${selectedMonth.kana} ${selectedDay.kana}`} size="lg" />
              <span className="text-xs text-blue-200">Dengar Pengucapan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-gray-200 gap-4">
        <button
          onClick={() => setActiveTab('days')}
          className={`pb-3 font-bold text-sm border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'days'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Calendar className="w-4 h-4" /> Tanggal 1 〜 31 (日)
        </button>
        <button
          onClick={() => setActiveTab('months')}
          className={`pb-3 font-bold text-sm border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'months'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Clock className="w-4 h-4" /> Bulan 1 〜 12 (月)
        </button>
      </div>

      {/* Days Interactive Grid */}
      {activeTab === 'days' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">
              Pilih Tanggal (1 〜 31):
            </h3>
            <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-semibold">
              Kuning = Pola Khusus / Irregular (WAJIB Dihafal!)
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {DAYS_OF_MONTH.map(item => {
              const isSelected = selectedDay.day === item.day
              return (
                <button
                  key={item.day}
                  onClick={() => setSelectedDay(item)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-400 shadow-md scale-105'
                      : item.isIrregular
                      ? 'border-amber-200 bg-amber-50/60 hover:border-amber-400'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <span className="text-xl font-bold font-japanese text-gray-900">{item.kanji}</span>
                  <span className="text-xs font-bold text-blue-700 font-japanese leading-none">{item.kana}</span>
                  <span className="text-[10px] text-gray-500 leading-none">{item.romaji}</span>
                </button>
              )
            })}
          </div>

          {/* Selected Day Info Card */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold font-japanese text-gray-900">{selectedDay.kanji}</span>
                <span className="text-base font-bold text-blue-600 font-japanese">({selectedDay.kana})</span>
                {selectedDay.isIrregular && (
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    Irregular Reading
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600">
                Pelafalan Romaji: <strong className="text-gray-900">{selectedDay.romaji}</strong>.
                {selectedDay.note && ` Catatan: ${selectedDay.note}.`}
              </p>
            </div>
            <AudioButton audioUrl={selectedDay.kana} size="md" />
          </div>
        </div>
      )}

      {/* Months Interactive Grid */}
      {activeTab === 'months' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">
              Pilih Bulan (1 〜 12):
            </h3>
            <span className="text-xs bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full font-semibold">
              Merah = Pelafalan Khusus (4月, 7月, 9月)
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {MONTHS.map(item => {
              const isSelected = selectedMonth.month === item.month
              return (
                <button
                  key={item.month}
                  onClick={() => setSelectedMonth(item)}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-400 shadow-md scale-105'
                      : item.isSpecialReading
                      ? 'border-rose-200 bg-rose-50/60 hover:border-rose-400'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <span className="text-2xl font-bold font-japanese text-gray-900">{item.kanji}</span>
                  <span className="text-sm font-bold text-blue-700 font-japanese">{item.kana}</span>
                  <span className="text-xs text-gray-500">{item.romaji}</span>
                </button>
              )
            })}
          </div>

          {/* Selected Month Info Card */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold font-japanese text-gray-900">{selectedMonth.kanji}</span>
                <span className="text-base font-bold text-blue-600 font-japanese">({selectedMonth.kana})</span>
                {selectedMonth.isSpecialReading && (
                  <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                    Wajib Dihafal (Bukan *yon/*nana/*kyuu)
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600">
                Pelafalan Romaji: <strong className="text-gray-900">{selectedMonth.romaji}</strong>.
              </p>
            </div>
            <AudioButton audioUrl={selectedMonth.kana} size="md" />
          </div>
        </div>
      )}
    </div>
  )
}
