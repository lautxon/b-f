import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, EnvelopeSimple, CurrencyDollar } from '@phosphor-icons/react'
import catalogSeed from '../data/catalog-seed.json'
import { useEffect, useState } from 'react'

function Detalle() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [eurRate, setEurRate] = useState(null)

  const obra = catalogSeed.find((o) => o.slug === slug)

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_EXCHANGE_RATE_API_URL}EUR`
        )
        const data = await res.json()
        const arsPerEur = data.rates.ARS
        setEurRate(arsPerEur)
      } catch {
        console.warn('No se pudo obtener la cotizacion EUR')
      }
    }
    fetchRate()
  }, [])

  if (!obra) {
    return (
      <div className="py-32 text-center">
        <p className="text-muted mb-6">Pieza no encontrada</p>
        <button className="btn-secondary" onClick={() => navigate('/catalogo')}>
          Volver al catalogo
        </button>
      </div>
    )
  }

  const precioEur = eurRate
    ? (obra.precioArs / eurRate).toFixed(2)
    : null

  const formattedArs = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(obra.precioArs)

  const mpLink = `https://www.mercadopago.com.ar`

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <button
          className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors mb-10"
          onClick={() => navigate('/catalogo')}
        >
          <ArrowLeft size={16} />
          Volver al catalogo
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Imagen */}
          <div
            className="border border-border rounded-crisp overflow-hidden"
            style={{
              width: '100%',
              paddingTop: '125%',
              position: 'relative',
              backgroundColor: '#3D2A25',
            }}
          >
            <img
              src={obra.imagenUrl}
              alt={obra.nombre}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.15em] text-muted mb-3">
              {obra.categoria === 'objetos-utilitarios'
                ? 'Objeto utilitario'
                : 'Objeto decorativo'}
            </p>

            <h1 className="text-3xl md:text-4xl text-ink mb-4">
              {obra.nombre}
            </h1>

            <div className="space-y-4 mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.1em] text-muted mb-1">
                  Ano de creacion
                </p>
                <p className="text-charcoal">{obra.anoCreacion}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.1em] text-muted mb-1">
                  Tecnica
                </p>
                <p className="text-charcoal">{obra.tecnica}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.1em] text-muted mb-1">
                  Descripcion
                </p>
                <p className="text-charcoal leading-relaxed">{obra.descripcion}</p>
              </div>
            </div>

            {/* Precio */}
            <div className="border-t border-border pt-6 mb-8">
              <div className="flex items-center gap-2 mb-2">
                <CurrencyDollar size={18} className="text-muted" />
                <span className="text-sm text-muted">Precio</span>
              </div>
              <p className="text-2xl font-medium text-ink">{formattedArs}</p>
              {precioEur && (
                <p className="text-sm text-muted mt-1">
                  EUR {precioEur} (cotizacion actual)
                </p>
              )}
            </div>

            {/* Botones de accion */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={mpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center"
              >
                Comprar con Mercado Pago
              </a>
              <button
                className="btn-secondary"
                onClick={() => navigate('/contacto')}
              >
                <EnvelopeSimple size={16} />
                Consultar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detalle
