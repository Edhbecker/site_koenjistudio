export const siteConfig = {
  brandName: "Koenji Studio",
  ownerName: "Bento Eurides",
  bentoBiographyNote: null as string | null,
  instagramHandle: "@koenjistudio",
  instagramUrl: "https://www.instagram.com/koenjistudio/",
  bookingUrl:
    "https://booksy.com/pt-br/dl/show-business/421566?utm_medium=c2c_referral",
  // Mídia centralizada: os arquivos de corte reais alimentam as áreas visuais.
  media: {
    logoLight: null as string | null,
    logoDark: null as string | null,
    hero: "/images/corte (5).jpeg" as string | null,
    editorialBreak: "/images/corte (2).jpeg" as string | null,
    bento: "/images/bento.jpeg",
    studio: [
      "/images/corte (3).jpeg",
      "/images/corte (7).jpeg",
      "/images/corte (8).jpeg",
      "/images/corte (10).jpeg",
      "/images/corte (11).jpeg",
      "/images/corte (6).jpeg",
    ] as (string | null)[],
    cuts: [
      "/images/corte (1).jpeg",
      "/images/corte (3).jpeg",
      "/images/corte (4).jpeg",
      "/images/corte (6).jpeg",
      "/images/corte (7).jpeg",
      "/images/corte (9).jpeg",
    ] as (string | null)[],
    instagram: [
      "/images/corte (2).jpeg",
      "/images/corte (5).jpeg",
      "/images/corte (8).jpeg",
      "/images/corte (11).jpeg",
    ] as (string | null)[],
  },
} as const;

export const studioPhotos = [
  { label: "Space / 01", file: "studio/studio-01.jpg" },
  { label: "Detail / 02", file: "studio/studio-02.jpg" },
  { label: "Barber station / 03", file: "studio/studio-03.jpg" },
  { label: "Interior / 04", file: "studio/studio-04.jpg" },
  { label: "Tools / 05", file: "studio/studio-05.jpg" },
  { label: "Atmosphere / 06", file: "studio/studio-06.jpg" },
] as const;

// Categorias editoriais provisórias: confirme e ajuste conforme os serviços reais.
export const cutPhotos = [
  { label: "Cut / 001", category: "Design", file: "corte (1).jpeg" },
  { label: "Cut / 002", category: "Textured", file: "corte (3).jpeg" },
  { label: "Style / 003", category: "Classic", file: "corte (4).jpeg" },
  { label: "Cut / 004", category: "Platinum", file: "corte (6).jpeg" },
  { label: "Cut / 005", category: "Fade", file: "corte (7).jpeg" },
  { label: "Style / 006", category: "Finish", file: "corte (9).jpeg" },
] as const;
