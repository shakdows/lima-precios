import './globals.css'

export const metadata = {
  title: 'PrecioLima ⚡ — Encuentra donde comprar más barato para revender',
  description: 'Compara precios en tiempo real de Ripley, Saga, Wong, Metro, Plaza Vea, Tottus, Hiraoka, Oechsle, Sodimac y más. Calcula tu precio de reventa con IGV + ganancia.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Bricolage+Grotesque:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
