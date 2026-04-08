import { useNavigate } from 'react-router-dom'
import catalogSeed from '../data/catalog-seed.json'
import ProductCard from '../components/ProductCard'

function Home() {
  const navigate = useNavigate()
  const destacados = catalogSeed.slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="relative py-32 md:py-48 border-b border-border">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, #C4775B 0%, transparent 50%),
                              radial-gradient(circle at 70% 30%, #8B3A2F 0%, transparent 50%)`,
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted mb-6">
            Iruya, Salta -- 2700 msnm
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-ink mb-6">
            Barro & Fuego
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-10">
            Ceramica artesanal de Aurelia Diaz. Cada pieza lleva la marca
            del barro de los Valles Calchaquies y el fuego del horno de lena.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="btn-primary"
              onClick={() => navigate('/catalogo')}
            >
              Ver Catalogo
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate('/bio')}
            >
              Conoce a Aurelia
            </button>
          </div>
        </div>
      </section>

      {/* Destacados */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl text-ink mb-2">
                Piezas destacadas
              </h2>
              <p className="text-muted text-sm">
                Seleccion de obras recientes
              </p>
            </div>
            <button
              className="btn-secondary text-sm"
              onClick={() => navigate('/catalogo')}
            >
              Ver todo
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destacados.map((obra, index) => (
              <ProductCard key={obra.id} obra={obra} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section className="py-24 md:py-32 bg-card border-t border-b border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl text-ink mb-6">
            Del barro nace la forma
          </h2>
          <p className="text-charcoal leading-relaxed mb-4">
            Aurelia Diaz trabaja la arcilla de Iruya con las tecnicas que
            aprendio de su familia y perfecciono a lo largo de anos. Cada
            pieza es modelada a mano, secada al sol de montana y cocida en
            horno de lena a mas de 900 grados.
          </p>
          <p className="text-muted leading-relaxed">
            Los colores de sus obras vienen de la tierra misma: terracotas,
            ocres, tonos ahumados y blancos hueso. La paleta de los Valles
            Calchaquies hecha objeto.
          </p>
          <button
            className="btn-secondary mt-8"
            onClick={() => navigate('/bio')}
          >
            Leer mas sobre Aurelia
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
