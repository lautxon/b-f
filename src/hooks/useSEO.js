import { useEffect } from 'react'

export function useSEO({ title, description, image, url } = {}) {
  const defaultTitle = 'Barro & Fuego — Ceramica Artesanal de Iruya'
  const defaultDescription = 'Catalogo online de ceramica artesanal. Piezas unicas hechas a mano en Iruya, Salta, Argentina.'
  const defaultImage = 'https://picsum.photos/seed/bf-og-image/1200/630'
  const defaultUrl = 'https://b-f-ten.vercel.app'

  const finalTitle = title || defaultTitle
  const finalDesc = description || defaultDescription
  const finalImage = image || defaultImage
  const finalUrl = url || defaultUrl

  useEffect(() => {
    document.title = finalTitle

    const setMeta = (selector, content) => {
      const el = document.querySelector(`meta[${selector}]`)
      if (el) el.setAttribute('content', content)
    }

    setMeta('name="description"', finalDesc)
    setMeta('property="og:title"', finalTitle)
    setMeta('property="og:description"', finalDesc)
    setMeta('property="og:image"', finalImage)
    setMeta('property="og:url"', finalUrl)
    setMeta('name="twitter:title"', finalTitle)
    setMeta('name="twitter:description"', finalDesc)
    setMeta('name="twitter:image"', finalImage)

    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', finalUrl)
  }, [finalTitle, finalDesc, finalImage, finalUrl])
}
