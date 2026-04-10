import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useCatalog } from '../hooks/useCatalog'
import { useSEO } from '../hooks/useSEO'

function Catalogo() {
  useSEO({
    title: 'Catalogo — Barro & Fuego',
    description: 'Catalogo completo de ceramica artesanal de Aurelia Diaz. Objetos utilitarios y decorativos, hechos a mano en Iruya, Salta.',
    url: 'https://b-f-ten.vercel.app/catalogo',
  })

  const { obras, categorias, loading } = useCatalog()
  const [categoriaActiva, setCategoriaActiva] = useState('todas')

  const allCategorias = [
    { nombre: 'Todas', slug: 'todas', descripcion: null },
    ...categorias,
  ]

  const filtradas =
    categoriaActiva === 'todas'
      ? obras
      : obras.filter((o) => o.categoria === categoriaActiva)

  if (loading) {
    return (
      <div className="py-32 text-center">
        <p className="text-muted">Cargando catalogo...</p>
      </div>
    )
  }

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
          {allCategorias.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setCategoriaActiva(cat.slug)}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                categoriaActiva === cat.slug
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
              <ProductCard key={obra.id || obra.slug} obra={obra} index={index} />
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
