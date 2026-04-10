import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useSEO } from '../hooks/useSEO'

function Blog() {
  useSEO({
    title: 'Blog — Barro & Fuego',
    description: 'Historias del proceso creativo de Aurelia Diaz: la arcilla, el horno, el modelado y la coccion.',
    url: 'https://b-f-ten.vercel.app/blog',
  })

  const [articulos, setArticulos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('articulos')
      .select('id, titulo, slug, extracto, imagen_portada, fecha_publicacion')
      .eq('publicado', true)
      .order('fecha_publicacion', { ascending: false })
      .then(({ data }) => {
        if (data) setArticulos(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="py-32 text-center"><p className="text-muted">Cargando articulos...</p></div>
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">
            Historias del taller
          </p>
          <h1 className="text-4xl md:text-5xl text-ink mb-4">
            Blog
          </h1>
          <p className="text-muted text-base max-w-xl mx-auto leading-relaxed">
            Relatos sobre el proceso creativo de Aurelia Diaz.
            De la arcilla al fuego, del barro al objeto.
          </p>
        </div>

        {articulos.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-muted">No hay articulos publicados todavia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articulos.map((art) => (
              <Link
                key={art.id}
                to={`/blog/${art.slug}`}
                className="group border border-border rounded-crisp overflow-hidden bg-card card-hover block"
              >
                {art.imagen_portada && (
                  <div className="aspect-[16/9] overflow-hidden bg-border">
                    <img
                      src={art.imagen_portada}
                      alt={art.titulo}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="font-serif text-xl text-ink mb-2 group-hover:text-terracotta transition-colors">
                    {art.titulo}
                  </h2>
                  {art.extracto && (
                    <p className="text-sm text-muted leading-relaxed line-clamp-3">
                      {art.extracto}
                    </p>
                  )}
                  <p className="text-xs text-muted mt-4">
                    {new Date(art.fecha_publicacion).toLocaleDateString('es-AR', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
