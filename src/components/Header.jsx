import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 bg-canvas/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex flex-col">
          <span className="font-serif text-xl tracking-tight text-ink leading-tight">
            Barro & Fuego
          </span>
          <span className="text-[10px] uppercase tracking-[0.15em] text-muted leading-tight">
            Ceramica artesanal
          </span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            to="/catalogo"
            className={`text-sm tracking-wide transition-colors duration-200 ${
              isActive('/catalogo')
                ? 'text-ink font-medium'
                : 'text-muted hover:text-ink'
            }`}
          >
            Catalogo
          </Link>
          <Link
            to="/bio"
            className={`text-sm tracking-wide transition-colors duration-200 ${
              isActive('/bio')
                ? 'text-ink font-medium'
                : 'text-muted hover:text-ink'
            }`}
          >
            Bio
          </Link>
          <Link
            to="/proceso"
            className={`text-sm tracking-wide transition-colors duration-200 ${
              isActive('/proceso')
                ? 'text-ink font-medium'
                : 'text-muted hover:text-ink'
            }`}
          >
            Proceso
          </Link>
          <Link
            to="/testimonios"
            className={`text-sm tracking-wide transition-colors duration-200 ${
              isActive('/testimonios')
                ? 'text-ink font-medium'
                : 'text-muted hover:text-ink'
            }`}
          >
            Testimonios
          </Link>
          <Link
            to="/contacto"
            className={`text-sm tracking-wide transition-colors duration-200 ${
              isActive('/contacto')
                ? 'text-ink font-medium'
                : 'text-muted hover:text-ink'
            }`}
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
