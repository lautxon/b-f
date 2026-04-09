import { useSEO } from '../hooks/useSEO'

function Testimonios() {
  useSEO({
    title: 'Testimonios — Barro & Fuego',
    description: 'Opiniones de compradores de ceramica artesanal de Barro & Fuego, Iruya, Salta.',
    url: 'https://b-f-ten.vercel.app/testimonios',
  })

  const testimonios = [
    {
      nombre: 'Maria Elena Gutierrez',
      ubicacion: 'Buenos Aires, Argentina',
      texto: 'La vasija Calchaqui es espectacular. Tiene esa calidez que solo las cosas hechas a mano tienen. La uso para decorar la sala y todos preguntan de donde es.',
      obra: 'Vasija Calchaqui',
      estrellas: 5,
    },
    {
      nombre: 'Hans Mueller',
      ubicacion: 'Berlin, Alemania',
      texto: 'I discovered Barro & Fuego during a trip to Salta. The pieces are authentic, with real character. I ordered three plates and a jarra — they arrived perfectly packed. Each one is unique.',
      obra: 'Plato Llano Terracota + Jarra Artesanal',
      estrellas: 5,
    },
    {
      nombre: 'Carolina Mendez',
      ubicacion: 'San Miguel de Tucuman, Argentina',
      texto: 'Encargue un juego de tazas para regalo y supero mis expectativas. Cada taza tiene su personalidad. Se nota que son de artesana, no de fabrica. Aurelia es un genio.',
      obra: 'Juego de Tazas x4',
      estrellas: 5,
    },
    {
      nombre: 'Sophie Laurent',
      ubicacion: 'Lyon, Francia',
      texto: `J'ai achete une sculpture "Viento Norte" et c'est devenu la piece centrale de ma collection d'art populaire sud-americain. La texture fumee et les reflets metalliques sont magnifiques.`,
      obra: 'Escultura Viento Norte',
      estrellas: 5,
    },
    {
      nombre: 'Roberto Fernandez',
      ubicacion: 'Cordoba, Argentina',
      texto: 'La fuente ovalada es hermosa y funcional. La uso para servir asados familiares y siempre genera comentarios. El borde irregular le da un encanto especial.',
      obra: 'Fuente Ovalada Iruya',
      estrellas: 5,
    },
    {
      nombre: 'Yuki Tanaka',
      ubicacion: 'Tokio, Japon',
      texto: `The ceramic necklace is delicate and beautiful. I love that each bead is handmade. You can feel the artisan touch. It arrived safely to Japan with careful packaging.`,
      obra: 'Collar de Cuentas Ceramica',
      estrellas: 5,
    },
    {
      nombre: 'Laura Quiroga',
      ubicacion: 'Salta Capital, Argentina',
      texto: 'Compre la olla de barro grande y es perfecta para locros y guisos. Retiene el calor de manera increible. Ademas, estetica es una obra de arte en la cocina.',
      obra: 'Olla de Barro Grande',
      estrellas: 5,
    },
    {
      nombre: 'Marco Rossi',
      ubicacion: 'Milan, Italia',
      texto: `Ho comprato un piatto decorativo "Valles" e mi ricorda i paesaggi del Perù. La ceramica ha una qualita straordinaria, i colori della terra argentina sono vivi. Consigliatissimo!`,
      obra: 'Plato Decorativo Valles',
      estrellas: 5,
    },
  ]

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">
            Voces de compradores
          </p>
          <h1 className="text-4xl md:text-5xl text-ink mb-4">
            Testimonios
          </h1>
          <p className="text-muted text-base max-w-xl mx-auto leading-relaxed">
            Lo que dicen quienes compraron piezas de Barro & Fuego.
            Opinions reales de Argentina y el mundo.
          </p>
        </div>

        {/* Grid de testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonios.map((t, i) => (
            <div
              key={i}
              className="border border-border rounded-crisp p-8 bg-card"
            >
              {/* Estrellas */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.estrellas }).map((_, si) => (
                  <svg key={si} width="16" height="16" viewBox="0 0 24 24" fill="#C4775B">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Texto */}
              <blockquote className="text-charcoal leading-relaxed mb-6 italic">
                "{t.texto}"
              </blockquote>

              {/* Autor */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-ink">
                    {t.nombre}
                  </p>
                  <p className="text-xs text-muted">
                    {t.ubicacion}
                  </p>
                </div>
                <p className="text-xs text-muted italic">
                  {t.obra}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-20 pt-16 border-t border-border text-center">
          <h2 className="font-serif text-2xl text-ink mb-4">
            ¿Ya tenes tu pieza de Barro & Fuego?
          </h2>
          <p className="text-muted text-sm mb-6">
            Contanos tu experiencia. Tu opinion ayuda a otros compradores.
          </p>
          <a
            href="mailto:aureliadiaz@gmail.com?subject=Mi%20experiencia%20con%20Barro%20%26%20Fuego"
            className="btn-secondary inline-flex"
          >
            Enviar mi testimonio
          </a>
        </section>
      </div>
    </div>
  )
}

export default Testimonios
