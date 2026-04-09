import { useSEO } from '../hooks/useSEO'

function Bio() {
  useSEO({
    title: 'Aurelia Diaz — Barro & Fuego',
    description: 'Historia y proceso creativo de Aurelia Diaz, ceramista en Iruya, Salta, Argentina. Del barro nace la forma.',
    url: 'https://b-f-ten.vercel.app/bio',
  })

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero Bio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20">
          <div
            className="border border-border rounded-crisp overflow-hidden"
            style={{ width: '100%', paddingTop: '125%', position: 'relative', backgroundColor: '#3D2A25' }}
          >
            <img
              src="https://picsum.photos/seed/aurelia-iruya/800/1000"
              alt="Aurelia Diaz en su taller de Iruya"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">
              Ceramista -- Iruya, Salta
            </p>
            <h1 className="text-4xl md:text-5xl text-ink mb-6">
              Aurelia Diaz
            </h1>
            <p className="text-charcoal leading-relaxed mb-4">
              Aurelia nacio y crecio en Iruya, un pueblo perdido a 2700 metros
              de altura en los Valles Calchaquies de Salta. Aprendio el oficio
              de la ceramica de su abuela, Doña Carmen, que a su vez lo habia
              aprendido de la suya.
            </p>
            <p className="text-charcoal leading-relaxed mb-4">
              Trabaja la arcilla roja de la quebrada, la que se saca a mano,
              se limpia, se amasa y se deja reposar. Cada pieza la modela
              sola, en silencio, con el cuerpo acompasando el ritmo de las
              manos.
            </p>
            <p className="text-muted leading-relaxed">
              Su horno es de lena, el mismo que construyo su esposo hace veinte
              anos. Cada coccion es un ritual: se prende al atardecer y se abre
              a la manana siguiente. Ahi, entre las cenizas y el calor, nacen
              las piezas de Barro & Fuego.
            </p>
          </div>
        </div>

        {/* Proceso */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl text-ink mb-3 text-center">
            El proceso
          </h2>
          <p className="text-muted text-center mb-12 max-w-xl mx-auto">
            De la tierra al objeto. Cada etapa hecha a mano, con tiempo y paciencia.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                paso: '01',
                titulo: 'La arcilla',
                texto: 'Arcilla roja de la quebrada, limpia de piedras y raices. Se amasa con agua y se deja reposar dias hasta que este lista.',
              },
              {
                paso: '02',
                titulo: 'La forma',
                texto: 'Modelado a mano o torneado. Cada pieza toma forma despacio, sin prisa. Los detalles vienen de la observacion: el agua, el viento, las piedras del rio.',
              },
              {
                paso: '03',
                titulo: 'El fuego',
                texto: 'Secado al sol de montana durante una semana. Luego, coccion en horno de lena a mas de 900 grados. El fuego decide los colores finales.',
              },
            ].map((item, i) => (
              <div
                key={item.paso}
                className="border border-border rounded-crisp p-8 bg-card"
              >
                <span className="text-xs font-mono text-terracotta tracking-widest">
                  {item.paso}
                </span>
                <h3 className="font-serif text-xl text-ink mt-3 mb-3">
                  {item.titulo}
                </h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Cita */}
        <section className="py-16 md:py-24 border-t border-b border-border text-center">
          <blockquote className="font-serif text-2xl md:text-3xl text-ink max-w-3xl mx-auto leading-relaxed italic">
            "El barro tiene memoria. Yo solo le doy la forma que el quiere tener."
          </blockquote>
          <p className="text-muted mt-6 text-sm">
            Aurelia Diaz
          </p>
        </section>

        {/* Trayectoria */}
        <section className="py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl text-ink mb-10">
            Trayectoria
          </h2>
          <div className="space-y-0">
            {[
              {
                ano: '2018',
                evento: 'Primera feria artesanal en Humahuaca. Vende sus primeras 12 piezas.',
              },
              {
                ano: '2019',
                evento: 'Participa del Encuentro de Ceramicistas del NOA en Jujuy.',
              },
              {
                ano: '2021',
                evento: 'Abre su taller propio en Iruya. Comienza a vender online a traves de redes sociales.',
              },
              {
                ano: '2023',
                evento: 'Exposicion colectiva en Salta Capital. Sus piezas llaman la atencion por la fusion de tecnica ancestral y diseno contemporaneo.',
              },
              {
                ano: '2024',
                evento: 'Lanza Barro & Fuego, su catalogo online con envios a todo el pais y el exterior.',
              },
            ].map((item, i) => (
              <div
                key={item.ano}
                className="flex gap-6 py-5 border-b border-border"
              >
                <span className="text-sm font-mono text-terracotta flex-shrink-0 w-12 pt-0.5">
                  {item.ano}
                </span>
                <p className="text-charcoal text-sm leading-relaxed">
                  {item.evento}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Bio
