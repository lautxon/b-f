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
      className="group cursor-pointer animate-on-scroll"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className="border border-border rounded-crisp overflow-hidden card-hover bg-card"
        onClick={() => navigate(`/catalogo/${obra.slug}`)}
      >
        <div className="aspect-[4/3] overflow-hidden bg-border">
          <img
            src={obra.imagenUrl}
            alt={obra.nombre}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="p-4">
          <h3 className="font-serif text-lg text-ink mb-1 group-hover:text-terracotta transition-colors">
            {obra.nombre}
          </h3>
          <p className="text-xs text-muted mb-3">{obra.tecnica}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-charcoal">
              {formattedPrice}
            </span>
            <ArrowUpRight
              size={16}
              className="text-muted group-hover:text-ink transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
