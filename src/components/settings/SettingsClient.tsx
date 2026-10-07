'use client'

import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Settings, Volume2, Palette, Sliders, RotateCcw, Check, Save } from 'lucide-react'

export interface UserSettings {
  voiceSpeed: number // 1.0 or 0.75
  autoPlayAudio: boolean
  soundEffects: boolean
  theme: 'default' | 'sakura' | 'forest' | 'dark'
  reducedMotion: boolean
  dailyGoal: number
  passingThreshold: number
}

const DEFAULT_SETTINGS: UserSettings = {
  voiceSpeed: 1.0,
  autoPlayAudio: true,
  soundEffects: true,
  theme: 'default',
  reducedMotion: false,
  dailyGoal: 10,
  passingThreshold: 70,
}

export function SettingsClient() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS)
  const [savedMessage, setSavedMessage] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const stored = localStorage.getItem('jh_user_settings')
    if (stored) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) })
      } catch (e) {
        console.error('Failed to parse stored settings:', e)
      }
    }
  }, [])

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    const updated = { ...settings, [key]: value }
    setSettings(updated)
    localStorage.setItem('jh_user_settings', JSON.stringify(updated))
    setSavedMessage(true)
    setTimeout(() => setSavedMessage(false), 2000)
  }

  const resetToDefault = () => {
    setSettings(DEFAULT_SETTINGS)
    localStorage.setItem('jh_user_settings', JSON.stringify(DEFAULT_SETTINGS))
    setSavedMessage(true)
    setTimeout(() => setSavedMessage(false), 2000)
  }

  if (!isMounted) {
    return <div className="p-8 text-center text-gray-500">Loading settings...</div>
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <PageHeader
        title="Pengaturan Applications (Settings)"
        description="Kelola preferensi suara audio, tampilan visual, target belajar harian, dan aksesibilitas."
        icon={<Settings className="w-8 h-8" />}
      />

      {savedMessage && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-green-600" />
          Pengaturan berhasil disimpan!
        </div>
      )}

      {/* Audio Settings Section */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-3">
          <Volume2 className="w-5 h-5 text-blue-600" />
          Audio & Suara (Web Speech API TTS)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Voice Speed */}
          <div className="space-y-2">
            <label className="font-semibold text-gray-800 block">Kecepatan Suara Pelafalan (Voice Speed)</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => updateSetting('voiceSpeed', 1.0)}
                className={`flex-1 py-2.5 px-4 rounded-xl border text-sm font-medium transition-all ${
                  settings.voiceSpeed === 1.0
                    ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Normal (1.0x)
              </button>
              <button
                type="button"
                onClick={() => updateSetting('voiceSpeed', 0.75)}
                className={`flex-1 py-2.5 px-4 rounded-xl border text-sm font-medium transition-all ${
                  settings.voiceSpeed === 0.75
                    ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Pelan / Lambat (0.75x)
              </button>
            </div>
            <p className="text-xs text-gray-400">Kecepatan pelafalan suara Text-to-Speech bahasa Jepang (ja-JP).</p>
          </div>

          {/* Auto Play Audio */}
          <div className="space-y-2">
            <label className="font-semibold text-gray-800 block">Auto Play Audio</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => updateSetting('autoPlayAudio', true)}
                className={`flex-1 py-2.5 px-4 rounded-xl border text-sm font-medium transition-all ${
                  settings.autoPlayAudio
                    ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Aktif (ON)
              </button>
              <button
                type="button"
                onClick={() => updateSetting('autoPlayAudio', false)}
                className={`flex-1 py-2.5 px-4 rounded-xl border text-sm font-medium transition-all ${
                  !settings.autoPlayAudio
                    ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Mati (OFF)
              </button>
            </div>
            <p className="text-xs text-gray-400">Otomatis memutar audio saat berpindah ke soal baru pada Audio Quiz.</p>
          </div>
        </div>
      </section>

      {/* Appearance & Accessibility Section */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-3">
          <Palette className="w-5 h-5 text-purple-600" />
          Tampilan & Aksesibilitas
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Reduced Motion */}
          <div className="space-y-2">
            <label className="font-semibold text-gray-800 block">Kurangi Animasi (Reduced Motion)</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => updateSetting('reducedMotion', false)}
                className={`flex-1 py-2.5 px-4 rounded-xl border text-sm font-medium transition-all ${
                  !settings.reducedMotion
                    ? 'bg-purple-50 border-purple-600 text-purple-700 font-bold'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Animasi Normal
              </button>
              <button
                type="button"
                onClick={() => updateSetting('reducedMotion', true)}
                className={`flex-1 py-2.5 px-4 rounded-xl border text-sm font-medium transition-all ${
                  settings.reducedMotion
                    ? 'bg-purple-50 border-purple-600 text-purple-700 font-bold'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Tanpa Animasi
              </button>
            </div>
            <p className="text-xs text-gray-400">Meminimalkan animasi urutan goresan stroke order & efek visual.</p>
          </div>

          {/* Theme selection */}
          <div className="space-y-2">
            <label className="font-semibold text-gray-800 block">Tema Tampilan (Color Theme)</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => updateSetting('theme', 'default')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  settings.theme === 'default'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}
              >
                🔵 Modern Blue (Default)
              </button>
              <button
                type="button"
                onClick={() => updateSetting('theme', 'sakura')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  settings.theme === 'sakura'
                    ? 'bg-pink-600 text-white border-pink-600'
                    : 'bg-pink-50 border-pink-200 text-pink-700'
                }`}
              >
                🌸 Sakura Pink
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Preferences Section */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-3">
          <Sliders className="w-5 h-5 text-emerald-600" />
          Target & Syarat Pembelajaran
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Daily Goal Target */}
          <div className="space-y-2">
            <label className="font-semibold text-gray-800 block">Target Soal Harian (Daily Target)</label>
            <select
              value={settings.dailyGoal}
              onChange={e => updateSetting('dailyGoal', parseInt(e.target.value, 10))}
              className="w-full p-3 rounded-xl border border-gray-200 bg-white font-medium text-gray-800 focus:outline-none focus:border-blue-600"
            >
              <option value={5}>5 Soal / Hari (Ringan)</option>
              <option value={10}>10 Soal / Hari (Standar Recommended)</option>
              <option value={15}>15 Soal / Hari (Fokus)</option>
              <option value={20}>20 Soal / Hari (Intensif)</option>
            </select>
          </div>

          {/* Exam Passing Threshold */}
          <div className="space-y-2">
            <label className="font-semibold text-gray-800 block">Syarat Kelulusan Ujian (Passing Grade)</label>
            <select
              value={settings.passingThreshold}
              onChange={e => updateSetting('passingThreshold', parseInt(e.target.value, 10))}
              className="w-full p-3 rounded-xl border border-gray-200 bg-white font-medium text-gray-800 focus:outline-none focus:border-blue-600"
            >
              <option value={60}>60% (Cukup)</option>
              <option value={70}>70% (Standar Ideal)</option>
              <option value={80}>80% (Tinggi)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Reset Settings Button */}
      <div className="flex justify-end pt-2">
        <Button onClick={resetToDefault} variant="outline" className="text-xs text-gray-600 gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" /> Reset Pengaturan ke Default
        </Button>
      </div>
    </div>
  )
}
