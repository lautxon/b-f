import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from '@phosphor-icons/react'

function ProductCard({ obra, index = 0 }) {
  const navigate = useNavigate()

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(obra.precioArs)

  return (
    <div
      className="group cursor-pointer"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className="border border-border rounded-crisp overflow-hidden card-hover"
        style={{ backgroundColor: '#2A1A18' }}
        onClick={() => navigate(`/catalogo/${obra.slug}`)}
      >
        <div style={{ width: '100%', paddingTop: '75%', position: 'relative' }}>
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
              transition: 'transform 500ms ease',
              display: 'block',
            }}
            onMouseEnter={(e) => { e.target.style.transform = 'scale(1.02)' }}
            onMouseLeave={(e) => { e.target.style.transform = 'scale(1)' }}
          />
        </div>
        <div style={{ padding: '16px' }}>
          <h3 style={{
            fontFamily: "'Lora', 'Domine', 'Playfair Display', serif",
            fontSize: '1.125rem',
            color: '#F0E6E0',
            marginBottom: '4px',
            transition: 'color 200ms ease',
          }}>
            {obra.nombre}
          </h3>
          <p style={{
            fontSize: '0.75rem',
            color: '#9B8A82',
            marginBottom: '12px',
          }}>
            {obra.tecnica}
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#D4C4BA',
            }}>
              {formattedPrice}
            </span>
            <ArrowUpRight
              size={16}
              style={{ color: '#9B8A82', transition: 'color 200ms ease' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
