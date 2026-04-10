import { supabase } from '../lib/supabase'
import catalogSeed from '../data/catalog-seed.json'

function isSupabaseReady() {
  return supabase !== null
}

/**
 * Fetches all available obras from Supabase.
 * Falls back to seed JSON data if tables don't exist.
 */
export async function fetchObras() {
  if (!isSupabaseReady()) return catalogSeed
  try {
    const { data, error } = await supabase
      .from('obras')
      .select(`
        id,
        nombre,
        slug,
        ano_creacion,
        tecnica,
        descripcion,
        precio_ars,
        imagen_url,
        disponible,
        creado_en,
        categorias (
          nombre,
          slug
        )
      `)
      .eq('disponible', true)
      .order('creado_en', { ascending: false })

    if (error) throw error

    return data.map((obra) => ({
      id: obra.id,
      nombre: obra.nombre,
      slug: obra.slug,
      categoria: obra.categorias?.slug || 'objetos-varios',
      anoCreacion: obra.ano_creacion,
      tecnica: obra.tecnica,
      descripcion: obra.descripcion,
      precioArs: obra.precio_ars,
      imagenUrl: obra.imagen_url,
      disponible: obra.disponible,
    }))
  } catch {
    // Fallback to seed data if table doesn't exist
    return catalogSeed
  }
}

/**
 * Fetches a single obra by slug.
 */
export async function fetchObraBySlug(slug) {
  if (!isSupabaseReady()) return catalogSeed.find((o) => o.slug === slug)
  try {
    const { data, error } = await supabase
      .from('obras')
      .select(`
        id,
        nombre,
        slug,
        ano_creacion,
        tecnica,
        descripcion,
        precio_ars,
        imagen_url,
        disponible,
        categorias (
          nombre,
          slug
        )
      `)
      .eq('slug', slug)
      .single()

    if (error) throw error

    return {
      id: data.id,
      nombre: data.nombre,
      slug: data.slug,
      categoria: data.categorias?.slug || 'objetos-varios',
      anoCreacion: data.ano_creacion,
      tecnica: data.tecnica,
      descripcion: data.descripcion,
      precioArs: data.precio_ars,
      imagenUrl: data.imagen_url,
      disponible: data.disponible,
    }
  } catch {
    // Fallback to seed data
    return catalogSeed.find((o) => o.slug === slug)
  }
}

/**
 * Fetches all categorias.
 */
export async function fetchCategorias() {
  if (!isSupabaseReady()) {
    return [
      { nombre: 'Todas', slug: 'todas', descripcion: null },
      { nombre: 'Objetos utilitarios', slug: 'objetos-utilitarios', descripcion: null },
      { nombre: 'Objetos varios', slug: 'objetos-varios', descripcion: null },
    ]
  }
  try {
    const { data, error } = await supabase
      .from('categorias')
      .select('nombre, slug, descripcion')
      .order('nombre')

    if (error) throw error

    return data
  } catch {
    return [
      { nombre: 'Todas', slug: 'todas', descripcion: null },
      { nombre: 'Objetos utilitarios', slug: 'objetos-utilitarios', descripcion: null },
      { nombre: 'Objetos varios', slug: 'objetos-varios', descripcion: null },
    ]
  }
}
