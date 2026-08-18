# Koenji Studio

Landing page institucional do Koenji Studio, construída com React, TypeScript, Tailwind CSS e vinext.

## Executar

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
```

## Editar conteúdo

- Marca, proprietário, Instagram, Booksy, textos de categorias e todos os caminhos de mídia: `lib/site.ts`
- Conteúdo e composição das seções: `app/page.tsx`
- Direção visual e responsividade: `app/globals.css`
- SEO e compartilhamento social: `app/layout.tsx`
- Guia e destino das fotografias e logos: `public/images/PHOTO-GUIDE.md`

As informações provisórias estão identificadas no código e na própria interface. Ao adicionar fotografias ou a assinatura original, coloque os arquivos em `public/images` e preencha os caminhos correspondentes em `siteConfig.media`.
