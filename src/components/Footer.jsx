import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EnvelopeSimple, MapPin } from '@phosphor-icons/react'

function Footer() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (email) {
      setEnviado(true)
      setEmail('')
    }
  }

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-serif text-lg text-ink mb-3">
              Barro & Fuego
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Ceramica artesanal de Aurelia Diaz.
              Cada pieza nace del barro y el fuego de Iruya,
              en el corazon de los Valles Calchaquies.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-muted mb-4">
              Navegacion
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-charcoal hover:text-ink transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="text-sm text-charcoal hover:text-ink transition-colors">
                  Catalogo
                </Link>
              </li>
              <li>
                <Link to="/bio" className="text-sm text-charcoal hover:text-ink transition-colors">
                  Bio
                </Link>
              </li>
              <li>
                <Link to="/proceso" className="text-sm text-charcoal hover:text-ink transition-colors">
                  Proceso
                </Link>
              </li>
              <li>
                <Link to="/testimonios" className="text-sm text-charcoal hover:text-ink transition-colors">
                  Testimonios
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-sm text-charcoal hover:text-ink transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-muted mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-charcoal">
                <EnvelopeSimple size={16} className="text-muted flex-shrink-0" />
                <a href="mailto:aureliadiaz@gmail.com" className="hover:text-ink transition-colors">
                  aureliadiaz@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-charcoal">
                <MapPin size={16} className="text-muted flex-shrink-0 mt-0.5" />
                <span>Iruya, Salta, Argentina</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-muted mb-4">
              Novedades
            </h4>
            <p className="text-sm text-charcoal mb-4 leading-relaxed">
              Recibi aviso cuando haya nuevas piezas disponibles.
            </p>
            {enviado ? (
              <p className="text-sm text-terracotta">
                Gracias! Te avisaremos cuando haya novedades.
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full px-3 py-2 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-terracotta transition-colors"
                />
                <button type="submit" className="btn-primary w-full text-sm py-2">
                  Suscribirme
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            Todos los derechos reservados -- Aurelia Diaz, Barro & Fuego
          </p>
          <p className="text-xs text-muted">
            Hecho con arcilla y codigo
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
