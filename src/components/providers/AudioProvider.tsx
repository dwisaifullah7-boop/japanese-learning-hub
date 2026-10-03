'use client'

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react'

interface AudioContextType {
  volume: number
  setVolume: (volume: number) => void
  autoPlay: boolean
  setAutoPlay: (autoPlay: boolean) => void
  playAudio: (url: string, text?: string) => void
  stopAudio: () => void
  isPlaying: boolean
  currentAudioUrl: string | null
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [volume, setVolume] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseFloat(localStorage.getItem('jlh_volume') || '1')
    }
    return 1
  })
  const [autoPlay, setAutoPlay] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jlh_autoplay') === 'true'
    }
    return false
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  // Initialize Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  // Update volume audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
    localStorage.setItem('jlh_volume', volume.toString())
  }, [volume])

  useEffect(() => {
    localStorage.setItem('jlh_autoplay', autoPlay.toString())
  }, [autoPlay])

  const playAudio = (url: string, text?: string) => {
    // Stop audio yang sedang berputar
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    // Jika ada text, gunakan Web Speech API
    if (text && synthRef.current) {
      // Cancel semua speech yang sedang berjalan
      synthRef.current.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ja-JP' // Set bahasa Jepang
      utterance.rate = 0.8 // Sedikit lebih lambat untuk pembelajaran
      utterance.volume = volume

      utterance.onstart = () => {
        setCurrentAudioUrl(url)
        setIsPlaying(true)
      }

      utterance.onend = () => {
        setIsPlaying(false)
        setCurrentAudioUrl(null)
      }

      utterance.onerror = () => {
        setIsPlaying(false)
        setCurrentAudioUrl(null)
      }

      synthRef.current.speak(utterance)
      return
    }

    // Fallback: simulasi jika tidak ada text
    setCurrentAudioUrl(url)
    setIsPlaying(true)

    setTimeout(() => {
      setIsPlaying(false)
      setCurrentAudioUrl(null)
    }, 1000)
  }

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    if (synthRef.current) {
      synthRef.current.cancel()
    }
    setIsPlaying(false)
    setCurrentAudioUrl(null)
  }

  return (
    <AudioContext.Provider
      value={{
        volume,
        setVolume,
        autoPlay,
        setAutoPlay,
        playAudio,
        stopAudio,
        isPlaying,
        currentAudioUrl,
      }}
    >
      {children}
      <audio ref={audioRef} />
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
