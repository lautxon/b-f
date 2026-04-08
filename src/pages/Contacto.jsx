import { EnvelopeSimple, MapPin, CurrencyDollar, Wallet, Link } from '@phosphor-icons/react'

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

              {/* Mercado Pago */}
              <div className="mb-5 p-4 rounded-crisp bg-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <Wallet size={18} className="text-terracotta" />
                  <span className="text-sm font-medium text-ink">
                    Mercado Pago
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-xs text-muted">Alias:</span>
                  <span className="font-mono text-xs bg-canvas border border-border px-2 py-1 rounded text-charcoal">
                    Barro&Fuego
                  </span>
                </div>
                <a
                  href="https://www.mercadopago.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-terracotta hover:text-terracotta-light transition-colors"
                >
                  <Link size={12} />
                  Ir a Mercado Pago
                </a>
              </div>

              {/* Banco Macro */}
              <div className="p-4 rounded-crisp bg-card border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <CurrencyDollar size={18} className="text-ocre" />
                  <span className="text-sm font-medium text-ink">
                    Banco Macro de Salta
                  </span>
                </div>
                <div className="space-y-2 text-xs text-charcoal">
                  <div className="flex justify-between">
                    <span className="text-muted">Titular:</span>
                    <span>Aurelia Diaz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">CBU:</span>
                    <span className="font-mono">2850594940094949494949</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Alias:</span>
                    <span className="font-mono">BARRO.FUEGO.MPAGO</span>
                  </div>
                </div>
                <a
                  href="https://www.bancomacro.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-ocre hover:text-terracotta-light transition-colors mt-3"
                >
                  <Link size={12} />
                  Ir a Banco Macro
                </a>
              </div>

              <p className="text-xs text-muted mt-4">
                Para compras desde el exterior, consultar por correo para coordinar el medio de pago internacional (PayPal, transferencia, etc.).
              </p>
            </div>
          </div>

          {/* Formulario simple */}
          <div className="border border-border rounded-crisp p-8 bg-card">
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
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-terracotta transition-colors"
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
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-terracotta transition-colors"
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
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-terracotta transition-colors resize-none"
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
