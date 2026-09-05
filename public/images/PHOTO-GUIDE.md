# Guia de fotografias e marca

As fotos atualizadas estão conectadas em `lib/site.ts`. O layout, as seis posições da galeria de cortes, as quatro do espaço e as quatro do Instagram foram preservados.

## Abertura e manifesto

`corte_v1 (3).jpeg` é o retrato em preto e branco com cabelo afro. Está na abertura e continua no bloco **Koenji / Barbershop — YOUR HAIR. YOUR STYLE. YOUR IDENTITY.**

## Distribuição dos cortes

| Quadro | Arquivo original | Motivo |
| --- | --- | --- |
| Cut / 001 · Design | corte_v1 (2).jpeg | Desenho de penas e degradê |
| Cut / 002 · Textured | corte_v1 (4).jpeg | Cachos com pontas claras e linhas na nuca |
| Style / 003 · Classic | corte_v2 (1).PNG | Penteado clássico com acabamento lateral |
| Cut / 004 · Platinum | corte_v1 (6).jpeg | Cabelo loiro com degradê baixo |
| Cut / 005 · Fade | corte_v2 (2).PNG | Perfil do corte curto e texturizado |
| Style / 006 · Finish | corte_v2 (4).PNG | Detalhe do acabamento em cabelo cacheado |
| Instagram / 01 | corte_v1 (1).jpeg | Perfil com degradê |
| Instagram / 02 | corte_v1 (5).jpeg | Cabelo médio penteado para trás |
| Instagram / 03 | corte_v2 (3).PNG | Topo texturizado no ambiente da barbearia |
| Instagram / 04 | corte_v1 (3).jpeg | Retrato afro em preto e branco |

## Apresentação do espaço

| Quadro | Arquivo original | Motivo |
| --- | --- | --- |
| Interior / 01 | espaco (10).jpeg | Visão do atendimento e da recepção |
| Estação / 02 | espaco (6).jpeg | Foto vertical adequada ao quadro estreito, com cadeira, lavatório e iluminação |
| Detalhes / 03 | espaco (15).jpeg | Bancada vermelha com máquinas e tesouras |
| Fachada / 04 | espaco (16).jpeg | Fachada atual com letreiro e adesivos |

Todas as 15 fotos disponíveis do ambiente foram analisadas. Foram escolhidas quatro vistas complementares para manter a composição existente. Os demais originais ficam disponíveis para futuras trocas: `1` (estação), `5` (interior inclinado), `7` (espera), `8` (fachada anterior aos adesivos), `9` (adesivos em detalhe), `11` (equipamento aberto), `12` (espera), `13` e `14` (recepção), `17` (fachada distante) e `18` (entrada e capacho).

## Arquivos otimizados

O site carrega cópias WebP em `optimized/`, sem modificar os originais. Os nomes indicam a origem: `corte-v1-3.webp` corresponde a `corte_v1 (3).jpeg`, por exemplo. As faixas pretas externas das fotos de cortes foram removidas nessas cópias, sem alterar o conteúdo fotográfico. As imagens maiores foram reduzidas sem ampliação artificial, com qualidade WebP 86.

Os pontos de enquadramento ficam nos metadados de cada foto em `lib/site.ts`; a abertura tem enquadramentos próprios para celular e computador em `app/globals.css`. Os filtros visuais existentes foram mantidos.

O retrato `bento.jpeg` também está conectado ao quadro dedicado ao Bento.

Os placeholders restantes são intencionais e aguardam as assinaturas visuais corretas:

- `brand/koenji-logo-white.png` — assinatura original clara
- `brand/koenji-logo-black.png` — assinatura original escura

Para substituir uma foto no futuro, atualizar o caminho e seus metadados juntos em `lib/site.ts`, mantendo a separação entre cortes e ambiente.
