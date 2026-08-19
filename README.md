# Koenji Studio

Landing page institucional do Koenji Studio, construída com Next.js, React, TypeScript e Tailwind CSS.

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

## Deploy no Render

O projeto utiliza a exportação estática do Next.js e gera o diretório `out` durante o build.

```text
Service Type: Static Site
Branch: main
Build Command: npm install && npm run build
Publish Directory: out
```
