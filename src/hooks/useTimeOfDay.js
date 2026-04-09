import { useState, useEffect } from 'react'

/**
 * Returns the time-of-day period based on the user's local hour.
 * Maps to Iruya, Salta context (America/Argentina/Salta, UTC-3).
 *
 * Periods:
 * - amanecer: 5-8  (dawn, warm oranges)
 * - manana:  8-12  (morning, bright work light)
 * - tarde:   12-18 (afternoon, golden hour)
 * - atardecer: 18-21 (sunset, deep reds)
 * - noche:   21-5  (night, stars, quiet)
 */
export function useTimeOfDay() {
  const [period, setPeriod] = useState(getPeriod())

  useEffect(() => {
    const interval = setInterval(() => {
      setPeriod(getPeriod())
    }, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [])

  return period
}

function getPeriod() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 8) return 'amanecer'
  if (hour >= 8 && hour < 12) return 'manana'
  if (hour >= 12 && hour < 18) return 'tarde'
  if (hour >= 18 && hour < 21) return 'atardecer'
  return 'noche'
}

/**
 * Returns the hero background image URL for the given time period.
 * Uses picsum.photos with seeds that evoke each moment in Iruya.
 */
export function getHeroImage(period) {
  const images = {
    amanecer: 'https://picsum.photos/seed/sky-orange-dawn/1600/900',
    manana: 'https://picsum.photos/seed/workshop-bright-light/1600/900',
    tarde: 'https://picsum.photos/seed/golden-afternoon-sun/1600/900',
    atardecer: 'https://picsum.photos/seed/sunset-red-valley/1600/900',
    noche: 'https://picsum.photos/seed/starry-mountain-night/1600/900',
  }
  return images[period] || images.tarde
}

/**
 * Returns the descriptive text for each period.
 */
export function getPeriodLabel(period) {
  const labels = {
    amanecer: 'Amanecer en Iruya',
    manana: 'El taller en marcha',
    tarde: 'Piezas al sol de la sierra',
    atardecer: 'Atardecer en los Valles',
    noche: 'Silencio de montana',
  }
  return labels[period] || ''
}
