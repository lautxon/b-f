import { useState, useEffect } from 'react'
import { fetchObras, fetchObraBySlug, fetchCategorias } from '../lib/catalog'

export function useCatalog() {
  const [obras, setObras] = useState([])
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchObras(), fetchCategorias()]).then(([obrasData, catsData]) => {
      setObras(obrasData)
      setCategorias(catsData)
      setLoading(false)
    })
  }, [])

  return { obras, categorias, loading }
}

export function useObra(slug) {
  const [obra, setObra] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    fetchObraBySlug(slug).then((data) => {
      setObra(data)
      setLoading(false)
    })
  }, [slug])

  return { obra, loading }
}
