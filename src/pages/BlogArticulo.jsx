import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useSEO } from '../hooks/useSEO'
import { ArrowLeft } from '@phosphor-icons/react'

function BlogArticulo() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [articulo, setArticulo] = useState(null)
  const [loading, setLoading] = useState(true)

  useSEO({
    title: articulo ? `${articulo.titulo} — Barro & Fuego` : 'Blog — Barro & Fuego',
    description: articulo?.extracto,
    image: articulo?.imagen_portada,
    url: `https://b-f-ten.vercel.app/blog/${slug}`,
  })

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('articulos')
      .select('*')
      .eq('slug', slug)
      .eq('publicado', true)
      .single()
      .then(({ data }) => {
        if (data) setArticulo(data)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return <div className="py-32 text-center"><p className="text-muted">Cargando articulo...</p></div>
  }

  if (!articulo) {
    return (
      <div className="py-32 text-center">
        <p className="text-muted mb-6">Articulo no encontrado</p>
        <Link to="/blog" className="btn-secondary">
          Volver al blog
        </Link>
      </div>
    )
  }

  const paragraphs = articulo.contenido.split('\n\n').filter(Boolean)

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <button
          className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors mb-10"
          onClick={() => navigate('/blog')}
        >
          <ArrowLeft size={16} />
          Volver al blog
        </button>

        {articulo.imagen_portada && (
          <div className="aspect-[16/9] rounded-crisp overflow-hidden border border-border bg-border mb-10">
            <img
              src={articulo.imagen_portada}
              alt={articulo.titulo}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <p className="text-xs text-muted mb-3">
          {new Date(articulo.fecha_publicacion).toLocaleDateString('es-AR', {
            year: 'numeric', month: 'long', day: 'numeric',
          })}
        </p>

        <h1 className="font-serif text-3xl md:text-4xl text-ink mb-6">
          {articulo.titulo}
        </h1>

        {articulo.extracto && (
          <p className="text-lg text-charcoal italic mb-10 leading-relaxed border-l-2 border-terracotta pl-4">
            {articulo.extracto}
          </p>
        )}

        <div className="space-y-6 text-charcoal leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-base">
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogArticulo
