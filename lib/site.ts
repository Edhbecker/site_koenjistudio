export const siteConfig = {
  brandName: "Koenji Studio",
  ownerName: "Bento Eurides",
  bentoBiographyNote: null as string | null,
  instagramHandle: "@koenjistudio",
  instagramUrl: "https://www.instagram.com/koenjistudio/",
  bookingUrl:
    "https://booksy.com/pt-br/dl/show-business/421566?utm_medium=c2c_referral",
  // Mídia centralizada: fotos reais de cortes e do espaço alimentam as áreas visuais.
  media: {
    logoLight: null as string | null,
    logoDark: null as string | null,
    // Mesmo retrato de corte_v1 (3).jpeg na abertura e no manifesto editorial.
    hero: "/images/optimized/corte-v1-3.webp" as string | null,
    editorialBreak: "/images/optimized/corte-v1-3.webp" as string | null,
    bento: "/images/bento.jpeg",
    studio: [
      "/images/optimized/espaco-10.webp",
      "/images/optimized/espaco-6.webp",
      "/images/optimized/espaco-15.webp",
      "/images/optimized/espaco-16.webp",
    ] as (string | null)[],
    cuts: [
      "/images/optimized/corte-v1-2.webp",
      "/images/optimized/corte-v1-4.webp",
      "/images/optimized/corte-v2-1.webp",
      "/images/optimized/corte-v1-6.webp",
      "/images/optimized/corte-v2-2.webp",
      "/images/optimized/corte-v2-4.webp",
    ] as (string | null)[],
    instagram: [
      "/images/optimized/corte-v1-1.webp",
      "/images/optimized/corte-v1-5.webp",
      "/images/optimized/corte-v2-3.webp",
      "/images/optimized/corte-v1-3.webp",
    ] as (string | null)[],
  },
} as const;

export const studioPhotos = [
  { label: "Interior / 01", file: "espaco (10).jpeg", position: "52% 55%", alt: "Interior do Koenji Studio com recepção, frigobar vermelho e cadeira de atendimento" },
  { label: "Estação / 02", file: "espaco (6).jpeg", position: "46% 52%", alt: "Estação de atendimento com cadeira, lavatório, espelho e luminária de papel" },
  { label: "Detalhes / 03", file: "espaco (15).jpeg", position: "42% 58%", alt: "Máquinas, tesouras e produtos organizados na bancada vermelha da barbearia" },
  { label: "Fachada / 04", file: "espaco (16).jpeg", position: "64% 32%", alt: "Fachada do Koenji Studio com assinatura no letreiro e adesivos nas portas de vidro" },
] as const;

// Categorias editoriais provisórias: confirme e ajuste conforme os serviços reais.
export const cutPhotos = [
  { label: "Cut / 001", category: "Design", file: "corte_v1 (2).jpeg", position: "50% 44%", alt: "Corte com degradê e desenho de penas na lateral e na nuca" },
  { label: "Cut / 002", category: "Textured", file: "corte_v1 (4).jpeg", position: "50% 50%", alt: "Cabelo cacheado com pontas claras e linhas curvas desenhadas na nuca" },
  { label: "Style / 003", category: "Classic", file: "corte_v2 (1).PNG", position: "50% 45%", alt: "Corte clássico penteado para o lado com acabamento em degradê" },
  { label: "Cut / 004", category: "Platinum", file: "corte_v1 (6).jpeg", position: "50% 68%", alt: "Cabelo loiro com degradê baixo, visto de perfil" },
  { label: "Cut / 005", category: "Fade", file: "corte_v2 (2).PNG", position: "50% 45%", alt: "Corte curto e texturizado com degradê lateral" },
  { label: "Style / 006", category: "Finish", file: "corte_v2 (4).PNG", position: "50% 48%", alt: "Detalhe do acabamento em degradê em cabelo cacheado escuro" },
] as const;

export const instagramPhotos = [
  { file: "corte_v1 (1).jpeg", position: "50% 45%", alt: "Corte com degradê lateral e topo curto no Koenji Studio" },
  { file: "corte_v1 (5).jpeg", position: "50% 50%", alt: "Cabelo de comprimento médio penteado para trás, visto de perfil" },
  { file: "corte_v2 (3).PNG", position: "50% 44%", alt: "Corte com topo texturizado e degradê no ambiente da barbearia" },
  { file: "corte_v1 (3).jpeg", position: "50% 24%", alt: "Retrato em preto e branco com cabelo afro e barba" },
] as const;
