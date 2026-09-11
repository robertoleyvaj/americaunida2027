import "./globals.css";

export const metadata = {
  title: "América Unida · Baja California 2027 | Encuentro internacional",
  description:
    "América Unida – Baja California 2027. Encuentro internacional de integración y fraternidad. 12–15 de agosto de 2027, Baja California, México. De toda América venimos. En Baja California nos encontramos.",
  openGraph: {
    title: "América Unida · Baja California 2027",
    description:
      "De toda América venimos. En Baja California nos encontramos. Encuentro internacional · 12–15 de agosto de 2027 · Baja California.",
    type: "website",
    locale: "es_MX",
  },
};

export const viewport = {
  themeColor: "#0A1F44",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Tipografía del blueprint: Montserrat (títulos) + Inter (texto) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
