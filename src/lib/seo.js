/**
 * Injects schema.org JSON-LD structured data for SEO.
 * Call on pages where product/organization data is relevant.
 */

export function injectOrganizationSchema() {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Barro & Fuego",
    "url": "https://b-f-ten.vercel.app",
    "logo": "https://b-f-ten.vercel.app/icons/favicon.svg",
    "description": "Ceramica artesanal de Aurelia Diaz, Iruya, Salta, Argentina.",
    "email": "aureliadiaz@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Iruya",
      "addressRegion": "Salta",
      "addressCountry": "AR"
    }
  })
  document.head.appendChild(script)
  return () => document.head.removeChild(script)
}

export function injectProductSchema(obra) {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": obra.nombre,
    "description": obra.descripcion,
    "image": obra.imagenUrl,
    "brand": {
      "@type": "Brand",
      "name": "Barro & Fuego"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "ARS",
      "price": obra.precioArs.toString(),
      "availability": obra.disponible
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
      "url": `https://b-f-ten.vercel.app/catalogo/${obra.slug}`
    },
    "material": "Ceramica artesanal",
    "category": obra.categoria === 'objetos-utilitarios'
      ? 'Objeto utilitario'
      : 'Objeto decorativo'
  })
  document.head.appendChild(script)
  return () => document.head.removeChild(script)
}

export function injectWebsiteSchema() {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Barro & Fuego",
    "url": "https://b-f-ten.vercel.app",
    "description": "Catalogo online de ceramica artesanal de Iruya, Salta, Argentina.",
    "inLanguage": "es-AR",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://b-f-ten.vercel.app/catalogo?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  })
  document.head.appendChild(script)
  return () => document.head.removeChild(script)
}
