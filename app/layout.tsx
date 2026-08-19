import type { Metadata } from "next";
import "./globals.css";

const title = "Koenji Studio | Barbearia";
const description =
  "Barbearia, estilo e cultura. Conheça o Koenji Studio, o trabalho de Bento Eurides e agende seu horário pelo Booksy.";

export const metadata: Metadata = {
  metadataBase: new URL("https://koenjistudio.onrender.com"),
  title,
  description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Koenji Studio",
    title,
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Koenji Studio — Cut, Style, Culture" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
