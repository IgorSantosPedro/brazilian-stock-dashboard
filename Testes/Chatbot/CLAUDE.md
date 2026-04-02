# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Como rodar

Abra `index.html` diretamente no browser — sem build step, sem instalação.

## Arquitetura

Aplicação single-file (`index.html`) com três camadas inline:

**HTML** — Landing page completa do ConvênioSaúde+ (convênio médico fictício):
- Header fixo com nav responsiva e menu mobile
- Hero, Stats, Planos (Básico/Premium/VIP), Benefícios, Depoimentos, CTA, Footer
- Âncoras de navegação: `#planos`, `#beneficios`, `#depoimentos`, `#contato`, `#cobertura`

**CSS** — `<style>` inline + Tailwind CSS v3 via CDN (`cdn.tailwindcss.com`):
- Animações customizadas: `slideUp` (painel do chat), `typingBounce` (dots de digitação), `pulse` (indicador online), `fadeIn` (mensagens)
- Paleta da marca: **teal** (`teal-500/600/700`) para o site e o chatbot

**JavaScript** — `<script>` inline, vanilla JS puro:
- `openChat()` / `closeChat()` / `toggleChat()` — controlam visibilidade do painel
- `renderBotMsg(text, options)` — exibe indicador de digitação por 800ms, depois renderiza a mensagem com botões de opção
- `renderUserMsg(text)` — renderiza mensagem do usuário
- `handleOption(btn, option)` — desabilita os botões do turno atual e chama `respond(option)`
- `respond(option)` — switch com toda a lógica de conversa; adicionar novos fluxos = adicionar cases aqui
- `escHtml` / `escAttr` — sanitização de strings antes de inserir no DOM
- Constante `MENU` — array com as 5 opções do menu principal, reutilizada em múltiplos casos do switch

## Dependências externas (CDN)

- `https://cdn.tailwindcss.com` — Tailwind CSS v3
- `https://fonts.googleapis.com/css2?family=Inter` — fonte Inter
