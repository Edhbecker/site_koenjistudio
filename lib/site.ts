export const siteConfig = {
  brandName: "Koenji Studio",
  ownerName: "Bento Eurides",
  instagramHandle: "@koenjistudio",
  instagramUrl: "https://www.instagram.com/koenjistudio/",
  bookingUrl:
    "https://booksy.com/pt-br/dl/show-business/421566?utm_medium=c2c_referral",
  // Adicione os arquivos em /public/images e preencha os caminhos abaixo.
  media: {
    logoLight: null as string | null,
    logoDark: null as string | null,
    hero: null as string | null,
    editorialBreak: null as string | null,
    bento: null as string | null,
    studio: [null, null, null, null, null, null] as (string | null)[],
    cuts: [null, null, null, null, null, null] as (string | null)[],
    instagram: [null, null, null, null] as (string | null)[],
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
  { label: "Cut / 001", category: "Fade", file: "cuts/cut-01.jpg" },
  { label: "Cut / 002", category: "Taper", file: "cuts/cut-02.jpg" },
  { label: "Style / 003", category: "Textured", file: "cuts/cut-03.jpg" },
  { label: "Cut / 004", category: "Classic", file: "cuts/cut-04.jpg" },
  { label: "Cut / 005", category: "Scissor", file: "cuts/cut-05.jpg" },
  { label: "Style / 006", category: "Hair + beard", file: "cuts/cut-06.jpg" },
] as const;
