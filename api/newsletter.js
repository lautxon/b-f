// Vercel Serverless Function for newsletter subscription
// POST /api/newsletter { email: "user@example.com" }
// Uses Resend API if configured, otherwise logs to console

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email invalido' })
  }

  const resendApiKey = process.env.RESEND_API_KEY

  if (resendApiKey) {
    // Send via Resend
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'newsletter@barroyfuego.com',
          to: ['aureliadiaz@gmail.com'],
          subject: `Nueva suscripcion: ${email}`,
          html: `<p>Nuevo suscriptor a las novedades de Barro & Fuego:</p><p><strong>${email}</strong></p>`,
        }),
      })

      if (!response.ok) {
        console.error('Resend API error:', await response.text())
        return res.status(500).json({ error: 'Error al procesar la suscripcion' })
      }

      return res.status(200).json({ success: true })
    } catch (error) {
      console.error('Newsletter error:', error)
      return res.status(500).json({ error: 'Error interno' })
    }
  }

  // Fallback: just log the email (no Resend API key configured)
  console.log(`Newsletter subscription: ${email}`)
  return res.status(200).json({ success: true, message: 'Suscripcion registrada' })
}
