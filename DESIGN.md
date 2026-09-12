---
name: Vitale Medicine
description: Quiet medical luxury — autoridade médica, acolhimento e precisão, preservando a identidade Vitale.
colors:
  primary: "#5DB5A4"
  primary-light: "#7EC7BA"
  action: "#2F766A"
  action-hover: "#265F55"
  action-active: "#1A2E2A"
  gold: "#C5A059"
  ink: "#1A2E2A"
  muted: "#5A716E"
  canvas: "#F8FAFA"
  surface: "#FFFFFF"
  soft: "#F4F8F7"
  border: "#D9E4E1"
  control-border: "#718580"
  error: "#A33636"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "4rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  display-mobile:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.15
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.2
  headline-mobile:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
  lead:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
  caption:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: "0px"
  control: "8px"
  card: "12px"
  portrait: "12px"
  circle: "9999px"
spacing:
  s0: "0px"
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "20px"
  s6: "24px"
  s8: "32px"
  s10: "40px"
  s12: "48px"
  s16: "64px"
  s18: "72px"
  s24: "96px"
  s30: "120px"
components:
  page:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "{spacing.s6}"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "{colors.surface}"
  button-primary-active:
    backgroundColor: "{colors.action-active}"
    textColor: "{colors.surface}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.action}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
  button-secondary-hover:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.action-hover}"
  button-disabled:
    backgroundColor: "{colors.border}"
    textColor: "{colors.ink}"
  link:
    textColor: "{colors.action}"
    typography: "{typography.body}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.s8}"
  card-meta:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.caption}"
  navbar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  navbar-mobile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "{spacing.s4}"
  cta-panel:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
  cta-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
  footer-meta:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.border}"
    typography: "{typography.caption}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "{spacing.s3}"
  input-placeholder:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
  input-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
  input-readonly:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
  input-boundary:
    textColor: "{colors.control-border}"
  focus-indicator:
    textColor: "{colors.action}"
  focus-inverse:
    textColor: "{colors.surface}"
  brand-detail:
    backgroundColor: "{colors.primary-light}"
  rating-decoration:
    textColor: "{colors.gold}"
---

# Design System: Vitale Medicine

## Overview

**Direção visual: "quiet medical luxury".** A Vitale deve transmitir autoridade médica com acolhimento: informação clínica legível, profissionais identificáveis, fotografia real e uma experiência tranquila para encontrar uma especialidade e entrar em contato. A sofisticação vem da proporção, da clareza e do cuidado com detalhes; a leveza vem de superfícies claras e espaço de leitura.

Este é o documento oficial de referência para a evolução visual do projeto. Preserva o verde Vitale, o dourado de apoio, Playfair Display nos títulos, Inter nos textos e controles, o logo original e as fotografias da clínica. Medicina integrativa e excelência clínica devem ser comunicadas pelos conteúdos e profissionais reais. Não criar credenciais, resultados, avaliações ou promessas para preencher um layout.

**Escopo e status:** especificação normativa para implementação futura; não descreve todas as regras como já implementadas. A criação deste documento não autoriza alterar o site. Conteúdos, profissionais, ordem das seções, links, números de WhatsApp e equivalência ES/PT continuam preservados. Formulários são especificados como extensão futura solicitada neste briefing; não existem atualmente.

### Base de evidências e auditoria anterior

Fontes: `index.html`, `pt.html`, `styles.css`, `script.js`; auditoria e correções posteriores registradas na tarefa **LP VItale**; inspeção local do site renderizado. A revisão visual desta etapa é amostral, não uma certificação completa de acessibilidade ou uma repetição de todos os testes históricos.

| Tema | Situação observada | Regra deste documento |
| --- | --- | --- |
| Estrutura ES/PT e navegação | O código já inclui main, skip link, menu mobile, rótulos, ícones decorativos ocultos e idioma atual | Preservar sem regressões; validar semântica e paridade a cada implementação |
| Navbar e hero | Breakpoint já antecipado para 1100px; links sem quebra; hero com largura fluida e CTAs empilháveis | Tratar como base obrigatória; medir também o CTA da navbar, logo e botão do menu, que não podem encolher |
| Logo e imagens | Logo do footer com altura automática; imagens com dimensões, lazy loading abaixo da dobra | Preservar proporções; completar imagens responsivas posteriormente |
| Movimento | Fallback visível e reduced-motion já presentes | Preservar; reduzir deslocamentos, delays e duração visual restantes |
| P1: contraste | Branco sobre verde Vitale: 2,44:1; verde em texto sobre branco também insuficiente | Adotar verde profundo funcional e texto escuro nas superfícies de assinatura |
| P1: foco | Anel dourado atual tem 2,46:1 sobre branco | Definir foco profundo em superfícies claras e foco branco em escuras |
| P2: composição | Cards com raio de 20px, sombras e elevação repetidas em serviços, equipe e avaliações | Separar famílias por conteúdo; superfícies predominantemente planas |
| P2: fotografia | Hero aplica lavagem branca uniforme de 85%; retratos e galeria têm recortes fixos | Conservar imagens e valorizar sua leitura com recortes explícitos |
| P2: CTA/footer | CTA final com estilos inline, raio de 30px e deslocamento de 50px; footer usa opacidades | Normalizar tokens e contraste; evitar sobreposição desnecessária |
| P2/P3: consistência | Ícones mistos, logotipo Google simulado, estilos inline e transition all | Uniformizar linguagem, apresentar avaliação textualmente e limitar transições |

As falhas antigas corrigidas não devem ser reportadas como ainda abertas. Raio de 12px, escalas, estados, verde funcional e regras de acabamento abaixo são decisões novas deste documento. A auditoria sugeria raios de 14–18px; o briefing atual pede maior contenção. O neutro atual permanece, sem trocar a identidade por uma paleta de spa.

### Arquitetura dos tokens

O YAML é a fonte normativa de valores de cor, tipografia, raios e escala de espaço. As tabelas do corpo definem aliases semânticos e propriedades que o formato não representa, como foco, sombras, min-height e breakpoints. Não gerar arquivos auxiliares nesta etapa.

Fluxo: **primitivo → função semântica → componente**. Exemplo: `colors.action` → `--color-action` → `--button-bg`. Na futura tradução para CSS, as referências devem permanecer como aliases, evitando hexadecimais independentes por componente. Estados no YAML são deltas: herdam geometria e tipografia do componente-base. `padding` no YAML representa a dimensão-base; a aplicação por eixo está explicitada em Components.

As 13 seções solicitadas são mantidas. As oito seções canônicas de `@google/design.md` conservam sua ordem relativa; as cinco adicionais são extensões em Markdown, permitidas pelo formato. Não adicionar chaves de motion ou breakpoints ao frontmatter.

## Colors

### Assinatura e ações

| Token semântico CSS | Referência normativa | Aplicação |
| --- | --- | --- |
| `--color-brand` | `colors.primary` | Verde Vitale original; assinatura, superfícies de destaque e detalhes |
| `--color-brand-soft` | `colors.primary-light` | Detalhes decorativos discretos; sem texto funcional nesta cor |
| `--color-action` | `colors.action` | Verde profundo derivado; CTAs, links, ícones funcionais e foco |
| `--color-action-hover` | `colors.action-hover` | Hover funcional, mantendo legibilidade |
| `--color-action-active` | `colors.action-active` | Pressionado; sem mudar dimensões |
| `--color-accent` | `colors.gold` | Dourado existente em detalhes e estrelas acompanhadas de nota textual |

### Neutros e estados

| Token semântico CSS | Referência normativa | Aplicação |
| --- | --- | --- |
| `--color-text` | `colors.ink` | Títulos, texto principal e texto sobre verde de assinatura |
| `--color-text-muted` | `colors.muted` | Texto auxiliar em canvas, superfície ou fundo suave |
| `--color-canvas` | `colors.canvas` | Fundo geral existente |
| `--color-surface` | `colors.surface` | Navbar opaca, campos e superfícies de conteúdo |
| `--color-surface-soft` | `colors.soft` | Agrupamento discreto e campos somente leitura |
| `--color-border` | `colors.border` | Separação decorativa; não identifica campos sozinha |
| `--color-control-border` | `colors.control-border` | Limites de inputs e controles que precisam ser reconhecidos |
| `--color-error` | `colors.error` | Erro com texto explicativo e indicação semântica |
| `--color-success` | `colors.action` | Confirmação acompanhada de mensagem, nunca só cor |
| `--color-on-dark` | `colors.surface` | Texto em fundos profundos |

**Regra da assinatura preservada.** Não substituir o verde do logo nem redefinir o verde original como o tom profundo. O profundo atende à função de leitura e ação.

Contrastes calculados em sRGB para cores sólidas: branco/verde original 2,44:1 (reprovado para texto); branco/verde funcional 5,36:1; ink/verde original 5,87:1; muted/canvas 4,98:1. O muted atual pode permanecer nestas superfícies, sem redução de opacidade. Dourado/branco tem 2,46:1: apenas decoração com significado redundante em texto; não usar em links, foco ou controles essenciais.

Fundo fotográfico exige medição do resultado composto. A combinação de duas cores sólidas aprovada não comprova contraste sobre fotografia. Sem neon, gradientes decorativos, brilhos coloridos ou novas cores de categoria. O verde intenso do WhatsApp atual não deve se espalhar pelo sistema; o controle futuro usa o token de ação, preservando o símbolo reconhecível e o destino.

## Typography

Playfair Display mantém a personalidade editorial e a autoridade nos títulos. Inter oferece leitura direta e controles claros. Usar os fallbacks do YAML, pesos realmente carregados e `font-display: swap`. O arquivo atual carrega Playfair 600/700/800; não pedir itálico de peso 400 sintético como padrão de título.

| Papel | Token | Uso |
| --- | --- | --- |
| H1 | `typography.display` / `display-mobile` | Um título principal por página |
| H2 | `typography.headline` / `headline-mobile` | Títulos de seções, incluindo CTA final |
| H3 | `typography.title` | Especialidades e nomes de profissionais |
| Introdução | `typography.lead` | Apoio do hero e introduções curtas |
| Corpo | `typography.body` | Descrições, depoimentos e formulários |
| Interface | `typography.label` | Botões, navbar e labels |
| Auxiliar | `typography.caption` | Cargos, autoria e informações secundárias |

Valores responsivos entre endpoints: `--font-size-display: clamp(2.25rem, 1.5rem + 3vw, 4rem)` e `--font-size-headline: clamp(2rem, 1.5rem + 2vw, 2.5rem)`. Os endpoints são os tokens do YAML; a interpolação é regra de layout, não outro conjunto de tamanhos.

Corpo com 16px ou mais na escala padrão; auxiliar com 14px ou mais. Não reduzir fontes para caber uma navbar. H1 idealmente em duas ou três linhas no desktop; no mobile, aceitar mais linhas com quebra natural. Nunca truncar, reduzir abaixo do token mobile ou inserir espaços inseparáveis para perseguir uma contagem de linhas.

Medida de leitura `--measure-body: 65ch`; apoio do hero até `55ch`; título do hero até `20ch`, limitado por 100% da área útil. Preferir sentence case, tracking normal em textos e até `0.06em` em rótulos curtos. Não usar parágrafos inteiros em caixa alta. Quebras manuais existentes só podem ser revisadas em implementação autorizada, com ES e PT lado a lado.

## Layout

Preservar a sequência: navegação → hero → clínica/galeria → especialidades → corpo médico e enfermagem → avaliações → CTA final → footer. O agendamento por WhatsApp continua acessível na navegação, nos profissionais e na região de contato. Os dois links atuais do hero mantêm sua função; não inventar um terceiro CTA.

| Token | Valor / comportamento |
| --- | --- |
| `--layout-max` | `1200px`, incluindo gutters, como o container atual |
| `--layout-width` | `100%`, com `box-sizing: border-box` |
| `--layout-gutter` | `spacing.s5` até 480px; `spacing.s8` acima |
| `--layout-grid-gap` | `spacing.s6` no mobile; `spacing.s8` em telas largas |
| `--layout-copy-max` | `65ch` |
| `--layout-hero-copy-max` | `700px`, sempre limitado a 100% da largura interna |
| `--layout-anchor-clearance` | altura efetiva da navbar + `spacing.s4` |

**Regra da hierarquia por conteúdo.** Cada seção tem uma forma reconhecível: clínica por fotografia, especialidades por texto escaneável, equipe por retrato e identificação, avaliações por citação, contato por ação. Não encapsular toda informação em cards iguais.

Direção para refinamento: hero com texto à esquerda e fotografia real reconhecível; galeria mantém a fachada como imagem ampla; especialidades usam agrupamentos planos e alinhamento à esquerda; equipe mantém retratos com peso adequado; avaliações podem usar divisores e espaço em vez de caixas elevadas. Variação deve acompanhar o conteúdo, sem bento obrigatório ou alternância artificial de layouts.

Usar flex/grid com `min-width: 0` nos filhos textuais e mínimos limitados à área disponível. Não utilizar `overflow-x: hidden` como solução para conteúdo cortado. Cards informativos não têm cursor de ação nem hover de elevação. Nenhuma alteração na ordem de leitura para produzir assimetria.

## Spacing

Escala de 4px, com múltiplos de 8px para agrupamentos maiores. Todos os valores normativos estão em `spacing` no YAML.

| Token semântico | Primitivo | Relação visual |
| --- | --- | --- |
| `--space-icon-label` | `spacing.s2` | Ícone e texto; separação mínima entre alvos distintos |
| `--space-label-field` | `spacing.s2` | Label e campo |
| `--space-field-help` | `spacing.s2` | Campo e ajuda/erro |
| `--space-field-group` | `spacing.s6` | Campos ou blocos relacionados |
| `--space-title-body` | `spacing.s4` | Título e descrição |
| `--space-copy-action` | `spacing.s8` | Texto e CTA |
| `--space-section-heading` | `spacing.s12` desktop; `spacing.s8` mobile | Cabeçalho e conteúdo da seção |
| `--space-section` | `spacing.s24` desktop; `spacing.s18` tablet; `spacing.s16` mobile | Padding vertical de seções |
| `--space-card` | `spacing.s8` desktop; `spacing.s6` mobile | Respiro interno dos cards |

Mobile: até 480px; tablet: 481–1100px; desktop: acima de 1100px. A escala substitui, numa futura implementação, valores isolados de 100px/60px e não exige seções gigantes. O hero reserva a navbar além do espaço de conteúdo. Evitar vazios que afastem o texto da imagem ou do CTA correspondente.

## Elevation & Depth

Superfícies predominantemente planas. Profundidade vem de fundo claro, fotografia, contraste e separação espacial. A navbar deve ser opaca; não usar glassmorphism nem blur de fundo. Cards em repouso não precisam de sombra.

| Token | Valor | Uso |
| --- | --- | --- |
| `--shadow-none` | `none` | Serviços, equipe, avaliações e CTA |
| `--shadow-floating` | `0 4px 16px rgb(26 46 42 / 0.08)` | Menu flutuante e contato fixo, quando necessário |
| `--border-width` | `1px` | Divisores e limites de superfície |
| `--z-base` | `0` | Conteúdo |
| `--z-contact` | `20` | Contato fixo |
| `--z-nav` | `30` | Navbar e menu ancorado |
| `--z-dialog` | `40` | Reservado para diálogo futuro |
| `--z-skip` | `100` | Skip link acima das camadas |

Eliminar, na implementação futura, o padrão de sombra `0 20px 40px` e deslocamento de até 10px em cards. Não usar efeito de profundidade como substituto de hierarquia. O anel de foco é funcional e não se confunde com a escala de sombras.

## Shapes

Retângulos de suavidade discreta. `rounded.control` para botões, menu e campos; `rounded.card` para superfícies que precisam de contenção; `rounded.portrait` para retratos. Galeria editorial pode usar `rounded.none`. Usar a mesma decisão dentro de cada família.

`rounded.circle` é exclusivo de avatares e controle flutuante circular. Não aplicar cápsulas a todos os CTAs nem molduras muito arredondadas às fotografias. Os raios atuais de 20px, 30px e 50px são inventário legado, não a norma futura.

O logo é um ativo imutável: manter proporção, cores, área de respiro e ausência de recorte. Um raio de container nunca deve recortar o símbolo.

## Components

### Botões e links

| Token | Definição |
| --- | --- |
| `--button-bg` / `--button-fg` | `--color-action` / `--color-on-dark` |
| `--button-bg-hover` / `--button-bg-active` | Aliases dos estados de ação |
| `--button-radius` | `rounded.control` |
| `--button-min-height` | `48px`; usar min-height, nunca cortar conteúdo com altura fixa |
| `--button-padding-x` / `--button-padding-y` | `spacing.s6` / `spacing.s3` |
| `--button-gap` | `spacing.s2` |
| `--button-border` | `1px solid` cor de ação, no secundário |
| `--button-mobile-width` | `100%` para CTAs agrupados em até 480px |

Primário sólido profundo; secundário branco com borda e texto profundo; terciário textual sublinhado. Um primário por grupo de ações. Navegar usa `<a>`; ação local usa `<button>`. O CTA do médico mantém seu destino individual e contexto acessível com nome do profissional.

| Estado | Comportamento |
| --- | --- |
| Default | Cores do componente-base; sem sombra |
| Hover | Tom definido no YAML, apenas em dispositivos com hover; sem saltos |
| Active | Tom profundo; área clicável estável |
| Focus-visible | Anel de foco de Accessibility, cumulativo com hover/active |
| Disabled | Cores de `button-disabled`, sem opacity global; sem interação e com semântica disabled |
| Loading | Apenas operações assíncronas reais: rótulo de progresso e aria-busy; não simular carregamento ao abrir WhatsApp |

Não estilizar um link desabilitado deixando seu destino acionável. Se um recurso estiver indisponível, informar a razão e apresentar uma alternativa. Texto pode quebrar no mobile; CTA da navbar desktop deve caber em uma linha, com área reservada.

### Cards e especialidades

`--card-bg: --color-surface`; `--card-fg: --color-text`; `--card-radius: rounded.card`; `--card-padding: --space-card`; `--card-border: 1px solid --color-border`; `--card-shadow: --shadow-none`.

Especialidades: preservar seis conteúdos e sua ordem; preferir blocos abertos ou divisores, ícone discreto e texto alinhado à esquerda. Não sugerir que toda a superfície é clicável quando não existe link. Ícones funcionais em action; decorativos podem usar brand. Padronizar tamanho de 24px e linguagem visual, sem trocar bibliotecas só por preferência de skill.

Equipe: retrato → cargo → nome → descrição → CTA; corpo e enfermagem permanecem distinguíveis. Cards podem alinhar CTAs pela base com flex, sem altura fixa de descrição e sem truncar nomes. Não reintroduzir profissionais removidos. Retratos seguem Photography.

Avaliações: tipografia de citação, autor e nota textual. Estrelas douradas são redundantes, ocultas à tecnologia assistiva quando já houver nota acessível. Evitar o “G” recriado com gradiente; preferir identificação textual do Google, preservando o link. Não tratar a nota e quantidade estáticas atuais como dados atualizados automaticamente.

### Navbar e seletor de idioma

`--navbar-bg: --color-surface`; `--navbar-fg: --color-text`; `--navbar-height: 90px`; `--navbar-height-scrolled: 70px`; `--navbar-gap: spacing.s6`; `--navbar-link-gap: spacing.s6`; `--navbar-control-min: 44px`; `--navbar-cta-min-height: 48px`.

Estas alturas preservam a referência existente; se texto ampliado exigir mais espaço, permitir crescimento e atualizar a compensação das âncoras. Logo e controles com `flex-shrink: 0`; ajustar a largura do logo proporcionalmente, sem distorção. `white-space: nowrap` nos links e CTA desktop; não aplicar nowrap em descrições ou títulos.

Manter menu mobile em larguras até 1100px. Se a navegação não couber em alguma largura superior com fontes carregadas ou zoom, antecipar o menu com base em medição. O breakpoint é uma base de regressão, não permissão para apertar logo, idioma e CTA. Seletor ES/PT sempre alcançável, sem opacidade de 40%; idioma atual usa cor funcional e `aria-current="page"`, com outra indicação além da cor.

Menu mobile como disclosure de navegação, não menu ARIA de aplicação: botão com aria-expanded/aria-controls; oculto também do teclado quando fechado; abre por teclado/toque; Escape fecha e devolve foco. Fechamento após âncora deve levar o foco a um destino visível; não deixá-lo num link oculto. Sem focus trap em disclosure não modal. Garantir rolagem do menu quando sua altura exceder a tela.

### Formulários — extensão futura

Não há formulário local. Estes tokens não autorizam sua criação e não representam uma funcionalidade existente.

`--input-bg: --color-surface`; `--input-fg: --color-text`; `--input-border: 1px solid --color-control-border`; `--input-radius: rounded.control`; `--input-min-height: 48px`; `--input-padding: spacing.s3`; `--input-font: typography.body`; `--input-error: --color-error`; `--input-focus: --color-action`; `--textarea-min-height: 120px`.

Label visível e associado; placeholder apenas como exemplo. Uma coluna no mobile, nomes completos com quebra natural, tipo de teclado apropriado e autocomplete pertinente. Hover escurece a borda, foco usa anel global; invalid combina borda, mensagem específica e aria-invalid/aria-describedby. Readonly permanece legível e selecionável em fundo soft; disabled não usa transparência global.

Durante envio real, evitar duplicação, manter dados digitados e anunciar resultado. Em falha, focar resumo de erros ou primeiro campo inválido, com mensagens próximas aos campos. Sucesso exige confirmação textual; erro inclui como recuperar. Não solicitar informações clínicas sensíveis num formulário genérico de contato por conveniência visual.

### CTA final e contato fixo

`--cta-bg: --color-brand`; `--cta-fg: --color-text`; `--cta-radius: rounded.card`; `--cta-padding-y: spacing.s16` desktop / `spacing.s10` mobile; `--cta-padding-x: spacing.s10` desktop / `spacing.s6` mobile. Botão escuro com texto branco, tokens `cta-button`; hover usa verde funcional e foco com separador branco. Título usa headline responsivo.

Conservar fundo verde do bloco, conteúdo e destino. Corrigir futuramente texto branco de baixo contraste; manter o bloco no fluxo, sem deslocamento visual sobre o footer. `--contact-size: 56px`; `--contact-inset: spacing.s5`; `--contact-bg: --color-action`; afastamento inferior considera `env(safe-area-inset-bottom)`. Não pulsar, girar ou competir com o CTA final. O controle fixo nunca pode cobrir conteúdo ou foco: ajustar sua posição ou suprimir a duplicata na região de contato, mantendo o link principal disponível.

### Footer

Fundo ink, texto branco e texto auxiliar border, ambos sólidos. Organizar contatos por unidade sem alterar endereços ou destinos. Links reconhecíveis e sublinhados em foco/hover; alvos sociais com pelo menos 44px. Preservar logo original com largura de referência de 100px e `height: auto`, `object-fit: contain`; respiro proporcional, sem ampliar desnecessariamente a caixa branca.

## Responsive behavior

| Faixa | Regras |
| --- | --- |
| Até 480px | Gutter 20px; botões do hero empilhados; equipe, especialidades, avaliações e galeria em uma coluna; CTA fluido |
| 481–768px | Gutter 32px; até duas colunas quando conteúdo couber; spans de galeria retornam a uma coluna da grade |
| 769–992px | Até duas colunas por família; footer em duas colunas; menu mobile |
| 993–1100px | Grades podem crescer conforme mínimos; navbar continua mobile |
| Acima de 1100px | Navbar desktop somente se couber; container até 1200px; até três colunas em serviços/equipe/avaliações; footer com quatro grupos |

Tokens de media query: `--breakpoint-small: 480px`, `--breakpoint-tablet: 768px`, `--breakpoint-footer: 992px`, `--breakpoint-nav: 1100px`. São nomes documentais; custom properties CSS não podem ser usadas diretamente como condição de media query CSS comum. Centralizar esses valores na futura implementação, incluindo a condição de fechamento do menu no JavaScript.

Grids fluidas usam mínimos limitados a 100%; foto e descrição nunca excedem a coluna. Hero com altura por conteúdo e min-height dinâmico quando apropriado, reservando navbar; não obrigar todo conteúdo a caber numa única tela. Em landscape baixo, priorizar conteúdo e navegação acessíveis sobre a altura cinematográfica.

Matriz obrigatória em próxima implementação: ES e PT em 320, 375, 430, 480, 768, 992, 1024, 1100, 1101 e 1440px, mais paisagem baixa e zoom de 200%/reflow a 400%. Conferir largura útil com scrollbar, fontes carregadas e fallback. Aprovar somente sem cortes laterais, sobreposição, controles comprimidos, CTAs inacessíveis ou divergência estrutural entre idiomas.

## Motion

Movimento confirma interação e orientação. A experiência permanece completa sem animação.

| Token | Valor | Uso |
| --- | --- | --- |
| `--duration-feedback` | `160ms` | Cor de links, botões e campos |
| `--duration-disclosure` | `200ms` | Menu mobile, sem atrasar interação |
| `--duration-reveal` | `240ms` | Entrada opcional discreta, uma vez |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Transições consistentes |
| `--motion-reveal-distance` | `8px` máximo | Conteúdo secundário opcional |
| `--motion-reduced-duration` | `0ms` | Preferência por movimento reduzido |

Hero e conteúdo essencial visíveis desde o início. Entradas secundárias podem usar opacity/transform, nunca depender de scroll para leitura ou foco. Sem stagger acumulado em CTAs, zoom de fotos, cards que saltam, marquee, parallax, pinning, scroll hijacking ou animações GSAP decorativas. Evitar `transition: all`; especificar apenas as propriedades que mudam.

Reduced-motion remove deslocamentos, revela todo conteúdo e usa scroll instantâneo. Falha de JavaScript ou IntersectionObserver mantém tudo visível. Estados finais não podem depender de evento de fim de animação; respeitar também mudanças de preferência durante a sessão.

## Accessibility

Meta: WCAG 2.2 AA, com alvos de toque de 44px como padrão adicional do projeto. O documento e o linter não certificam conformidade do site. Referência: [WCAG 2.2 — guia do W3C](https://www.w3.org/WAI/WCAG22/quickref/).

| Token | Valor / aplicação |
| --- | --- |
| `--focus-color` | `--color-action` sobre canvas, branco e soft |
| `--focus-color-inverse` | `--color-on-dark` sobre superfícies profundas |
| `--focus-width` | `3px` |
| `--focus-offset` | `4px` |
| `--focus-separator` | `2px solid` branco para separar anel profundo do fundo verde de assinatura |
| `--target-min` | `44px × 44px`, sem flex-shrink |
| `--target-gap` | `spacing.s2` |

Foco em verde de assinatura usa anel profundo com separação branca: não aplicar o anel profundo diretamente no verde claro sem conferir contraste. Anel não pode ser recortado por overflow do componente ou ficar atrás da navbar. Em forced-colors, usar cores de sistema como Highlight/Canvas e manter outline visível.

Texto comum exige 4,5:1; texto grande pode usar 3:1; controles essenciais e indicadores precisam de 3:1. Verificar default, hover, active, erro e foco. Não depender apenas de cor para idioma atual, link, erro, sucesso ou avaliação.

Preservar main, skip link, nomes acessíveis, idioma do documento e ordem de leitura. Todas as funções disponíveis por teclado, com foco visível e nunca oculto por elementos fixos. Labels e textos alternativos refletem conteúdo e destino; nomes acessíveis incluem o texto visível. Galeria não interativa não recebe cursor de link. Se um lightbox for autorizado depois, implementar diálogo acessível completo.

Permitir zoom, reflow, ampliação de texto e espaçamento personalizado sem perda. Auditar landmarks e títulos sem saltos artificiais; autoria e rótulos do footer não precisam ser headings só para parecerem fortes. Testar leitor de tela, ordem de tabulação, Escape, movimento reduzido, imagens indisponíveis e fontes fallback na implementação futura.

## Photography

Fotografia real é o principal elemento de diferenciação. Preservar os ativos atuais, sem fotos genéricas, substituições geradas por IA ou filtros que alterem tons de pele, instalações e materiais. Luz natural, cor neutra e enquadramentos clínicos claros sustentam acolhimento e confiança.

| Ativo existente | Papel e tratamento |
| --- | --- |
| `vitale/logo_final.png` | Marca original; proporção 1034:739; contain, nunca cover |
| `vitale/fachada.webp` | Evidência do local; fachada legível, preferir proporção 4:3 |
| `vitale/sala de espera.webp` | Hero e acolhimento; preservar leitura do ambiente |
| `vitale/recepcao2.webp` | Recepção real, orientação e proximidade |
| `vitale/procedimentos.webp` | Estrutura clínica; evitar corte que elimine contexto do ambiente |
| `vitale/dr. Adho conrado.webp` | Retrato horizontal de origem; escolher recorte sem cortar rosto |
| `vitale/Norma Espinola.jpeg`, `vitale/Izabely Carabajal.jpeg` | Retratos médicos; preservar nomes e identidade |
| `vitale/Santacruz.jpeg`, `vitale/Nancy.jpeg` | Equipe de enfermagem, com a mesma fidelidade de tratamento |

Tokens: `--photo-portrait-ratio: 3 / 4`; `--photo-clinic-ratio: 4 / 3`; `--photo-wide-ratio: 16 / 9`; `--photo-position-default: center`; `--photo-position-portrait: center top`. Aspect ratio é um container de recorte, não licença para deformar a imagem. Avaliar cada retrato: preservar rosto e contexto; se o recorte sacrificar informação, usar proporção original. Não combinar largura e altura rígidas incompatíveis.

No hero, a imagem é ambiente de apoio. Manter texto em uma área de contraste estável, preferencialmente uma superfície clara opaca quando não for possível conciliar foto e leitura. Evitar lavagem branca uniforme que apague a clínica e evitar gradientes estéticos. Um tratamento de legibilidade localizado, se necessário, deve ser medido sobre a fotografia final.

Manter width/height intrínsecos, `height: auto` onde apropriado e reserva de espaço. Lazy loading somente abaixo da dobra; não atrasar a imagem principal. Futuramente gerar srcset/sizes a partir dos mesmos originais quando autorizado, sem apagar os arquivos existentes. Alt descreve local ou pessoa em ES/PT; imagens estritamente decorativas não repetem o texto da seção.

## Do's and Don'ts

### Do's

- Preservar verde Vitale, dourado discreto, Playfair Display, Inter, logo e fotos reais.
- Usar verde profundo para função e verde original para assinatura, com pares de contraste documentados.
- Dar a serviços, equipe, avaliações e galeria hierarquias próprias, reconhecíveis pelo conteúdo.
- Manter texto legível, espaço coerente, foco contrastante e controles confortáveis no mobile.
- Preservar contatos, profissionais, conteúdo e equivalência funcional ES/PT.
- Conservar as correções da auditoria anterior e distinguir pendência visual de correção já presente.
- Validar o documento com o pacote instalado e validar o site separadamente quando houver implementação.

### Don'ts

- Não adotar estética de spa genérico nem visual hospitalar frio.
- Não trocar fontes, imagens ou composição aleatoriamente para satisfazer um preset.
- Não usar neon, glassmorphism, gradientes genéricos, sombras pesadas ou excesso de cápsulas.
- Não repetir o mesmo card elevado em todas as seções nem inventar interatividade.
- Não esconder overflow para mascarar cortes, comprimir controles ou truncar nomes e títulos.
- Não usar branco sobre o verde original para texto funcional, nem dourado como foco em branco.
- Não adicionar animações intensas, credenciais, promessas clínicas, avaliações ou formulários por iniciativa visual.
- Não implementar mudanças a partir da aprovação do linter apenas: ela valida o documento, não autoriza alteração no site.

### Validação do documento

Validador requerido: `@google/design.md`, versão instalada `0.4.0`. Comando local, sem instalação, exportação ou escrita auxiliar: `node node_modules/@google/design.md/dist/index.js lint DESIGN.md`.

Critérios: YAML válido; referências resolvidas; 13 seções presentes; ordem relativa das seções canônicas preservada; contraste dos pares de componentes sem avisos de falha. Cores usadas exclusivamente em bordas, foco ou decoração são verificadas segundo seu papel, não como texto comum.

Limites: o linter não verifica DOM, recortes de fotografia, layout em cada viewport, navegação por teclado, semântica clínica ou fidelidade visual. O resultado executado será apresentado na entrega antes de qualquer implementação.
