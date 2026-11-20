# Avaliações Google — ativação da integração

Branch de implementação: `codex/google-reviews`. Não promover para `main` antes de concluir a configuração e a validação real em Preview.

## Identidade conferida

Place ID: `ChIJj5rLVjKF9pQR7s2XankEjf4`.

Em 20/11/2026, o link público com esse identificador resolveu para **VITALE MEDICINE INTEGRATIVE POLICLÍNICA**, com site `vitalemedicine.com.py`, telefone local `0985 858524` e endereço **Parapití, Pdte. Franco 100150**. O identificador da ficha (`0x94f6853256cb9a8f:0xfe8d04796a97cdee`) coincide com o link anteriormente usado no site. A vista pública limitada exibiu nota 5,0, mas não a contagem; as 12 avaliações informadas pelo proprietário ainda precisam ser conferidas pela API autenticada. Nenhum desses números é hardcoded na implementação.

[Abrir a ficha conferida](https://www.google.com/maps/search/?api=1&query=Vitale%20Medicine&query_place_id=ChIJj5rLVjKF9pQR7s2XankEjf4).

## O que foi implementado

- `GET /api/google-reviews`: Vercel Function Node.js nativa, sem novas dependências de produção.
- Chave somente em `X-Goog-Api-Key` na requisição servidor → Google; nunca no navegador, URL, Git ou logs.
- Endpoint e Place ID fixos; parâmetros do visitante não selecionam lugares ou campos arbitrários.
- Máscara: `id,displayName,formattedAddress,internationalPhoneNumber,websiteUri,rating,userRatingCount,reviews,attributions,googleMapsLinks`.
- Confere ID, nome e telefone ou domínio antes de liberar os dados.
- `rating` e `userRatingCount` vêm do Google. Até 5 reviews em ordem de relevância, sem filtrar por nota. Não são necessariamente as cinco mais recentes.
- Textos integrais de `originalText`, no idioma original, sem tradução ou edição. Autor, foto disponível, perfil, data e link individual da review. Cards sem atribuição completa ou sem texto original disponível são omitidos, conforme aviso visível na seção. A contagem total nunca deriva dos cards.
- Logotipo oficial Google Maps, atribuições adicionais e links de políticas. A indicação “Local Guide” foi removida: a API não fornece esse status.
- HTML sem números ou depoimentos estáticos. Sem JavaScript, sem configuração, com zero reviews ou com falha, o visitante continua com o link correto para a ficha. Zero reviews é exibido como zero, sem inventar uma nota.
- Atualização ao entrar na seção e, no máximo, a cada 30 minutos por página aberta enquanto visível. Sem cron ou chamadas em abas ocultas. Falhas removem os dados anteriores e mostram fallback; não mantemos nota antiga como se fosse atual.
- Timeout de 6s no servidor e 8s no cliente. Requisições simultâneas compartilham apenas uma promessa em andamento por instância; falhas suspendem novas tentativas por 60s nessa instância. Isso não é um limite de gastos global.

## Cache: restrição importante

As [políticas atuais](https://developers.google.com/maps/documentation/places/web-service/policies) e os [termos específicos, seção 14](https://cloud.google.com/maps-platform/terms/maps-service-terms) não autorizam cache persistente de notas, contagens e textos de avaliações. O prazo de 30 dias aplica-se a latitude/longitude, não às reviews.

Por isso, usamos `no-store` no navegador, CDN e Vercel CDN. Não há banco, localStorage, snapshot, cache de respostas bem-sucedidas nem fallback numérico persistente. Apenas o Place ID é armazenado. Não inserir `s-maxage`, `stale-while-revalidate` ou cache diário sem licença específica do Google que o permita. A atualização periódica consulta dados novos quando há visualização ativa; isso não significa uma única chamada por dia para o site inteiro.

## Configuração Google Cloud e custos — requer autorização do responsável

1. Selecionar um projeto Google Cloud e vincular faturamento. Nada foi criado, contratado ou habilitado por esta tarefa.
2. Habilitar **Places API (New)** (`places.googleapis.com`), não somente a versão Legacy.
3. Criar uma chave dedicada ao servidor, restrita à Places API (New). Separar chaves de Preview e Production é recomendado. Não usar restrição por HTTP referrer para uma chave de servidor. Restrição por IP exige saída estática; não contratar Vercel Static IPs/Connect automaticamente. Seguir a [orientação de segurança](https://developers.google.com/maps/api-security-best-practices).
4. Configurar cotas baixas e alertas de faturamento no Cloud, e acompanhar uso por SKU. Alertas de orçamento não interrompem cobranças automaticamente. O endpoint é público; ausência de CORS e chave escondida não eliminam abuso ou custos. Validar os controles de tráfego e gasto adequados antes de ativar.
5. Aprovar termos de uso e política de privacidade públicos da Vitale que incorporem os termos e privacidade Google Maps. A integração precisa das URLs válidas; esta tarefa não redigiu políticas institucionais nem criou páginas fictícias. As URLs devem usar HTTPS no domínio `vitalemedicine.com.py` e apontar para páginas existentes, acessíveis sem login.

Preços globais em USD consultados em 20/11/2026 na [tabela oficial](https://developers.google.com/maps/billing-and-pricing/pricing):

| Campos | SKU | Franquia mensal publicada | Depois da franquia, primeira faixa |
| --- | --- | --- | --- |
| `rating,userRatingCount` | Place Details Enterprise | 1.000 eventos | US$20 por 1.000 |
| Incluindo `reviews` (esta implementação) | Place Details Enterprise + Atmosphere | 1.000 eventos | US$25 por 1.000 |

A solicitação é cobrada na faixa mais alta dos campos pedidos, não na soma das duas linhas. A franquia é compartilhada conforme as regras da conta de faturamento/SKU, não garantida por site ou chave. Por exemplo, 10.000 chamadas mensais deste endpoint, com a franquia de 1.000 totalmente disponível, custariam aproximadamente **US$225** no Google na primeira faixa. Impostos, câmbio, outros usos da conta e custos Vercel não estão incluídos. Conferir tabela e console antes de aprovar. A consulta sem configuração não chama Google e não consome esse SKU.

## Variáveis da Vercel

Configurar inicialmente **apenas em Preview**, preferencialmente restrito à branch `codex/google-reviews`:

| Variável | Valor |
| --- | --- |
| `GOOGLE_PLACES_API_KEY` | Chave dedicada, tipo Secret/Sensitive; inserir diretamente na Vercel |
| `GOOGLE_PLACE_ID` | `ChIJj5rLVjKF9pQR7s2XankEjf4` |
| `GOOGLE_REVIEWS_TERMS_URL` | URL HTTPS real dos termos aprovados da Vitale |
| `GOOGLE_REVIEWS_PRIVACY_URL` | URL HTTPS real da política aprovada da Vitale |
| `GOOGLE_REVIEWS_ENABLED` | `false` inicialmente; `true` somente após autorização dos custos e configuração completa |

Não usar prefixos públicos como `VITE_` ou `NEXT_PUBLIC_`. Não enviar a chave em mensagens nem incluí-la em comandos, screenshots ou arquivos versionados. Modelo sem segredos: `.env.example`; `.env*` locais estão no `.gitignore`. Alterar variáveis requer novo deployment para aplicá-las. URLs são verificadas sintaticamente pelo servidor; a existência e o conteúdo aprovado das páginas devem ser conferidos pelo responsável antes de ativar.

## Testar e liberar

1. `node --test tests/google-reviews.test.mjs` cobre segurança, dados, identidade, atribuição, concorrência, ausência de cache e falhas sem chamar Google.
2. `node --check reviews.js` e `git diff --check`.
3. Testes de navegador locais com Playwright: `PLAYWRIGHT_MODULE` aponta ao módulo instalado, então executar `node tests/google-reviews.browser.cjs`. Os dados sintéticos, identificados como TEST, existem somente nos testes locais e nunca são servidos pelo endpoint implantado. Cobre ES/PT, fallback sem JS, cinco cards, erro após sucesso, reflow e viewport 320px.
4. Em Preview sem variáveis, conferir `/api/google-reviews`: `{ "status": "unavailable" }`, sem nota, contagem ou reviews. Navegar em ES e PT; confirmar que as demais seções e WhatsApp permanecem iguais.
5. Após configurar e autorizar, criar novo preview. Conferir dados **reais**: identidade da ficha, nota/contagem atuais, até cinco cards, textos, fotos, autores, links individuais, políticas e atribuição Google Maps. Testes simulados não substituem esta etapa. Não exigir 12 reviews ou 5,0 se o Google já tiver atualizado os valores.
6. Validar mobile 320/375/430px e desktop, foco de teclado, sem overflow. Testar API indisponível: fallback sem dados anteriores, sem bloquear a página.
7. Só depois copiar configuração autorizada para Production e aprovar merge para `main`. Não promover o preview desconfigurado. Produção permanece na versão anterior até essa etapa.

## Arquivos e escopo

HTML ES/PT: apenas seção de reviews e carregamento de `reviews.js`. CSS adicional limitado a `#reviews`. Servidor, testes, instruções e proteção de arquivos de ambiente adicionados. `script.js`, WhatsApp, conteúdo médico, formulários, DNS, domínios e `virn/` não foram modificados.
