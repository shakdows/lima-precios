import './globals.css'

export const metadata = {
  title: 'PrecioLima — Encuentra el mejor precio para revender',
  description: 'Compara precios en todas las tiendas de Lima. Encuentra el producto más barato para revender con ganancia.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
