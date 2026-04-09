import { useState } from 'react'
import { Package, MapPin, Calculator } from '@phosphor-icons/react'

/**
 * Shipping cost estimator.
 * Uses approximate rates based on real Correo Argentino / DHL pricing.
 * Prices are in ARS and are estimates only.
 */

const DOMESTIC_RATES = {
  // Price per kg in ARS
  base: 2500,
  min: 5000,    // Minimum shipping cost
  zones: {
    'NOA': 1.0,      // Salta, Jujuy, Tucuman, Catamarca, La Rioja, Santiago
    'NEA': 1.3,
    'Cuyo': 1.2,
    'Centro': 1.1,
    'CABA-GBA': 1.0,
    'Patagonia': 1.5,
  }
}

const INTERNATIONAL_RATES = {
  // Price per kg in EUR
  'Europa': { base: 18, min: 25 },
  'Sudamerica': { base: 12, min: 18 },
  'Norteamerica': { base: 15, min: 22 },
  'Asia': { base: 20, min: 30 },
}

// Weight estimates for products (in kg)
const CATEGORY_WEIGHTS = {
  'olla-grande': 2.5,
  'vasija': 1.5,
  'botella': 1.0,
  'fuente': 2.0,
  'plato': 0.8,
  'taza': 0.4,
  'vaso': 0.3,
  'juego-tazas': 1.6,
  'cuenco': 0.8,
  'jarra': 1.2,
  'adorno': 0.6,
  'marco': 0.8,
  'collar': 0.2,
  'escultura': 2.0,
  'figurilla': 0.4,
  'florero': 1.2,
  'porta-velas': 0.5,
  'maceta': 0.8,
  'campana': 0.6,
  'decorativo': 1.0,
}

function estimateWeight(categoria) {
  // Try to match known weights
  for (const [key, weight] of Object.entries(CATEGORY_WEIGHTS)) {
    if (categoria.toLowerCase().includes(key)) return weight
  }
  // Default weight
  if (categoria.includes('utilitarios')) return 1.5
  return 0.8
}

function estimateDomestic(zone, weight) {
  const multiplier = DOMESTIC_RATES.zones[zone] || 1.2
  const cost = weight * DOMESTIC_RATES.base * multiplier
  return Math.max(cost, DOMESTIC_RATES.min)
}

function estimateInternational(region, weight) {
  const rates = INTERNATIONAL_RATES[region]
  if (!rates) return null
  const cost = weight * rates.base
  return Math.max(cost, rates.min)
}

export function useShippingEstimate() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const estimate = (data) => {
    setLoading(true)
    const { destino, pesoKg, categoria } = data
    const weight = pesoKg || estimateWeight(categoria || '')

    let ars = null
    let eur = null

    if (destino === 'Argentina') {
      // Simplified: average zone
      ars = estimateDomestic('Centro', weight)
    } else if (destino === 'Europa') {
      eur = estimateInternational('Europa', weight)
    } else if (destino === 'Chile' || destino === 'Peru' || destino === 'Brasil') {
      eur = estimateInternational('Sudamerica', weight)
    } else if (destino === 'Mexico') {
      eur = estimateInternational('Norteamerica', weight)
    } else if (destino === 'Japon' || destino === 'China') {
      eur = estimateInternational('Asia', weight)
    } else {
      // Default to Sudamerica
      eur = estimateInternational('Sudamerica', weight)
    }

    // Simulate API delay
    setTimeout(() => {
      setResult({ ars, eur, peso: weight, destino })
      setLoading(false)
    }, 500)
  }

  const reset = () => { setResult(null); setLoading(false) }

  return { result, loading, estimate, reset }
}

export function ShippingEstimator({ obra }) {
  const { result, loading, estimate, reset } = useShippingEstimate()
  const [destino, setDestino] = useState('')
  const [pesoKg, setPesoKg] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    estimate({
      destino,
      pesoKg: parseFloat(pesoKg) || 0,
      categoria: obra?.nombre || '',
    })
  }

  return (
    <div className="border border-border rounded-crisp p-6 bg-card">
      <div className="flex items-center gap-2 mb-4">
        <Package size={18} className="text-muted" />
        <h3 className="text-sm font-medium text-ink">
          Estimador de envio
        </h3>
      </div>

      <p className="text-xs text-muted mb-4">
        Calcula el costo aproximado de envio. Los valores son estimaciones.
        El costo final puede variar segun el servicio elegido.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3 mb-4">
        <div>
          <label htmlFor="destino" className="block text-xs uppercase tracking-[0.1em] text-muted mb-1.5">
            Destino
          </label>
          <select
            id="destino"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            required
            className="w-full px-3 py-2 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-terracotta transition-colors appearance-none"
          >
            <option value="">Seleccionar pais o region</option>
            <optgroup label="Argentina">
              <option value="Argentina">Argentina (interior)</option>
            </optgroup>
            <optgroup label="Sudamerica">
              <option value="Chile">Chile</option>
              <option value="Peru">Peru</option>
              <option value="Brasil">Brasil</option>
            </optgroup>
            <optgroup label="Norteamerica">
              <option value="Mexico">Mexico</option>
              <option value="Estados Unidos">Estados Unidos</option>
            </optgroup>
            <optgroup label="Europa">
              <option value="Espana">Espana</option>
              <option value="Francia">Francia</option>
              <option value="Alemania">Alemania</option>
              <option value="Italia">Italia</option>
            </optgroup>
            <optgroup label="Asia">
              <option value="Japon">Japon</option>
            </optgroup>
          </select>
        </div>

        <div>
          <label htmlFor="peso" className="block text-xs uppercase tracking-[0.1em] text-muted mb-1.5">
            Peso aproximado (kg)
          </label>
          <input
            type="number"
            id="peso"
            value={pesoKg}
            onChange={(e) => setPesoKg(e.target.value)}
            placeholder="Ej: 1.5"
            min="0.1"
            step="0.1"
            className="w-full px-3 py-2 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-terracotta transition-colors"
          />
        </div>

        <div className="flex gap-2">
          <button type="submit" className="btn-primary text-sm flex-1" disabled={loading}>
            {loading ? 'Calculando...' : (
              <>
                <Calculator size={14} />
                Calcular
              </>
            )}
          </button>
          {result && (
            <button type="button" onClick={reset} className="btn-secondary text-sm">
              Limpiar
            </button>
          )}
        </div>
      </form>

      {/* Resultado */}
      {result && (
        <div className="border-t border-border pt-4 space-y-2">
          <div className="flex items-start gap-2">
            <MapPin size={14} className="text-muted mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-charcoal">
                Destino: <span className="text-ink font-medium">{result.destino}</span>
              </p>
              <p className="text-sm text-charcoal">
                Peso estimado: <span className="text-ink font-medium">{result.peso.toFixed(1)} kg</span>
              </p>
            </div>
          </div>

          {result.ars && (
            <div className="flex justify-between items-center p-3 rounded bg-canvas border border-border">
              <span className="text-sm text-muted">Costo estimado (ARS):</span>
              <span className="text-lg font-medium text-ink">
                ${new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0 }).format(Math.round(result.ars))}
              </span>
            </div>
          )}

          {result.eur && (
            <div className="flex justify-between items-center p-3 rounded bg-canvas border border-border">
              <span className="text-sm text-muted">Costo estimado (EUR):</span>
              <span className="text-lg font-medium text-ink">
                EUR {result.eur.toFixed(2)}
              </span>
            </div>
          )}

          <p className="text-[10px] text-muted">
            * Estimacion basada en tarifas de Correo Argentino y DHL internacional.
            Los precios finales pueden variar segun el servicio y seguros elegidos.
          </p>
        </div>
      )}
    </div>
  )
}
