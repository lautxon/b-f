import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { supabase } from '../lib/supabase'
import { useSEO } from '../hooks/useSEO'
import {
  Plus,
  PencilSimple,
  Trash,
  SignOut,
  UploadSimple,
  Image as ImageIcon,
} from '@phosphor-icons/react'

function Admin() {
  useSEO({ title: 'Admin — Barro & Fuego' })
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [obras, setObras] = useState([])
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    slug: '',
    categoria_id: '',
    ano_creacion: new Date().getFullYear(),
    tecnica: '',
    descripcion: '',
    precio_ars: '',
    imagen_url: '',
    disponible: true,
  })
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    if (!supabase) return
    const [obrasRes, catsRes] = await Promise.all([
      supabase.from('obras').select('*').order('creado_en', { ascending: false }),
      supabase.from('categorias').select('*').order('nombre'),
    ])
    if (obrasRes.data) setObras(obrasRes.data)
    if (catsRes.data) setCategorias(catsRes.data)
    setLoading(false)
  }

  function openForm(obra = null) {
    if (obra) {
      setEditingId(obra.id)
      setFormData({
        nombre: obra.nombre,
        slug: obra.slug,
        categoria_id: obra.categoria_id || '',
        ano_creacion: obra.ano_creacion,
        tecnica: obra.tecnica || '',
        descripcion: obra.descripcion || '',
        precio_ars: obra.precio_ars.toString(),
        imagen_url: obra.imagen_url || '',
        disponible: obra.disponible,
      })
    } else {
      setEditingId(null)
      setFormData({
        nombre: '',
        slug: '',
        categoria_id: categorias[0]?.id || '',
        ano_creacion: new Date().getFullYear(),
        tecnica: '',
        descripcion: '',
        precio_ars: '',
        imagen_url: '',
        disponible: true,
      })
    }
    setShowForm(true)
    setError('')
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
    setError('')
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0]
    if (!file || !supabase) return

    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`
    const filePath = `catalogo/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('catalogo')
      .upload(filePath, file)

    if (uploadError) {
      setError('Error al subir la imagen: ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('catalogo').getPublicUrl(filePath)
    setFormData((prev) => ({ ...prev, imagen_url: data.publicUrl }))
    setUploading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!supabase) return
    setSubmitting(true)
    setError('')

    const payload = {
      nombre: formData.nombre,
      slug: formData.slug || formData.nombre.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      categoria_id: formData.categoria_id || null,
      ano_creacion: parseInt(formData.ano_creacion),
      tecnica: formData.tecnica,
      descripcion: formData.descripcion,
      precio_ars: parseFloat(formData.precio_ars),
      imagen_url: formData.imagen_url,
      disponible: formData.disponible,
    }

    let result
    if (editingId) {
      result = await supabase.from('obras').update(payload).eq('id', editingId)
    } else {
      result = await supabase.from('obras').insert(payload)
    }

    setSubmitting(false)

    if (result.error) {
      setError(result.error.message)
    } else {
      closeForm()
      fetchData()
    }
  }

  async function handleDelete(id) {
    if (!supabase) return
    if (!confirm('¿Eliminar esta obra permanentemente?')) return
    const { error } = await supabase.from('obras').delete().eq('id', id)
    if (error) {
      setError(error.message)
    } else {
      fetchData()
    }
  }

  async function handleLogout() {
    await signOut()
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <p className="text-muted">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-canvas">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl text-ink">Admin</h1>
            <p className="text-xs text-muted">{user?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="text-sm text-muted hover:text-ink transition-colors"
              onClick={() => navigate('/')}
            >
              Ver sitio
            </button>
            <button
              className="btn-secondary text-sm py-2 px-4"
              onClick={handleLogout}
            >
              <SignOut size={14} />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif text-ink">Obras del catalogo</h2>
          <button className="btn-primary text-sm" onClick={() => openForm()}>
            <Plus size={16} />
            Nueva obra
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded bg-ceramic-red/20 border border-ceramic-red/30 text-sm text-terracotta-light">
            {error}
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="mb-8 border border-border rounded-crisp p-6 bg-card">
            <h3 className="font-serif text-lg text-ink mb-4">
              {editingId ? 'Editar obra' : 'Nueva obra'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.1em] text-muted mb-1.5">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.1em] text-muted mb-1.5">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="Se genera automaticamente si se deja vacio"
                    className="w-full px-3 py-2 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.1em] text-muted mb-1.5">
                    Categoria
                  </label>
                  <select
                    value={formData.categoria_id}
                    onChange={(e) => setFormData({ ...formData, categoria_id: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-terracotta"
                  >
                    <option value="">Sin categoria</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.1em] text-muted mb-1.5">
                    Ano de creacion
                  </label>
                  <input
                    type="number"
                    value={formData.ano_creacion}
                    onChange={(e) => setFormData({ ...formData, ano_creacion: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.1em] text-muted mb-1.5">
                    Precio (ARS)
                  </label>
                  <input
                    type="number"
                    value={formData.precio_ars}
                    onChange={(e) => setFormData({ ...formData, precio_ars: e.target.value })}
                    required
                    step="0.01"
                    className="w-full px-3 py-2 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.1em] text-muted mb-1.5">
                    Tecnica
                  </label>
                  <input
                    type="text"
                    value={formData.tecnica}
                    onChange={(e) => setFormData({ ...formData, tecnica: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-terracotta"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.1em] text-muted mb-1.5">
                  Descripcion
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-terracotta resize-none"
                />
              </div>

              {/* Imagen */}
              <div>
                <label className="block text-xs uppercase tracking-[0.1em] text-muted mb-1.5">
                  Imagen
                </label>
                <div className="flex items-center gap-4">
                  {formData.imagen_url && (
                    <div className="w-20 h-20 rounded-crisp overflow-hidden border border-border flex-shrink-0">
                      <img src={formData.imagen_url} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={formData.imagen_url}
                      onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })}
                      placeholder="URL de la imagen"
                      className="w-full px-3 py-2 text-sm border border-border rounded-crisp bg-canvas focus:outline-none focus:border-terracotta mb-2"
                    />
                    <label className="btn-secondary text-xs inline-flex cursor-pointer">
                      <UploadSimple size={14} />
                      {uploading ? 'Subiendo...' : 'Subir imagen'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-charcoal cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.disponible}
                    onChange={(e) => setFormData({ ...formData, disponible: e.target.checked })}
                    className="accent-terracotta"
                  />
                  Disponible
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary text-sm" disabled={submitting}>
                  {submitting ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
                </button>
                <button type="button" className="btn-secondary text-sm" onClick={closeForm}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de obras */}
        <div className="border border-border rounded-crisp overflow-hidden bg-card">
          {obras.length === 0 ? (
            <div className="py-16 text-center">
              <ImageIcon size={48} className="text-muted mx-auto mb-4" />
              <p className="text-muted">No hay obras en el catalogo todavia.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {obras.map((obra) => (
                <div key={obra.id} className="flex items-center gap-4 p-4 hover:bg-canvas-light transition-colors">
                  {obra.imagen_url && (
                    <div className="w-16 h-16 rounded-crisp overflow-hidden border border-border flex-shrink-0">
                      <img src={obra.imagen_url} alt={obra.nombre} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-ink truncate">{obra.nombre}</h4>
                    <p className="text-xs text-muted">
                      {obra.tecnica || 'Sin tecnica'} · ${new Intl.NumberFormat('es-AR').format(obra.precio_ars)}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    obra.disponible
                      ? 'bg-pale-green text-green-dark'
                      : 'bg-ceramic-red/20 text-muted'
                  }`} style={{
                    backgroundColor: obra.disponible ? 'rgba(52,101,56,0.15)' : 'rgba(139,58,47,0.15)',
                    color: obra.disponible ? '#6B9B6F' : '#9B8A82',
                  }}>
                    {obra.disponible ? 'Disponible' : 'Vendida'}
                  </span>
                  <button
                    className="p-2 text-muted hover:text-ink transition-colors"
                    onClick={() => openForm(obra)}
                    title="Editar"
                  >
                    <PencilSimple size={16} />
                  </button>
                  <button
                    className="p-2 text-muted hover:text-terracotta transition-colors"
                    onClick={() => handleDelete(obra.id)}
                    title="Eliminar"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Admin
