// Importamos la fuente de Google Fonts
import { Geist, Geist_Mono } from "next/font/google";

// Importamos los estilos globales
import "@/src/styles/globals.css";

// Definimos las fuentes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Definimos las fuentes
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Definimos la metadata
export const metadata = {
  title: "Proyecto 1 en Next.js",
  description: "Creado por Nicolás Villagrán",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body>
        <main className="min-h-screen p-8 font-(family-name:--font-geist-sans)">
          {children}
        </main>
      </body>
    </html>
  );
}