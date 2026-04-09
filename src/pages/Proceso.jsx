import { useSEO } from '../hooks/useSEO'

function Proceso() {
  useSEO({
    title: 'El Proceso Creativo — Barro & Fuego',
    description: 'Ocho etapas del proceso creativo de ceramica artesanal: extraccion, amasado, modelado, secado, coccion y resultado.',
    url: 'https://b-f-ten.vercel.app/proceso',
  })

  const etapas = [
    {
      numero: '01',
      titulo: 'La extraccion de la arcilla',
      texto: 'La arcilla roja se extrae a mano de las canteras de la quebrada de Iruya, a mas de 2700 metros de altura. Aurelia elige la veta con ojo experto: ni demasiado dura, ni demasiado blanda. La tierra giusta, como dice ella.',
      detalle: 'Cada cantera tiene su propia personalidad. Algunas dan arcilla mas grasosa, otras mas seca. La experiencia de anos le dice cual servir para cada tipo de pieza.',
      imagen: 'https://picsum.photos/seed/proceso-extraccion/800/600',
    },
    {
      numero: '02',
      titulo: 'El amasado',
      texto: 'La arcilla cruda se limpia de piedras, raices y impurezas. Se mezcla con agua de vertiente y se amasa con los pies y las manos hasta lograr una pasta homogenea. Luego se deja reposar varios dias, tapada con un pano humedo.',
      detalle: 'El reposo es fundamental: la arcilla que no descansa se agrieta en la coccion. Aurelia sabe que la paciencia aqui es la mitad del trabajo.',
      imagen: 'https://picsum.photos/seed/proceso-amasado/800/600',
    },
    {
      numero: '03',
      titulo: 'El modelado',
      texto: 'Sobre la rueda de pie o a mano libre, la arcilla toma forma. Aurelia trabaja en silencio, concentrada. Cada pieza nace del barro sin prisa: las ollas se levantan con las palmas, las vasijas se perfilan con espatula, los adornos se modelan con los dedos.',
      detalle: 'Las piezas grandes se hacen en partes que se unen con barbotina (arcilla liquida). La union debe ser perfecta o la pieza se abre en el horno.',
      imagen: 'https://picsum.photos/seed/proceso-modelado/800/600',
    },
    {
      numero: '04',
      titulo: 'El secado',
      texto: 'Las piezas crudas se secan a la sombra, protegidas del sol directo y del viento de la quebrada. El proceso tarda entre una y tres semanas segun el grosor. Aurelia las gira cada dia para que sequen parejo.',
      detalle: 'Secar demasiado rapido es el error mas comun. La arcilla se contrae al secar, y si una parte seca antes que otra, se produce una grieta irreversible.',
      imagen: 'https://picsum.photos/seed/proceso-secado/800/600',
    },
    {
      numero: '05',
      titulo: 'La primera coccion (bizcocho)',
      texto: 'Las piezas secas se cargan en el horno de lena. Se enciende al atardecer y arde toda la noche, alcanzando 900 grados o mas. A la manana siguiente, el horno se abre y las piezas salen endurecidas, listas para el vidriado.',
      detalle: 'El horno de Aurelia es el mismo que construyo su esposo hace veinte anos. Es de obra, con camara de combustion inferior y tiro natural. Cada coccion es un ritual que depende del clima, la humedad y hasta del viento.',
      imagen: 'https://picsum.photos/seed/proceso-horno/800/600',
    },
    {
      numero: '06',
      titulo: 'El vidriado',
      texto: 'Sobre el bizcocho se aplica el vidriado: una capa de esmalte que vitrifica en la segunda coccion. Aurelia prepara sus propios vidriados con ceniza de lena, oxidos naturales y minerales de la zona. Cada formula es un secreto heredado.',
      detalle: 'Los colores del vidriado dependen de la composicion quimica exacta y de la atmosfera del horno. Oxidante (con oxigeno) da tonos calidos; reductor (sin oxigeno) da tonos ahumados y metalicos.',
      imagen: 'https://picsum.photos/seed/proceso-vidriado/800/600',
    },
    {
      numero: '07',
      titulo: 'La segunda coccion',
      texto: 'Las piezas vidriadas vuelven al horno para la coccion final. Esta vez la temperatura sube hasta los 1000-1100 grados. El vidriado se funde y crea una capa vitrea, brillante o mate segun la formula. Cuando el horno se abre, cada pieza es unica.',
      detalle: 'El fuego tiene la ultima palabra. Dos piezas iguales pueden salir con colores distintos segun su posicion en el horno. Esa imprevisibilidad es parte de la belleza de la ceramica artesanal.',
      imagen: 'https://picsum.photos/seed/proceso-coccion/800/600',
    },
    {
      numero: '08',
      titulo: 'El resultado',
      texto: 'Del horno nacen piezas que llevan la marca del barro, el fuego y las manos de quien las hizo. Cada una es distinta. Cada una cuenta la historia de Iruya, de los Valles Calchaquies, de una tradicion que viene de generaciones.',
      detalle: 'No todas las piezas sobreviven al horno. Algunas se agrietan, otras se deforman. Aurelia acepta la perdida como parte del oficio: el barro decide tanto como ella.',
      imagen: 'https://picsum.photos/seed/proceso-resultado/800/600',
    },
  ]

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">
            Del barro al objeto
          </p>
          <h1 className="text-4xl md:text-5xl text-ink mb-4">
            El proceso creativo
          </h1>
          <p className="text-muted text-base max-w-xl mx-auto leading-relaxed">
            Ocho etapas desde la tierra hasta la pieza terminada.
            Cada paso hecho a mano, con tiempo y paciencia.
          </p>
        </div>

        {/* Timeline de etapas */}
        <div className="space-y-0">
          {etapas.map((etapa, i) => (
            <div
              key={etapa.numero}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-16 border-t border-border ${
                i % 2 === 1 ? 'md:direction-rtl' : ''
              }`}
            >
              {/* Imagen */}
              <div className={i % 2 === 1 ? 'md:order-last md:direction-ltr' : ''}>
                <div
                  className="border border-border rounded-crisp overflow-hidden"
                  style={{
                    width: '100%',
                    paddingTop: '66.67%',
                    position: 'relative',
                    backgroundColor: '#3D2A25',
                  }}
                >
                  <img
                    src={etapa.imagen}
                    alt={etapa.titulo}
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
              </div>

              {/* Texto */}
              <div className="flex flex-col justify-center">
                <span className="text-xs font-mono text-terracotta tracking-widest mb-3">
                  {etapa.numero}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-ink mb-4">
                  {etapa.titulo}
                </h2>
                <p className="text-charcoal leading-relaxed mb-4">
                  {etapa.texto}
                </p>
                <p className="text-muted text-sm leading-relaxed italic">
                  {etapa.detalle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cita final */}
        <section className="py-20 mt-16 border-t border-border text-center">
          <blockquote className="font-serif text-2xl md:text-3xl text-ink max-w-3xl mx-auto leading-relaxed italic">
            "El barro tiene memoria. Yo solo le doy la forma que el quiere tener."
          </blockquote>
          <p className="text-muted mt-6 text-sm">
            Aurelia Diaz
          </p>
        </section>
      </div>
    </div>
  )
}

export default Proceso
