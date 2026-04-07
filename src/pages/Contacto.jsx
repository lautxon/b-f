import { EnvelopeSimple, MapPin, CurrencyDollar, Wallet } from '@phosphor-icons/react'

function Contacto() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl text-ink mb-3">
            Contacto
          </h1>
          <p className="text-muted text-base max-w-xl">
            Para consultas, encargos personalizados o compras al por mayor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info de contacto */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-crisp bg-terracotta-soft flex items-center justify-center flex-shrink-0">
                <EnvelopeSimple size={20} className="text-terracotta" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-ink mb-1">
                  Correo electronico
                </h3>
                <a
                  href="mailto:aureliadiaz@gmail.com"
                  className="text-charcoal hover:text-ink transition-colors"
                >
                  aureliadiaz@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-crisp bg-ocre-soft flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-ocre" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-ink mb-1">
                  Ubicacion
                </h3>
                <p className="text-charcoal">
                  Iruya, Salta, Argentina
                  <br />
                  <span className="text-muted text-sm">2700 msnm -- Valles Calchaquies</span>
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-medium text-ink mb-4">
                Medios de pago
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-charcoal">
                  <Wallet size={16} className="text-muted flex-shrink-0" />
                  Mercado Pago -- Alias: <span className="font-mono text-xs bg-card border border-border px-2 py-0.5 rounded">Barro&Fuego</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-charcoal">
                  <CurrencyDollar size={16} className="text-muted flex-shrink-0" />
                  Banco Macro de Salta
                </li>
              </ul>
              <p className="text-xs text-muted mt-4">
                Para compras desde el exterior, consultar por correo para coordinar el medio de pago internacional.
              </p>
            </div>
          </div>

          {/* Formulario simple */}
          <div className="border border-border rounded-crisp p-8 bg-white">
            <h2 className="font-serif text-xl text-ink mb-6">
              Enviar consulta
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-xs uppercase tracking-[0.1em] text-muted mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-charcoal transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-[0.1em] text-muted mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-charcoal transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-xs uppercase tracking-[0.1em] text-muted mb-2">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  rows={5}
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-charcoal transition-colors resize-none"
                  placeholder="Tu consulta..."
                />
              </div>
              <a
                href="mailto:aureliadiaz@gmail.com"
                className="btn-primary w-full text-center"
              >
                Enviar por correo
              </a>
              <p className="text-xs text-muted text-center">
                Se abrira tu cliente de correo para enviar la consulta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacto
