import { useState } from 'react'
import catalogSeed from '../data/catalog-seed.json'
import ProductCard from '../components/ProductCard'

const CATEGORIAS = [
  { id: 'todas', nombre: 'Todas' },
  { id: 'objetos-utilitarios', nombre: 'Objetos utilitarios' },
  { id: 'objetos-varios', nombre: 'Objetos varios' },
]

function Catalogo() {
  const [categoriaActiva, setCategoriaActiva] = useState('todas')

  const filtradas =
    categoriaActiva === 'todas'
      ? catalogSeed
      : catalogSeed.filter((o) => o.categoria === categoriaActiva)

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl text-ink mb-3">
            Catalogo
          </h1>
          <p className="text-muted text-base max-w-xl">
            Obras de ceramica artesanal de Aurelia Diaz.
            Precios en pesos argentinos con conversion a euros.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaActiva(cat.id)}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                categoriaActiva === cat.id
                  ? 'bg-terracotta text-canvas font-medium'
                  : 'bg-card border border-border text-charcoal hover:bg-card-hover'
              }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        {filtradas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtradas.map((obra, index) => (
              <ProductCard key={obra.id} obra={obra} index={index} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-muted">
              No hay piezas en esta categoria todavia.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Catalogo
