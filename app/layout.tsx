import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "Koenji Studio | Barbearia";
const description =
  "Barbearia, estilo e cultura. Conheça o Koenji Studio, o trabalho de Bento Eurides e agende seu horário pelo Booksy.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", origin).toString();

  return {
    metadataBase: origin,
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
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Koenji Studio — Cut, Style, Culture" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

