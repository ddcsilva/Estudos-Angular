# Fase 00 — Visão Geral da Trilha de Mini Projetos Angular Moderno

> **O que é este documento:** o mapa pedagógico, estratégico e operacional de uma trilha de aprendizado baseada em mini projetos independentes para dominar Angular 18–21.
> **O que não é:** um plano de sistema enterprise, um clone de produto, uma fundação de monorepo.
> **Como usar:** leia uma vez do início ao fim para entender a lógica da trilha. Depois, consulte a fase específica antes de começá-la. Volte ao mapa quando precisar decidir o que estudar em seguida.

---

## 1. Visão Geral da Proposta

Esta trilha ensina Angular moderno — versões 18 a 21 — por meio de **vários mini projetos independentes**, cada um com escopo pequeno, objetivo claro e foco em um conjunto específico de features.

Não existe aqui um grande app sendo construído por 15 fases. Não existe shell, monorepo, microfrontend ou fundação enterprise. Cada mini projeto nasce e se completa sozinho. Você pode fazer na ordem sugerida ou pular para o tema que mais interessa.

A trilha está organizada em quatro camadas progressivas:

```
  Fundação (01–04)     →  Vocabulário reativo: signals, templates, dados
  Intermediário (05–08) →  Infraestrutura de app: rotas, forms, composição, estado
  Avançado (09–13)      →  Integração e profundidade: RxJS, SSR, a11y, testes
  Integração (14)       →  Composição autônoma de tudo que foi aprendido
```

Cada camada amplia o tipo de raciocínio exigido. As primeiras fases pedem "entender como funciona". As intermediárias pedem "decidir quando usar". As avançadas pedem "combinar com critério". A última pede "compor sem guia".

### Por que mini projetos em vez de um grande projeto?

| Grande projeto contínuo | Mini projetos independentes |
|---|---|
| Acumula complexidade acidental a cada fase | Cada projeto começa limpo, sem dívida técnica herdada |
| Um erro de setup na fase 1 arrasta todas as fases seguintes | Falhas são isoladas — se um projeto deu problema, o próximo começa do zero |
| Exige contexto mental de todo o sistema para avançar | Exige apenas o contexto do mini projeto atual |
| Mistura features com infraestrutura (CI, monorepo, lint...) | Foco puro na feature Angular que está sendo praticada |
| Motivação cai conforme o setup cresce | Cada projeto traz variedade e sensação de conclusão rápida |
| Forçar coerência entre fases distorce decisões técnicas | Cada projeto escolhe a solução mais adequada ao problema |
| Pratica a mesma feature no mesmo contexto repetidamente | Pratica a mesma feature em contextos variados — o que constrói fluência |

O objetivo não é simular um emprego. É **construir repertório**. Quem praticou signals num app de clima, formulários num gestor de tarefas e roteamento num catálogo de filmes entende quando usar cada recurso — porque viu cada um resolver um problema diferente, em contexto diferente. Essa variação é o que transforma sintaxe memorizada em competência transferível.

Pense nos mini projetos como **laboratórios isolados**. Em um laboratório, você controla as variáveis para observar um fenômeno com clareza. Aqui, cada projeto reduz o ruído para deixar uma pergunta técnica ficar nítida: "como um `computed()` reage?", "quando uma rota deve carregar sob demanda?", "por que um formulário baseado em signals muda a maneira de validar dados?". Depois que o fenômeno é compreendido em isolamento, ele pode ser combinado com outros.

### Complexidade acidental vs. complexidade essencial

Fred Brooks, no clássico *No Silver Bullet*, distinguiu complexidade essencial (inerente ao problema) de complexidade acidental (criada pela solução). Um monorepo Nx com shell zoneless, ESLint flat config, Husky, commitlint e módulos de boundaries é complexidade legítima para uma equipe de 10 devs mantendo um produto em produção. Mas para quem está aprendendo signals e control flow, isso é ruído puro que compete com a atenção que deveria estar no Angular.

Mini projetos eliminam a complexidade acidental. Cada um usa `ng new`, cria alguns componentes, pratica o que precisa e termina. O aprendizado fica no Angular, não no tooling ao redor.

Donald Knuth lembrava que otimização prematura costuma atrapalhar mais do que ajudar. Nesta trilha, a versão pedagógica dessa ideia é: **arquitetura prematura também atrapalha**. Antes de discutir boundaries, monorepo ou pipeline, o aluno precisa saber explicar por que uma mudança em um signal atualiza uma parte específica da tela.

### Contrato pedagógico da trilha

Esta trilha assume que aprender Angular moderno não é acumular APIs, mas construir modelos mentais reutilizáveis. Para isso, ela combina práticas defendidas por bons professores, psicólogos cognitivos e engenheiros experientes:

| Técnica | Como aparece aqui | Por que importa |
|---|---|---|
| Prática deliberada | Cada fase escolhe um foco estreito e exige repetição consciente | K. Anders Ericsson mostrou que evolução real exige prática com objetivo, feedback e dificuldade calibrada |
| Carga cognitiva controlada | Cada mini projeto remove infraestrutura que não ensina a feature principal | John Sweller descreveu como excesso de informação simultânea reduz a aprendizagem |
| Scaffolding | A trilha oferece andaimes no começo e retira apoio gradualmente | Jerome Bruner defendia suporte temporário até o aluno conseguir agir sozinho |
| Zona de desenvolvimento proximal | As fases ficam um pouco acima do que você já sabe, mas não muito além | Vygotsky ajuda a explicar por que desafio bom não é desafio esmagador |
| Repetição variada | Signals aparecem em domínios diferentes, não só no mesmo exemplo | Robert Bjork chama certas dificuldades produtivas de desejáveis porque aumentam retenção |
| Construção ativa | Você cria projetos, provoca erros e explica decisões | Seymour Papert defendia aprender construindo artefatos públicos e manipuláveis |

O professor excelente não entrega apenas respostas; ele organiza encontros entre você e o problema certo, na hora certa. É isso que a Fase 00 faz: desenha a sequência de problemas que fará o Angular deixar de ser uma lista de recursos e virar uma forma de pensar.

---

## 2. Objetivos de Aprendizado

Ao completar esta trilha, você terá:

- **Domínio prático de Angular moderno** — não apenas leitura de docs, mas código escrito, rodando e entendido
- **Repertório de patterns reais** — signals para estado, computed para derivações, effect para side effects, Signal Forms para formulários, httpResource para dados, @defer para performance
- **Capacidade de escolha técnica** — saber quando usar signal vs observable, Signal Forms vs Reactive Forms, @defer vs lazy loading de rota, SSR vs CSR
- **Experiência com APIs públicas reais** — tratando erros, paginação, rate limiting, autenticação por key e dados imperfeitos
- **Vocabulário de entrevista** — cada mini projeto inclui perguntas e trade-offs que aparecem em entrevistas técnicas para posições sênior
- **Confiança para migrar código legado** — entendendo o que mudou entre versões e por que o Angular tomou cada decisão
- **Modelo mental de reatividade** — saber pensar em termos de "estado → derivação → efeito" em vez de "evento → handler → atualização manual"

O que esta trilha **não** promete: você não vai sair com um produto publicável. Vai sair com fluência. A diferença é que fluência permite construir qualquer produto; um produto construído copiando código não garante fluência.

O que esta trilha **não** cobre deliberadamente: gerenciamento de estado com NgRx ou libs externas, microfrontends, module federation, CI/CD, deploy, Docker ou infraestrutura cloud. Esses são temas válidos, mas pertencem a uma trilha de engenharia de plataforma, não de domínio do framework.

---

## 3. Princípios da Trilha

Estes princípios guiam todas as fases. Se um mini projeto estiver violando algum deles, algo saiu do caminho.

### Simplicidade com propósito
Cada projeto usa o mínimo de setup necessário. `ng new`, Tailwind se quiser estilizar, e pronto. Não existe configuração que não tenha justificativa direta no aprendizado daquela fase.

### Foco didático por projeto
Um mini projeto ensina signals e computed. Outro ensina formulários. Outro ensina roteamento. Mistura acontece, mas sempre com protagonista claro. Se tudo é foco, nada é foco.

### Escopo pequeno e valioso
Nenhum projeto precisa de mais do que 5–10 componentes. O valor está na profundidade com que cada feature é explorada, não na quantidade de telas.

### Progressão de dificuldade
As primeiras fases usam dados estáticos e um componente por tela. As últimas combinam múltiplas features, APIs reais e patterns avançados. A curva é intencional.

### Independência entre exercícios
Fase 07 não depende do código da Fase 03. Você pode fazer fora de ordem, pular uma fase ou repetir outra. A única dependência é conceitual: saber signals (Fase 01) facilita tudo que vem depois.

### Recursos modernos em contexto real
Nenhuma feature é apresentada no vácuo. Signals aparece porque um componente precisa reagir a mudanças. @defer aparece porque uma seção da página é pesada. Signal Forms aparece porque um formulário precisa de validação reativa. O contexto justifica a ferramenta.

### Sem complexidade enterprise desnecessária
Não há módulo boundaries, cache distribuído, module federation ou CI pipeline em nenhuma fase. Se algum dia você precisar disso, o repertório construído aqui será a base. Mas aqui, o foco é Angular, não infraestrutura.

---

## 4. Mapa Geral da Trilha

A trilha é composta por **14 fases**, cada uma representando um mini projeto ou bloco temático. As fases estão organizadas do mais simples ao mais avançado, mas podem ser abordadas com flexibilidade.

```
 Fase │ Mini Projeto                │ Foco Principal                    │ Dificuldade
──────┼─────────────────────────────┼───────────────────────────────────┼───────────
  01  │ Conversor de Unidades       │ Signals, computed, effect         │ ★☆☆☆☆
  02  │ Galeria de Componentes      │ Control flow, template syntax     │ ★☆☆☆☆
  03  │ Explorador de Países        │ HttpClient, httpResource, pipes   │ ★★☆☆☆
  04  │ Painel do Clima             │ Signals avançados, linkedSignal   │ ★★☆☆☆
  05  │ Catálogo de Filmes          │ Roteamento, lazy loading          │ ★★★☆☆
  06  │ Gestor de Tarefas           │ Signal Forms, validação           │ ★★★☆☆
  07  │ Diretório de Usuários       │ Diretivas, pipes, projeção        │ ★★★☆☆
  08  │ Mural de Favoritos          │ Estado compartilhado, resource    │ ★★★☆☆
  09  │ Buscador em Tempo Real      │ RxJS + Signals, interceptors      │ ★★★★☆
  10  │ Pokédex Interativa          │ Rotas avançadas, @defer, guards   │ ★★★★☆
  11  │ Leitor de Artigos com SSR   │ SSR, hydration, render modes      │ ★★★★☆
  12  │ Kit de Formulários Acessíveis│ Acessibilidade, ARIA             │ ★★★★☆
  13  │ Oficina de Testes           │ Vitest, TestBed, harnesses        │ ★★★★☆
  14  │ Dashboard de Métricas       │ Integração de múltiplas features  │ ★★★★★
```

### Por que esta ordem e não outra

A sequência não é arbitrária. Cada fase constrói uma capacidade cognitiva que as fases seguintes presumem existir. A lógica segue três princípios:

**Princípio 1 — Primitivos antes de composições.** Signals (Fase 01) são o primitivo reativo do Angular moderno. Templates (Fase 02) são o primitivo de renderização. httpResource (Fase 03) é o primitivo de dados assíncronos. Sem esses três, nenhuma fase posterior faz sentido — seria como tentar escrever frases sem conhecer o alfabeto.

**Princípio 2 — Um conceito novo por vez, com reforço dos anteriores.** A Fase 03 introduz httpResource (novo), mas reutiliza signals e computed (reforço da Fase 01) e @if/@for (reforço da Fase 02). Cada fase adiciona uma camada sobre alicerces que já foram praticados. Isso evita sobrecarga cognitiva: você nunca lida com mais de um conceito completamente desconhecido por vez.

**Princípio 3 — Infraestrutura de app antes de otimizações.** Roteamento (Fase 05) e formulários (Fase 06) aparecem antes de SSR (Fase 11) e @defer (Fase 10) porque você precisa ter um app com rotas e interação para que otimizações de performance façam sentido. Otimizar algo que não existe é exercício vazio.

A sequência cognitiva se desdobra assim:

```
01 signal/computed/effect   →  "Como estado reativo funciona?"
02 @if/@for/inputs/outputs  →  "Como renderizo e componho com base em estado?"
03 httpResource/pipes       →  "Como busco dados e os transformo?"
04 linkedSignal/effect      →  "Como ligo estados que dependem uns dos outros?"
    ─── Aqui você já sabe criar componentes reativos que consomem APIs ───
05 rotas/lazy loading       →  "Como organizo múltiplas telas?"
06 Signal Forms             →  "Como capturo e valido entrada do usuário?"
07 diretivas/pipes/projeção →  "Como crio peças reutilizáveis?"
08 signal services/resource →  "Como compartilho estado entre componentes?"
    ─── Aqui você já sabe construir um app Angular completo ───
09 RxJS + Signals           →  "Quando cada modelo reativo é mais adequado?"
10 @defer/guards/resolvers  →  "Como otimizo carregamento e protejo rotas?"
11 SSR/hydration            →  "Como entrego HTML pronto do servidor?"
12 ARIA/a11y                →  "Como garanto que todos podem usar minha app?"
13 Vitest/TestBed           →  "Como verifico que tudo funciona?"
    ─── Aqui você tem profundidade em temas especializados ───
14 composição livre         →  "Consigo combinar tudo sem guia?"
```

### Os pilares do Angular moderno na trilha

O Angular entre as versões 18 e 21 consolidou uma mudança de paradigma. Estes são os pilares dessa mudança e onde cada um aparece na trilha:

**Reatividade com Signals** — O Angular moderno desloca o centro do modelo mental: em vez de depender de detecção de mudanças global como explicação principal, você passa a declarar fontes de estado e dependências. Signals avisam o Angular exatamente quando e onde o estado mudou.

Uma boa analogia: signals funcionam como um **circuito elétrico declarativo**. Um `signal()` é a fonte de energia; um `computed()` é um circuito derivado que acende quando a entrada muda; um `effect()` é o fio que liga esse circuito ao mundo externo, como `localStorage`, logs ou uma biblioteca de terceiros. O erro comum é usar o fio externo para fazer o trabalho do circuito interno. Em Angular moderno, derivação fica em `computed()`; efeito colateral fica em `effect()`.

| API | O que faz | Onde pratica |
|---|---|---|
| `signal()` | Estado mutável reativo | 01, 03, 04, 05, 08, 09, 14 |
| `computed()` | Derivação pura de estado, como uma célula de planilha que recalcula quando suas dependências mudam | 01, 03, 04, 05, 08, 09, 14 |
| `effect()` | Ponte para o mundo externo; não deve substituir `computed()` para derivar estado | 01, 04, 08, 09 |
| `linkedSignal()` | Estado derivado com reset | 04, 08, 14 |
| `resource()` / `httpResource()` | Dados assíncronos reativos | 03, 04, 05, 08, 10, 14 |

**Zoneless como padrão da trilha** — Angular 21 consolida o modo zoneless como recurso pronto para produção. Todos os mini projetos adotam esse modelo como padrão didático, para que você aprenda a depender de sinais explícitos de mudança em vez de imaginar que Zone.js sempre fará a atualização por você. Isso é transparente durante a trilha — mas nas fases 01 e 04, momentos explícitos de "por que o template atualizou?" constroem a compreensão do modelo.

**Standalone como padrão** — NgModules deixaram de ser necessários desde Angular 19. Toda fase usa standalone components, directives e pipes naturalmente. A Fase 07 é onde a criação de diretivas e pipes standalone ganha foco principal.

**Signal Forms** — Angular 21 introduziu uma API experimental de formulários baseada em signals. A trilha prioriza essa abordagem nas Fases 06 e 12 porque ela aponta para o modelo mental moderno do framework, mas mantém a comparação com Reactive Forms para que você entenda o legado e os trade-offs.

**Template moderno** — O control flow com `@if`, `@for`, `@switch` e as deferrable views com `@defer` substituem diretivas estruturais antigas. A Fase 02 foca em control flow. A Fase 10 foca em `@defer`.

**SSR e hydration** — Renderização no servidor com hydration incremental e modos de renderização por rota. A analogia: SSR entrega uma página já montada; hydration religa os controles para ela voltar a responder ao usuário no navegador. A Fase 11 é dedicada a observar essa diferença no HTML real.

**RxJS como complemento, não substituto** — Signals cobrem estado; RxJS cobre streams de eventos e composição assíncrona complexa. A Fase 09 é onde essa fronteira é explorada na prática.

### Alinhamento oficial Angular

As recomendações desta trilha seguem a direção atual da documentação oficial do Angular, especialmente os guias de boas práticas, signals, forms, SSR/hydration e acessibilidade:

- **Standalone por padrão.** Em Angular moderno, componentes, diretivas e pipes standalone são o caminho natural. Em exemplos novos de Angular v20+, não trate `standalone: true` como ritual obrigatório no decorator.
- **APIs funcionais novas.** Prefira `input()` e `output()` em componentes novos, e `inject()` para injeção de dependências quando isso simplificar o código.
- **Signals para estado local.** Use `signal()` para estado mutável, `computed()` para derivação pura e `effect()` somente para efeitos colaterais.
- **Template moderno.** Use `@if`, `@for` e `@switch` em vez das diretivas estruturais antigas como padrão didático da trilha.
- **Dados assíncronos com caveat.** `resource()` e `httpResource()` são APIs modernas importantes para praticar, mas devem ser apresentadas com nota de estabilidade quando a documentação as marcar como experimentais ou em evolução.
- **Forms com caveat.** Signal Forms é o foco da trilha em Angular 21, mas a API ainda merece aviso de experimentalidade e comparação honesta com Reactive Forms.
- **Acessibilidade como requisito.** Componentes customizados devem mirar WCAG AA, foco visível, navegação por teclado e atributos ARIA corretos.
- **Testes em apps zoneless.** Testes devem respeitar atualizações assíncronas: depois de agir sobre estado ou DOM, espere a estabilização antes de afirmar o resultado.

Quando uma API estiver marcada como experimental, developer preview ou em evolução, a fonte de verdade deve ser sempre [angular.dev](https://angular.dev/), não um resumo antigo desta trilha.

### Distribuição de features do Angular ao longo das fases

Para garantir cobertura completa, esta é a distribuição planejada dos recursos modernos:

| Feature Angular | Fases onde aparece |
|---|---|
| Standalone components | Todas (é o padrão desde v19) |
| `signal`, `computed` | 01, 03, 04, 05, 08, 09, 14 |
| `effect` | 01, 04, 08, 09 |
| `linkedSignal` | 04, 08, 14 |
| `resource` / `httpResource` | 03, 04, 05, 08, 10, 14 |
| Control flow (`@if`, `@for`, `@switch`) | 02, 03, 05, 07, 10 |
| `@defer` (deferrable views) | 10, 13, 14 |
| Signal Forms | 06, 12 |
| HttpClient + interceptors | 03, 05, 09, 11 |
| Roteamento + lazy loading | 05, 10, 11 |
| Guards e resolvers | 10, 11 |
| Comunicação entre componentes | 02, 07, 08 |
| Content projection (`ng-content`) | 02, 07, 12 |
| Pipes standalone | 03, 07 |
| Directives standalone | 07, 12 |
| Estado compartilhado (signals como serviço) | 08, 09, 14 |
| RxJS + Signals | 09, 14 |
| APIs REST | 03, 04, 05, 08, 09, 10 |
| SSR / hydration | 11 |
| Acessibilidade (ARIA) | 12 |
| Performance e otimização | 10, 13, 14 |
| Testes (Vitest) | 13 |
| Zoneless | Todas (padrão da trilha em Angular 21) |

---

## 5. Detalhamento dos Mini Projetos

### Fase 01 — Conversor de Unidades

**Nome do projeto:** UnitFlip
**Objetivo:** Aprender signals, computed e effect construindo algo que reage a mudanças de estado em tempo real.

**O que será construído:**
Um conversor interativo de unidades (temperatura, peso, distância). O usuário digita um valor, escolhe a unidade de origem e destino, e o resultado aparece instantaneamente. Um histórico de conversões recentes é mantido via effect.

**Features Angular praticadas:**
- `signal()` para estado do input, unidade selecionada e histórico
- `computed()` para calcular a conversão em tempo real (derivação pura de estado)
- `effect()` para persistir o histórico no `localStorage` como side effect
- Standalone component como padrão de criação
- Zoneless change detection (padrão da trilha em Angular 21)
- Two-way binding com `model()` ou binding manual via signals

**O que esta fase NÃO cobre (e por quê):**
- HTTP e APIs — a primeira fase deve isolar reatividade local; adicionar requests misturaria dois conceitos novos ao mesmo tempo
- Roteamento — um conversor é uma tela única; rotas aparecerão quando houver múltiplas telas (Fase 05)
- Formulários com validação — o input aqui é simples; Signal Forms vem na Fase 06, quando validação será o foco

**Por que este mini projeto e não outro:**
Signals são o alicerce do Angular moderno. Sem entendê-los, nada do que vem depois faz sentido. Um conversor é o contexto perfeito porque o fluxo `input → transformação → output` mapeia diretamente para `signal → computed → template`. O effect entra naturalmente para salvar histórico. Alternativas como "contador" ou "toggle de tema" seriam simples demais para expor `computed` e `effect` com naturalidade. Um todo-list seria complexo demais para a primeira exposição — misturaria arrays, CRUD e signals de uma vez.

**Nível:** ★☆☆☆☆ (Fundacional)

**Por que funciona pedagogicamente:**
O conversor é concreto e visual. Quando você digita "100" e vê "212°F" aparecer sem nenhum subscribe, sem ngOnChanges, sem zone.js disparando — você *entende* signals. Não como conceito abstrato, mas como ferramenta que resolve um problema real na sua frente.

**API pública:** Nenhuma. Dados de conversão são fórmulas matemáticas puras. Isso é proposital: a primeira fase não deve ter a complexidade adicional de chamadas HTTP.

---

### Fase 02 — Galeria de Componentes

**Nome do projeto:** ShowCase

**Objetivo:** Dominar o novo control flow do Angular (@if, @for, @switch), comunicação entre componentes e content projection.

**O que será construído:**
Uma galeria interativa que exibe cards de "componentes de UI" (botões, alertas, badges, avatares) com preview ao vivo. O usuário pode filtrar por categoria, alternar entre temas claro/escuro e expandir cada card para ver detalhes. Os dados são estáticos (array local).

**Features Angular praticadas:**
- `@if` para exibição condicional (filtros ativos, estado de expansão)
- `@for` com `track` para renderizar listas de cards
- `@switch` para alternar entre modos de visualização (grid/lista/detalhe)
- `input()` com signal inputs para passar dados entre componentes
- `output()` para emitir eventos tipados entre componentes
- `<ng-content>` para projetar conteúdo nos cards
- `<ng-content select="...">` para projeção nomeada (header, body, footer do card)

**O que esta fase NÃO cobre (e por quê):**
- HTTP e APIs — dados são estáticos para isolar o aprendizado de template e composição
- Signals avançados (linkedSignal, resource) — control flow precisa de base sólida antes de adicionar estado complexo
- Roteamento — a galeria é single-page; rotas viriam na Fase 05
- Diretivas customizadas — composição aqui usa inputs/outputs e ng-content; diretivas ganham foco na Fase 07

**Por que este mini projeto e não outro:**
Control flow e comunicação entre componentes são os dois patterns mais usados em qualquer app Angular. Praticar `@if/@for/@switch` com dados locais (sem HTTP) isola o aprendizado do template syntax, sem misturar com complexidade de dados assíncronos. Uma galeria força decisões de componentização reais — onde cortar entre `Card`, `CardList`, `FilterBar` — que são mais valiosas do que exercícios de sintaxe isolados. Alternativas como "lista de notas" não exigiriam projeção de conteúdo nem modos de visualização.

**Nível:** ★☆☆☆☆ (Fundacional)

**Por que funciona pedagogicamente:**
Construir uma galeria exige decisões reais de componentização. Você precisa decidir o que é o componente `Card`, o que é `CardList`, o que é `FilterBar`. Essa decisão de "onde cortar" é mais valiosa do que qualquer exercício de sintaxe isolado.

**API pública:** Nenhuma. Dados estáticos em arrays TypeScript. O foco está no template e na composição de componentes, não em dados externos.

---

### Fase 03 — Explorador de Países

**Nome do projeto:** GlobeHop

**Objetivo:** Fazer a primeira integração real com API pública usando `httpResource`, criar pipes customizados e praticar tratamento de dados.

**O que será construído:**
Um explorador que lista países, permite filtrar por região, buscar por nome e ver detalhes (capital, moedas, idiomas, bandeira). Inclui uma visualização de card e uma de tabela.

**Features Angular praticadas:**
- `httpResource()` para buscar dados reativamente (lista de países, detalhes)
- `signal()` para o termo de busca e região selecionada
- `computed()` para filtrar a lista localmente
- `@for` com `track` para renderizar a lista de países
- `@if` para estados de loading, erro e vazio
- Pipe standalone customizado (ex: formatar população com separador de milhar, formatar lista de idiomas)
- Standalone components com imports granulares

**O que esta fase NÃO cobre (e por quê):**
- Interceptors — o foco é no fluxo de dados básico; interceptação de requests vem na Fase 09, quando houver necessidade de autenticação
- Roteamento — ainda não há múltiplas telas; a lista e o detalhe podem ser exibidos na mesma página com `@if`
- Tratamento avançado de erros (retry, fallback) — o tratamento aqui é exibir estado de erro; resiliência aparece nas fases avançadas
- linkedSignal — os signals aqui são independentes; estados interdependentes vêm na Fase 04

**Por que este mini projeto e não outro:**
Toda aplicação Angular real busca dados de algum lugar. Este projeto introduz `httpResource` (a forma moderna e reativa de buscar dados no Angular 21) num contexto simples o suficiente para focar no fluxo `request → loading → data/error → render`. A REST Countries API foi escolhida por não exigir autenticação — eliminando a fricção de API key na primeira exposição a HTTP. Alternativas como TMDB ou GitHub exigiriam key/token, misturando autenticação com o conceito central.

**Nível:** ★★☆☆☆ (Básico)

**Por que funciona pedagogicamente:**
A REST Countries API retorna dados ricos (nome, bandeira SVG, moedas, idiomas, região) sem exigir autenticação. Filtrar localmente com `computed` vs buscar do servidor é uma decisão arquitetural real que aparece em todo projeto. Além disso, a criação de pipes para formatar dados reforça a separação entre lógica de dados e lógica de apresentação.

**API pública:** [REST Countries](https://restcountries.com/) — gratuita, sem autenticação, JSON estruturado com 250+ países.
**Alternativa:** Se REST Countries estiver fora, os dados podem ser fornecidos como JSON local (um arquivo de ~30KB cobre 250 países).

---

### Fase 04 — Painel do Clima

**Nome do projeto:** SkyPulse

**Objetivo:** Aprofundar o uso de signals com `linkedSignal`, praticar `effect` para side effects reais e trabalhar com dados que mudam ao longo do tempo.

**O que será construído:**
Um painel que mostra o clima atual e previsão de 5 dias para uma cidade escolhida pelo usuário. O usuário pode salvar cidades favoritas, alternar entre elas e ver a previsão atualizar. A última cidade consultada é salva no `localStorage`.

**Features Angular praticadas:**
- `signal()` para cidade selecionada, lista de favoritos
- `linkedSignal()` para derivar estado com reset automático — ex: quando a cidade muda, o estado de "previsão expandida" reseta para o dia atual
- `computed()` para transformar dados da API (extrair máxima, mínima, ícone)
- `effect()` para salvar favoritos e última cidade no `localStorage`
- `httpResource()` para buscar clima atual e previsão baseando-se na cidade selecionada (request reativo)
- Tratamento de estados: loading, erro de rede, cidade não encontrada

**O que esta fase NÃO cobre (e por quê):**
- Roteamento — o painel é single-page com troca de cidade; múltiplas rotas viriam na Fase 05
- Signal Forms — o input de cidade é simples; formulários complexos com validação ganham fase própria (06)
- RxJS — a busca por cidade usa `httpResource` reativo; composição com operadores RxJS aparece na Fase 09
- Interceptors — a API key vai direto na URL do httpResource; interceptação vem quando houver padrão de autenticação (Fase 09)

**Por que este mini projeto e não outro:**
`linkedSignal` é uma das APIs mais elegantes do Angular moderno, mas só faz sentido quando existe um estado que depende de outro e precisa resetar. O painel de clima cria esse cenário naturalmente: a aba selecionada da previsão depende da cidade — se a cidade muda, a aba reseta. Sem `linkedSignal`, essa lógica exigiria efeitos manuais e flags auxiliares. Alternativas como "perfil de usuário com abas" não teriam dados dinâmicos o suficiente para justificar reatividade real.

**Nível:** ★★☆☆☆ (Básico-Intermediário)

**Por que funciona pedagogicamente:**
Clima é um domínio que todo mundo entende intuitivamente. Não precisa explicar o que é "temperatura" ou "previsão". Isso reduz a carga cognitiva do domínio e deixa a atenção livre para o Angular. Além disso, dados de clima mudam (de verdade), o que dá sentido ao modelo reativo. Ao final desta fase, você terá exercitado o trio completo de signals (signal, computed, linkedSignal) e os dois mecanismos de dados (httpResource e efeitos com localStorage).

**API pública:** [OpenWeatherMap](https://openweathermap.org/api) — gratuita com API key (plano free: 60 chamadas/minuto), retorna JSON com clima atual e previsão.
**Alternativa:** [Open-Meteo](https://open-meteo.com/) — gratuita, sem API key, com dados de previsão similares.

---

### Fase 05 — Catálogo de Filmes

**Nome do projeto:** FlickBrowse

**Objetivo:** Aprender roteamento completo do Angular com lazy loading, parâmetros de rota e navegação programática.

**O que será construído:**
Um catálogo de filmes com página inicial (trending), página de busca, página de detalhes de filme (sinopse, elenco, avaliação, pôster) e navegação entre eles. A busca é feita via API pública.

**Features Angular praticadas:**
- Configuração de rotas com `Routes` e `provideRouter`
- Rotas com parâmetros dinâmicos (`:id` para detalhes do filme)
- Lazy loading de rotas com `loadComponent`
- `RouterLink` e navegação programática com `Router.navigate()`
- `input()` de rota para receber parâmetros (em vez de `ActivatedRoute`)
- `httpResource()` para buscar trending e detalhes, reativo ao parâmetro de rota
- `signal()` para termo de busca com debounce usando `toSignal()` e `debounceTime()` (primeiro contato com RxJS)
- `@if` para loading/erro, `@for` para listas

**O que esta fase NÃO cobre (e por quê):**
- Guards e resolvers — proteção de rotas e pré-carregamento vêm na Fase 10, quando a complexidade de navegação justificar
- @defer — carregamento diferido dentro de uma rota aparece na Fase 10; aqui o foco é o lazy loading da rota inteira
- Interceptors — ainda não há necessidade de autenticação complexa; o token TMDB vai na URL/query param
- Estado compartilhado — não há "favoritos" ou estado entre telas; isso vem na Fase 08

**Por que este mini projeto e não outro:**
Roteamento é infraestrutura obrigatória. Todo app com mais de uma tela precisa de rotas. Filmes são um domínio motivador (todo mundo tem opinião sobre filmes) com dados ricos o suficiente para justificar páginas de lista e detalhe. Lazy loading aparece aqui porque a página de detalhes pode ser pesada (pôster, elenco, recomendações). A Fase 05 é também a porta de entrada para RxJS: o debounce na busca usa `toSignal()` com `debounceTime()`, mostrando pela primeira vez como signals e observables podem colaborar.

**Nível:** ★★★☆☆ (Intermediário)

**Por que funciona pedagogicamente:**
A navegação "lista → detalhe → voltar" é o pattern mais comum de aplicações web. Praticar isso com dados reais (TMDB tem pôsteres, sinopses, notas) dá concretude ao conceito de rota parametrizada. O debounce na busca é a porta de entrada natural para o RxJS no contexto de signals.

**API pública:** [TMDB (The Movie Database)](https://developer.themoviedb.org/docs) — gratuita com API key, excelente documentação, dados ricos (filmes, séries, imagens, elenco).
**Alternativa:** [OMDb API](https://www.omdbapi.com/) — mais simples, também gratuita com key, retorna dados básicos de filmes.

---

### Fase 06 — Gestor de Tarefas

**Nome do projeto:** DoDone

**Objetivo:** Explorar Signal Forms — a API experimental de formulários do Angular 21 baseada em signals — e entender como ela muda o modelo mental de validação.

**O que será construído:**
Um gestor de tarefas com criação, edição, marcação como concluída e exclusão. Cada tarefa tem título (obrigatório), descrição (opcional), prioridade (alta/média/baixa), data limite (opcional, com validação) e tags. O formulário usa Signal Forms com validação em tempo real. Os dados são persistidos em `localStorage`.

**Features Angular praticadas:**
- `form()` do `@angular/forms/signals` para criar formulários reativos com signals
- `FormField` directive para vincular inputs ao modelo
- Validators: `required`, `minLength`, `maxLength`, validators customizados (ex: data no futuro)
- Leitura reativa de estado do formulário: `.valid()`, `.invalid()`, `.touched()`, `.errors()`
- `signal()` para a lista de tarefas
- `computed()` para filtros (por prioridade, por status, contagem de pendentes)
- `effect()` para persistir no `localStorage`
- Comparação mental com Reactive Forms clássico (FormGroup/FormControl) — o que mudou e por quê

**O que esta fase NÃO cobre (e por quê):**
- HTTP / API backend — o CRUD é local (localStorage) para isolar o aprendizado de forms da complexidade de backend
- Reactive Forms clássicos (FormGroup/FormControl) — não são o foco desta fase; aparecem como comparação conceitual para entender o que Signal Forms simplifica e o que ainda exige cautela
- Drag and drop / reordenação — complexidade de UX que obscureceria o foco em validação e estado de formulário
- Roteamento — app single-page; a filtragem de tarefas opera na mesma tela
- ControlValueAccessor — wrapping de componentes customizados com forms aparece na Fase 12

**Por que este mini projeto e não outro:**
Signal Forms (`form()` / `FormField`) trazem formulários para o modelo de reatividade de signals. Como a API ainda deve ser tratada com caveat de experimentalidade, esta fase ensina duas coisas ao mesmo tempo: a nova ergonomia e a disciplina de ler estabilidade de API antes de apostar em produção. Um gestor de tarefas cria demanda natural para os três cenários fundamentais de forms: criação (validação), edição (pré-preenchimento) e leitura (filtros computed). Alternativas como "formulário de cadastro" só teriam criação, perdendo a riqueza de CRUD e de edição inline.

**Nível:** ★★★☆☆ (Intermediário)

**Por que funciona pedagogicamente:**
Uma lista de tarefas é o "Hello World" de apps interativos, mas com Signal Forms ela se torna terreno fértil. O formulário de criação treina validação. A edição treina pré-preenchimento. A prioridade treina select/radio. Tags treinam inputs dinâmicos. E tudo isso com uma API moderna que deve ser estudada com curiosidade e senso crítico, não como dogma.

**API pública:** Nenhuma. Persistência local com `localStorage`. O foco é puro formulários — adicionar uma API aqui diluiria o aprendizado.

---

### Fase 07 — Diretório de Usuários

**Nome do projeto:** PeopleGrid

**Objetivo:** Praticar criação de diretivas standalone, pipes customizados e patterns avançados de composição com content projection.

**O que será construído:**
Um diretório que exibe cards de usuários fictícios com avatar, nome, email, localização e idade. O diretório suporta modos de visualização (grid/lista), ordenação, busca por nome e um componente de tooltip construído com diretiva. Pipes customizados formatam dados (idade relativa, iniciais do nome, capitalização de localização).

**Features Angular praticadas:**
- Diretiva standalone de atributo: `TooltipDirective` (mostra info ao hover)
- Diretiva standalone estrutural: `RepeatDirective` (renderiza N vezes, como exercício didático)
- Pipe standalone: `RelativeAgePipe` (25 → "25 anos"), `InitialsPipe` ("João Silva" → "JS")
- `<ng-content>` e `<ng-content select>` para compor cards com slots de conteúdo
- `input()` com transforms (ex: receber string e converter para number)
- `@for` com `track` e índice para listas otimizadas
- `@switch` para alternar modos de visualização

**Por que este mini projeto existe:**
Diretivas e pipes são features que devs intermediários frequentemente subutilizam, recorrendo a lógica no componente que ficaria melhor encapsulada. Um diretório de usuários cria demanda natural para formatação (pipes) e comportamento reutilizável (diretivas). A content projection aparece na composição do card, que precisa ser flexível.

**O que esta fase NÃO cobre (e por quê):**
- Signal Forms — o input de busca aqui é simples (`signal()` + binding); formulários complexos com validação ficaram na Fase 06
- Roteamento avançado — não há múltiplas rotas; a troca grid/lista/detalhe acontece na mesma tela com `@switch`
- HTTP interceptors — a Random User API não exige autenticação; interceptação de requests é Fase 09
- Estado compartilhado entre componentes distantes — o estado de busca/filtro é local; signal services vêm na Fase 08

**Por que este mini projeto e não outro:**
Diretivas são a feature mais subestimada do Angular. Devs iniciantes resolvem tudo com `@if` e lógica no componente, porque nunca viram o poder de uma diretiva de atributo bem feita. A diretiva de tooltip deste projeto mostra exatamente o tipo de encapsulamento que separa código amador de código profissional. A Random User API foi escolhida por fornecer dados ricos (avatar, nome, email, localização) sem setup — criando demanda natural para pipes de formatação.

**Nível:** ★★★☆☆ (Intermediário)

**Por que funciona pedagogicamente:**
Ao construir uma diretiva de tooltip do zero, você entende o que bibliotecas como Angular Material fazem por baixo dos panos. Ao criar um pipe de formatação, você percebe por que lógica de display não pertence ao componente. São revelações que só acontecem quando você implementa.

**API pública:** [Random User API](https://randomuser.me/) — gratuita, sem autenticação, gera perfis fictícios com avatar, nome, email, localização.
**Alternativa:** JSON estático com 50 usuários fictícios gerados previamente.

---

### Fase 08 — Mural de Favoritos

**Nome do projeto:** PinBoard

**Objetivo:** Aprender estado compartilhado entre componentes usando signals como serviço e a resource API para dados assíncronos reativos.

**O que será construído:**
Um mural onde o usuário busca itens de uma API (livros, imagens ou similar), adiciona aos favoritos, organiza em coleções e pode remover. O estado de favoritos é compartilhado entre a página de busca, a página do mural e um contador no header. Os dados do mural persistem no `localStorage`.

**Features Angular praticadas:**
- Signal-based service: serviço com `signal()` para estado de favoritos, `computed()` para contagem e filtros
- `resource()` para buscar dados assíncronos com loader customizado
- `linkedSignal()` para estado derivado com reset (ex: filtro do mural reseta ao trocar de coleção)
- Comunicação indireta entre componentes via serviço injetado
- `inject()` para injeção de dependência funcional
- `effect()` para sincronizar estado com `localStorage`
- Roteamento simples (busca / mural / detalhes)

**Por que este mini projeto existe:**
Estado compartilhado é o ponto onde a maioria dos apps cresce em complexidade. Angular moderno resolve isso com signals em serviços — sem necessidade de NgRx ou outra lib externa para estados médios. Este projeto ensina o pattern "signal store caseiro" que cobre 80% dos cenários reais.

**O que esta fase NÃO cobre (e por quê):**
- NgRx / SignalStore da lib @ngrx/signals — o foco é no pattern nativo de signal em serviço; libs de gerenciamento de estado são opção pós-trilha, quando a complexidade justificar
- Autenticação real — o estado de "favoritos" é local; autenticação com backend real está fora do escopo da trilha
- Comunicação em tempo real (WebSocket) — o estado compartilhado aqui é síncrono; streams assíncronos complexos vêm na Fase 09
- @defer — não há seções pesadas o suficiente para justificar carregamento diferido; isso é Fase 10

**Por que este mini projeto e não outro:**
O pattern "favoritar e exibir em outro lugar" é universal: aparece em e-commerces (wishlist), redes sociais (curtidas), apps de conteúdo (bookmarks). Angular não força uma lib de estado — signals em serviços resolvem a maioria dos casos. Este projeto ensina exatamente esse pattern, que é mais pragmático do que montar um NgRx store para 3 signals compartilhados.

**Nível:** ★★★☆☆ (Intermediário)

**Por que funciona pedagogicamente:**
A ação de "favoritar" é intuitiva e cria uma necessidade real de estado compartilhado: o botão na página de busca precisa saber se o item já é favorito, o header precisa mostrar a contagem, o mural precisa listar tudo. Nenhuma dessas informações pode ser local a um componente.

**API pública:** [Open Library API](https://openlibrary.org/developers/api) — gratuita, sem autenticação, busca livros por título/autor com capas.
**Alternativa:** [Pexels API](https://www.pexels.com/api/) — gratuita com API key, retorna fotos de alta qualidade para "favoritar".

---

### Fase 09 — Buscador em Tempo Real

**Nome do projeto:** LiveLens

**Objetivo:** Dominar a integração entre RxJS e Signals — combinando streams de eventos com estado reativo do Angular moderno.

**O que será construído:**
Um buscador unificado que consulta a API do GitHub (repositórios e usuários) conforme o usuário digita. Inclui debounce, indicador de loading, tratamento de erros, cancelamento de requests anteriores (switchMap), e exibição de resultados com highlight do termo buscado. Um interceptor adiciona headers de autenticação e loga requests.

**Features Angular praticadas:**
- `toSignal()` para converter Observable em Signal
- `toObservable()` para converter Signal em Observable
- Operadores RxJS: `debounceTime`, `distinctUntilChanged`, `switchMap`, `catchError`
- `HttpInterceptorFn` para interceptar requests (adicionar token, log, tratamento global de erros)
- `signal()` para estado do UI (aba ativa: repos/users, loading)
- `computed()` para derivar dados filtrados
- Comparação prática: "quando RxJS resolve melhor que signals puros" e vice-versa

**Por que este mini projeto existe:**
O Angular moderno não elimina RxJS — ele oferece signals como alternativa para estado, mantendo RxJS para streams de eventos e composição assíncrona complexa. Saber quando usar cada um é uma das competências mais valorizadas. O buscador com debounce/switchMap é o cenário canônico onde RxJS brilha, e a integração com signals mostra como combinar os dois mundos.

**O que esta fase NÃO cobre (e por quê):**
- NgRx Effects — os efeitos RxJS aqui são locais ao componente/serviço; orquestração com Effects é complexidade enterprise fora do escopo
- WebSocket / Server-Sent Events — RxJS é ideal para isso, mas streams persistentes são um tópico distinto que ultrapassaria o foco desta fase
- Testes de operadores RxJS — a prática de testes tem fase dedicada (13); aqui a prioridade é entender a interação signals ↔ observables
- httpResource para a busca — o objetivo é justamente mostrar quando RxJS (switchMap + cancelamento) é mais adequado que httpResource puro

**Por que este mini projeto e não outro:**
`debounceTime` + `distinctUntilChanged` + `switchMap` é o trio mais usado de RxJS em apps Angular reais. Todo autocomplete, toda busca typeahead, todo filtro de API usa essa combinação. Praticar num buscador GitHub cria um cenário com rate limiting real (60 req/h sem token), forçando entendimento de cancelamento e otimização de requests. Alternativas como "chat em tempo real" exigiriam WebSocket, que é uma complexidade ortogonal ao objetivo.

**Nível:** ★★★★☆ (Avançado)

**Por que funciona pedagogicamente:**
Debounce + switchMap é um pattern que todo dev Angular precisa conhecer. Mas em vez de ver isso num slide, você vai implementar e observar: "se eu digitar 'angular' letra por letra, quantos requests são feitos?". Essa observação empírica fixa o conceito melhor do que qualquer explicação.

**API pública:** [GitHub REST API](https://docs.github.com/en/rest) — gratuita (60 req/hora sem token, 5000 com token pessoal), endpoint `/search/repositories` e `/search/users`.
**Alternativa:** [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) — gratuita, sem autenticação, endpoint de busca com resultados ricos.

---

### Fase 10 — Pokédex Interativa

**Nome do projeto:** PokeSignals

**Objetivo:** Praticar roteamento avançado (rotas aninhadas, guards, resolvers), deferrable views (@defer) e patterns de carregamento progressivo.

**O que será construído:**
Uma Pokédex com lista paginada de Pokémon, página de detalhes com abas (stats, moves, evoluções), e uma seção de comparação (selecione dois Pokémon para comparar atributos). A lista carrega 20 por vez (scroll ou botão). Detalhes pesados (evoluções, movimentos) usam `@defer` para carregamento sob demanda.

**Features Angular praticadas:**
- Rotas aninhadas: `/pokemon/:id/stats`, `/pokemon/:id/moves`, `/pokemon/:id/evolution`
- `ResolveFn` para pré-carregar dados antes da ativação da rota
- `CanActivateFn` guard para validar que o ID é numérico
- `@defer` com `@loading`, `@placeholder` e triggers (`on viewport`, `on interaction`)
- `@for` com `track` e paginação controlada por signal
- `httpResource()` para dados dos Pokémon
- `computed()` para comparação de atributos
- `@if` e `@switch` para estados de carregamento e visualização

**Por que este mini projeto existe:**
`@defer` é a ferramenta de performance mais acessível do Angular moderno, mas só faz sentido quando há conteúdo pesado para adiar. Uma Pokédex tem exatamente isso: a lista é leve, mas a cadeia de evolução ou os 80+ movimentos de um Pokémon são pesados. As rotas aninhadas com abas criam demanda natural para resolver e guard.

**O que esta fase NÃO cobre (e por quê):**
- SSR / hydration — performance no servidor é Fase 11; aqui o foco é performance no client com carregamento diferido
- Interceptors — a PokéAPI não exige autenticação; interceptação já foi coberta na Fase 09
- Signal Forms — não há formulários neste projeto; a interação é toda de leitura/navegação
- Testes — os testes de rotas com guards/resolvers serão praticados na Fase 13

**Por que este mini projeto e não outro:**
A PokéAPI é o laboratório ideal para rotas aninhadas: um Pokémon tem stats, movimentos, cadeia evolutiva, tipos — cada um acessado por endpoints separados. Isso cria demanda real para tabs roteadas (`/pokemon/25/stats`, `/pokemon/25/moves`) e para `@defer` (não carregue os 80 movimentos se o usuário só quer ver stats). Alternativas como "blog com categorias" não teriam dados pesados o suficiente para que `@defer` fizesse diferença perceptível.

**Nível:** ★★★★☆ (Avançado)

**Por que funciona pedagogicamente:**
O domínio Pokémon é lúdico e bem conhecido. A PokéAPI é uma das APIs mais usadas para ensino justamente porque tem entidades ricas e relacionadas (Pokémon → espécie → cadeia evolutiva → habilidades → tipos). Isso cria demanda natural para rotas aninhadas, dados derivados e carregamento sob demanda.

**API pública:** [PokéAPI](https://pokeapi.co/) — gratuita, sem autenticação, dados detalhados de 1000+ Pokémon com relacionamentos.
**Alternativa:** Sem alternativa direta equivalente. Dados podem ser cacheados localmente como JSON.

---

### Fase 11 — Leitor de Artigos com SSR

**Nome do projeto:** PagePress

**Objetivo:** Entender SSR (Server-Side Rendering), hydration e modos de renderização por rota no Angular moderno.

**O que será construído:**
Um leitor de artigos com uma página de listagem (renderizada no servidor para SEO) e uma página de leitura. Artigos vêm de uma API de conteúdo. A listagem usa SSR completo. A página de leitura usa incremental hydration para ficar interativa progressivamente. Uma seção de comentários (fake) carrega somente no cliente.

**Features Angular praticadas:**
- Configuração de SSR com `@angular/ssr`
- Modos de renderização por rota (`RenderMode.Server`, `RenderMode.Client`, `RenderMode.Prerender`)
- Hydration e incremental hydration (`@defer (hydrate on ...)`)
- HttpClient com `provideHttpClient(withFetch())` para SSR compatível
- Interceptor para diferenciar ambiente server/browser (`isPlatformBrowser`)
- Rotas com lazy loading e resolvers para pré-carregar artigos no servidor
- Métricas básicas de performance: observar LCP e TTI com e sem SSR

**Por que este mini projeto existe:**
SSR é fundamental para aplicações que precisam de SEO e first paint rápido. Mas é um dos tópicos mais confusos para quem nunca configurou. Um leitor de artigos é o caso de uso canônico: listagem de artigos precisa ser indexável (SSR), leitura precisa ser rápida (hydration), comentários são interação pura (client-only).

**O que esta fase NÃO cobre (e por quê):**
- Deploy em produção com SSR (Node server, Docker, Vercel) — o foco é entender SSR localmente antes de otimizar infra
- Pre-rendering de todas as páginas — Prerender é mencionado mas o foco é SSR dinâmico; static site generation é outro padrão
- Autenticação com SSR — estado de sessão no servidor é complexo demais para esta fase; aqui os artigos são públicos
- Service Workers / PWA — caching offline é complementar a SSR mas é um tópico distinto

**Por que este mini projeto e não outro:**
Artigos são o caso de uso que justifica SSR de forma irrefutável: um motor de busca precisa indexar o conteúdo, e se o HTML chegar vazio (CSR), o artigo não aparece nos resultados. O JSONPlaceholder fornece dados simples (posts/comments) para que o foco fique no Angular SSR, não na complexidade do backend. Alternativas como "e-commerce com SSR" adicionariam catálogo, carrinho e autenticação — complexidade que obscureceria o conceito central.

**Nível:** ★★★★☆ (Avançado)

**Por que funciona pedagogicamente:**
SSR não é um conceito que se entende lendo docs. Precisa ver a diferença: "com SSR, o HTML chega pronto; sem SSR, chega um `<app-root>` vazio". Essa observação no DevTools, no `View Source`, é o que ancora o conceito. O leitor de artigos cria essas duas situações lado a lado.

**API pública:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/) — gratuita, sem autenticação, endpoints `/posts` e `/comments` ideais para simular artigos.
**Alternativa:** [Dev.to API](https://developers.forem.com/api) — gratuita, sem autenticação, retorna artigos reais com conteúdo markdown.

---

### Fase 12 — Kit de Formulários Acessíveis

**Nome do projeto:** A11yForms

**Objetivo:** Construir componentes de formulário acessíveis do zero, dominando ARIA, navegação por teclado e as novas diretivas de acessibilidade do Angular 21.

**O que será construído:**
Um kit de componentes reutilizáveis: input com label flutuante, select customizado, datepicker simplificado, rating por estrelas e stepper de formulário multi-etapa. Cada componente segue WAI-ARIA, funciona com teclado e screen reader, e é estilizado com Tailwind.

**Features Angular praticadas:**
- Angular ARIA directives (CdkListbox, CdkMenu ou equivalentes do Angular 21)
- Signal Forms integrado a componentes customizados
- `ControlValueAccessor` (ou equivalente Signal Forms) para componentes de formulário reutilizáveis
- Roles ARIA: `role="listbox"`, `role="option"`, `aria-expanded`, `aria-selected`, `aria-live`
- Navegação por teclado: preferir `host:` no decorator para capturar teclas e eventos
- `input()` para configurar componentes com signal inputs
- `<ng-content>` para flexibilidade do template
- Testes de acessibilidade com ferramentas de auditoria (axe-core ou similar)

**Por que este mini projeto existe:**
Acessibilidade é um requisito legal em muitos contextos e uma obrigação ética em todos. Mas é sistematicamente negligenciada porque "funciona sem ARIA" — para quem enxerga e usa mouse. Este projeto força a prática de acessibilidade por construção, não como afterthought.

**O que esta fase NÃO cobre (e por quê):**
- Acessibilidade de rotas e navegação — o foco é em componentes de formulário; acessibilidade de SPA navigation é um tópico complementar
- Angular CDK completo — apenas as diretivas relevantes para formulários (CdkListbox, etc.) são usadas; CDK Drag&Drop, Overlay, etc. estão fora do escopo
- Internacionalização (i18n) — frequentemente agrupada com a11y, mas é um tópico distinto
- Design system completo — estes componentes são exercícios de acessibilidade, não uma lib publicável

**Por que este mini projeto e não outro:**
Um select customizado acessível é o exercício mais revelador de acessibilidade: exige gerenciamento de foco, anúncios para screen readers, resposta a Arrow Up/Down, Enter e Escape. Componentes de formulário são onde acessibilidade mais falha em apps reais. Construir um kit do zero — em vez de usar Angular Material pronto — força o entendimento de WAI-ARIA que nenhum `mat-select` ensina.

**Nível:** ★★★★☆ (Avançado)

**Por que funciona pedagogicamente:**
Construir um select customizado acessível do zero é revelador. Você descobre que precisa gerenciar foco, anunciar mudanças para screen readers, responder a Arrow Up/Down, Enter e Escape. Essa complexidade, que bibliotecas resolvem silenciosamente, te faz entender e valorizar boas práticas de acessibilidade.

**API pública:** Nenhuma. O foco é puro componente e interação. Dados são mockados localmente.

---

### Fase 13 — Oficina de Testes

**Nome do projeto:** TestBench

**Objetivo:** Aprender a testar aplicações Angular modernas com Vitest como runner da trilha, cobrindo componentes, serviços, signals e integração.

**O que será construído:**
Não é um app novo. Esta fase pega componentes e serviços de 2–3 mini projetos anteriores (ex: serviço de favoritos da Fase 08, componente de busca da Fase 09, formulário da Fase 06) e cria uma suíte de testes completa para eles. O foco é escrever testes, não construir UI.

**Features Angular praticadas:**
- Configuração de Vitest com Angular como runner adotado nesta trilha/repositório
- `TestBed.configureTestingModule` com standalone components
- Teste de signal: verificar que `computed` recalcula, que `effect` executa
- Teste de `httpResource` com `provideHttpClientTesting` e `HttpTestingController`
- Teste de componente: renderizar, simular interação, verificar output
- Component harness para encapsular interação com componentes em teste
- Teste de interceptor: verificar que headers são adicionados
- Teste de formulário Signal Forms: preencher campos, validar, submeter
- Mocking de serviços com `vi.fn()`, `vi.mock()` ou helpers equivalentes do Vitest

**Por que este mini projeto existe:**
Testes são a feature mais pulada em trilhas de aprendizado — e a mais cobrada em projetos reais. Isolar a prática de testes numa fase dedicada garante foco total, sem a distração de construir UI ao mesmo tempo.

**O que esta fase NÃO cobre (e por quê):**
- Testes E2E (Playwright/Cypress) — o foco é testes unitários e de integração com Vitest; E2E é outro nível de complexidade
- Testes de performance / benchmarking — métricas de performance são Fase 14; aqui o foco é corretude
- 100% de cobertura — o objetivo é aprender a testar bem, não atingir uma métrica arbitrária; cobertura é mencionada como ferramenta, não como meta
- CI/CD — rodar testes em pipeline é configuração de infra, não de Angular

**Por que este mini projeto e não outro:**
Testar código que você mesmo escreveu cria uma conexão que exercícios artificiais não oferecem: você conhece a intenção por trás do código, então pode avaliar se o teste realmente verifica o comportamento correto. Reutilizar serviços e componentes das fases 06, 08 e 09 garante diversidade (formulários, estado compartilhado, HTTP) e revela quais trechos do seu próprio código são difíceis de testar — o que ensina a escrever código mais testável no futuro.

**Nível:** ★★★★☆ (Avançado)

**Por que funciona pedagogicamente:**
Testar código que você mesmo escreveu em fases anteriores cria uma conexão direta entre "como eu construí" e "como eu verifico". É diferente de testar exemplos artificiais. Você vai encontrar trechos do seu código que são difíceis de testar — e isso vai te ensinar a escrever código mais testável no futuro.

**API pública:** Nenhuma. Os testes usam mocks e `HttpTestingController`.

---

### Fase 14 — Dashboard de Métricas

**Nome do projeto:** MetricsLab

**Objetivo:** Integrar múltiplas features aprendidas nas fases anteriores em um projeto levemente maior, praticando composição e decisões arquiteturais.

**O que será construído:**
Um dashboard que exibe métricas de repositórios GitHub: estrelas, forks, issues abertas, linguagens usadas, e um gráfico de atividade recente. O usuário pode buscar repos, comparar dois repos lado a lado, e salvar repos favoritos. O dashboard atualiza dados periodicamente.

**Features Angular praticadas:**
- `httpResource()` e `resource()` para múltiplos endpoints reativos
- `signal()`, `computed()`, `linkedSignal()` para estado complexo
- `effect()` para persistência e sincronização
- `@defer` para seções pesadas (gráfico de atividade)
- Signal Forms para input de busca com validação
- Roteamento com lazy loading
- Interceptor para autenticação e rate limiting
- `toSignal()` e `toObservable()` para pontes RxJS ↔ Signals
- Estado compartilhado via signal service
- Testes para o serviço principal

**Por que este mini projeto existe:**
Após 13 fases focadas, é hora de combinar. Mas não num "grande projeto" — num mini projeto que simplesmente usa mais features ao mesmo tempo. A diferença é sutil mas real: aqui você escolhe quais patterns aplicar, não porque a fase manda, mas porque o problema pede.

**O que esta fase NÃO cobre (e por quê):**
- Monorepo / workspace com múltiplos apps — o dashboard é um `ng new` como todos os outros; Nx, libs compartilhadas e boundaries são escopo enterprise
- Autenticação real com OAuth/JWT — o token GitHub vai como variável de ambiente; fluxo de login/logout é complexidade que desviaria do foco de composição
- GraphQL — a GitHub API tem endpoint GraphQL, mas usamos REST para manter consistência com as fases anteriores
- Deploy / CI — o objetivo é composição de código, não infraestrutura de entrega

**Por que este mini projeto e não outro:**
A Fase 14 existe para responder uma pergunta: "consigo compor o que aprendi sem consultar fases anteriores a cada 5 minutos?". Um dashboard de métricas GitHub cria demanda natural para signals, httpResource, rotas, interceptors, estado compartilhado e forms — tudo junto. Não é um projeto maior; é um projeto que usa mais do que você aprendeu, forçando decisões arquiteturais reais (onde colocar cada signal, quando usar serviço compartilhado, quando usar `resource` vs `httpResource`).

**Nível:** ★★★★★ (Avançado+)

**Por que funciona pedagogicamente:**
Quando tudo é novo, tudo é difícil. Mas na Fase 14, signals já são familiares, routing já é confortável, httpResource já foi usado 5 vezes. O desafio agora é composição: "como organizo signals e services quando tenho 3 fontes de dados e 4 componentes que dependem delas?". Essa é a pergunta de nível sênior.

**API pública:** [GitHub REST API](https://docs.github.com/en/rest) — endpoints `/repos/:owner/:repo`, `/search/repositories`, `/repos/:owner/:repo/stats`.
**Alternativa:** [GitLab API](https://docs.gitlab.com/ee/api/) — similar, gratuita com token pessoal.

---

## 6. APIs Públicas — Resumo por Projeto

| Fase | Mini Projeto | API | Auth | Por que foi escolhida |
|------|---|---|---|---|
| 01 | UnitFlip | Nenhuma | — | Fórmulas locais. Sem HTTP na primeira fase |
| 02 | ShowCase | Nenhuma | — | Dados estáticos. Foco no template |
| 03 | GlobeHop | REST Countries | Sem | JSON rico, sem autenticação, ideal para primeiro contato HTTP |
| 04 | SkyPulse | OpenWeatherMap | API Key | Dados dinâmicos reais, justifica reatividade |
| 05 | FlickBrowse | TMDB | API Key | Dados ricos (imagens, sinopse), excelente documentação |
| 06 | DoDone | Nenhuma | — | Dados locais (localStorage). Foco puro em formulários |
| 07 | PeopleGrid | Random User | Sem | Perfis fictícios com avatar, sem autenticação |
| 08 | PinBoard | Open Library | Sem | Busca de livros com capas, sem autenticação |
| 09 | LiveLens | GitHub REST | Token | Busca poderosa, rate limiting real, headers customizados |
| 10 | PokeSignals | PokéAPI | Sem | Entidades relacionadas, dados ricos para rotas aninhadas |
| 11 | PagePress | JSONPlaceholder | Sem | Dados simples para focar no SSR, não no backend |
| 12 | A11yForms | Nenhuma | — | Foco em componentes e acessibilidade, sem dependência externa |
| 13 | TestBench | Nenhuma | — | Mocks e HttpTestingController |
| 14 | MetricsLab | GitHub REST | Token | Dados reais e complexos para projeto de integração |

### Se uma API falhar

Toda fase que usa API pública inclui alternativa: API secundária ou JSON estático local. Isso garante que nenhum mini projeto fique bloqueado por indisponibilidade externa. Na pior das hipóteses, o JSON local permite praticar 100% das features Angular — a API é veículo, não destino.

---

## 7. Estratégia Pedagógica

### Como um bom professor conduziria cada fase

Antes de escrever código, um bom professor faria você formular hipóteses. A trilha deve simular isso com perguntas curtas antes de cada conceito:

- **Antes de `signal()`:** "Qual valor muda? Quem depende dele? O que deve acontecer quando ele mudar?"
- **Antes de `computed()`:** "Este dado é armazenado ou derivado? Se é derivado, por que eu salvaria uma cópia?"
- **Antes de `effect()`:** "Estou calculando estado ou atravessando a fronteira para o mundo externo?"
- **Antes de `httpResource()`:** "A request depende de qual estado? O que a tela mostra enquanto carrega, falha ou retorna vazio?"
- **Antes de uma rota lazy:** "Esta tela precisa existir no bundle inicial ou pode chegar quando o usuário pedir?"
- **Antes de SSR:** "Esta página precisa ser entendida antes do JavaScript carregar?"

Esse método é socrático no sentido clássico: a pergunta vem antes da resposta. Martin Fowler costuma defender que bons designs revelam intenção; aqui, boas perguntas revelam se a intenção técnica existe antes da API aparecer.

### A regra explicar-simular-transferir

Cada fase deve passar por três movimentos:

1. **Explicar:** escreva em 3 frases o problema que a feature resolve.
2. **Simular:** provoque um erro controlado e observe o comportamento do Angular.
3. **Transferir:** mude um detalhe do domínio e veja se o pattern sobrevive.

Kent Beck popularizou a ideia de passos pequenos com feedback rápido. A versão de estudo é a mesma: avance em incrementos pequenos, rode o app, leia o erro, ajuste o modelo mental. Se você só copia um bloco grande e torce para funcionar, perde o feedback mais valioso.

### Revisão 24h / 7d / 21d

Retenção não acontece no momento em que o código compila; ela acontece quando você consegue reconstruir a ideia depois de esquecer parte dela. Use este ritmo:

| Quando revisar | O que fazer | Sinal de domínio |
|---|---|---|
| 24 horas depois | Reimplemente o trecho principal sem olhar o guia | Você lembra o fluxo geral mesmo esquecendo nomes exatos |
| 7 dias depois | Explique o projeto em voz alta para alguém ou para si mesmo | Você consegue justificar decisões, não só narrar passos |
| 21 dias depois | Adicione uma mini feature nova sem consultar a fase | O pattern foi transferido para um problema vizinho |

Essa prática usa recuperação ativa: lembrar com esforço fixa mais do que reler com conforto. Robert Bjork chamaria esse desconforto de desejável quando ele aumenta retenção de longo prazo.

### Como estudar sem virar copiador de código

O maior risco de qualquer trilha estruturada é criar a ilusão de aprendizado: você segue os passos, o código funciona, mas você não sabe reproduzir sem o guia. Para combater isso, a trilha adota cinco práticas anti-cópia:

1. **Tente antes de ler a solução.** Se a fase diz "crie um pipe de formatação de população", implemente antes de ver o exemplo. O erro te ensina mais que o acerto guiado.
2. **Mude o domínio.** Se a Fase 03 usa países, refaça com universidades ([Hipolabs Universities](http://universities.hipolabs.com/)). Se a estrutura sobreviver à troca de domínio, você aprendeu o pattern, não só o exemplo.
3. **Explique em voz alta.** Se você não consegue explicar por que `computed` recalcula automaticamente sem nenhum subscribe, volte e estude. A explicação verbal revela lacunas que o código esconde.
4. **Delete e reimplemente.** Depois de completar uma fase, apague o componente principal e reimplemente sem consultar. A segunda vez é sempre mais rápida — e a diferença entre as duas versões mostra o que você realmente internalizou.
5. **Compare abordagens.** Em fases que mencionam alternativas (Signal Forms vs Reactive Forms, RxJS vs httpResource), implemente ambas e documente a diferença num comentário no código.

### Como validar entendimento real

Para cada fase, faça este teste mental antes de avançar:

| Pergunta | Se você não consegue responder... |
|---|---|
| Qual problema Angular este projeto resolve? | Você seguiu a receita sem entender a motivação |
| Qual feature Angular é a protagonista? | Você misturou tudo sem foco |
| O que acontece se eu remover essa feature? | Você não entende o papel dela no código |
| Quando eu usaria isso num projeto real? | Você aprendeu a sintaxe, mas não o contexto |
| Qual alternativa existe e por que não usei? | Você não explorou trade-offs |

Se todas as respostas saem naturais, avance. Se alguma trava, aprofunde antes de prosseguir.

### Rubrica de fluência antes de avançar

Use esta rubrica para decidir se você está pronto para a próxima fase:

| Nível | Como se manifesta |
|---|---|
| Copiei | O app funciona, mas você precisa olhar o guia para explicar quase tudo |
| Reconheço | Você entende o código quando lê, mas ainda não o recria sozinho |
| Reproduzo | Você reimplementa o núcleo da fase com consulta mínima |
| Transfiro | Você aplica o mesmo pattern em outro domínio sem perder a estrutura |
| Ensino | Você explica trade-offs, erros comuns e alternativas com exemplos próprios |

Avance quando estiver pelo menos em **Reproduzo**. Volte quando perceber que ainda está em **Reconheço**. Ensinar é o nível ideal, mas não precisa esperar perfeição: como Vygotsky sugeriria, aprendizado avança melhor quando existe desafio com apoio, não domínio absoluto antes de qualquer próximo passo.

### Como revisar mini projetos depois de concluídos

A revisão pós-conclusão é onde o aprendizado se consolida. Três semanas depois de completar uma fase:

1. **Releia seu código sem executar.** Você entende o que cada signal faz? Onde está o estado? Onde estão os efeitos colaterais?
2. **Identifique um trecho que você escreveria diferente hoje.** Se você faria diferente, significa que cresceu. Se faria igual, ou não cresceu ou acertou de primeira (raro).
3. **Adicione uma feature pequena sem consultar a fase.** No UnitFlip, adicione conversão de velocidade. No GlobeHop, adicione ordenação por população. Essas extensões testam se você domina a base ou só decorou os passos.

### Como usar comparação entre abordagens

Algumas fases criam oportunidade de comparação explícita. Não pule essas comparações — elas são o exercício mais valioso da trilha:

- **Fase 01:** `signal` + `computed` vs variáveis simples com getters — por que a reatividade importa?
- **Fase 06:** Signal Forms vs Reactive Forms — o que ficou mais simples? O que ficou diferente?
- **Fase 09:** RxJS `switchMap` vs `httpResource` reativo — quando cada abordagem é mais adequada?
- **Fase 10:** `@defer` vs lazy loading de rota — qual é o escopo de cada otimização?
- **Fase 11:** SSR vs CSR — quando vale o custo adicional?

Para cada comparação, escreva 3 frases: (1) o que cada abordagem faz bem, (2) o que faz mal, (3) qual você escolheria para um projeto real e por quê.

### Como usar erros como ferramenta de aprendizagem

Erros não são obstáculos — são dados. A trilha incentiva provocar erros deliberados:

- **Na Fase 01:** O que acontece se você tentar ler um signal como propriedade em vez de chamá-lo como função? E se usar `.set()` dentro de um `computed`?
- **Na Fase 03:** O que acontece se a API retornar 404? E se a rede cair no meio da request?
- **Na Fase 06:** O que acontece se submeter um form inválido? E se não chamar `.reset()` depois de salvar?
- **Na Fase 09:** O que acontece se NÃO usar `switchMap` (usar `mergeMap` no lugar)? Quantas requests ficam abertas?

Cada erro provoca uma mensagem ou comportamento que ensina como o Angular funciona por dentro. Documentar esses erros no seu próprio caderno de estudos é mais valioso do que memorizar a sintaxe correta.

### Como transformar implementação em retenção de longo prazo

Implementar é necessário mas não suficiente. Para reter:

1. **Espaçe a prática.** Não faça 3 fases num dia e 0 por duas semanas. Uma fase a cada 3–5 dias mantém o momentum e dá tempo para consolidação.
2. **Ensine o que aprendeu.** Escreva um post curto, grave um vídeo de 5 minutos, ou explique para um colega. Ensinar é o teste mais rigoroso de compreensão.
3. **Conecte com projetos reais.** Ao terminar a Fase 05 (roteamento), olhe o roteamento de um projeto real que você trabalha. As decisões fazem sentido? O que está diferente?
4. **Mantenha um changelog mental.** "Antes desta fase, eu não sabia que linkedSignal existia. Agora sei que resolve o pattern de estado derivado com reset." Essa narrativa interna organiza o conhecimento.

### Microdesafios sem consulta

Ao terminar cada fase, faça um microdesafio de 20–40 minutos sem abrir a solução:

- Mude o domínio mantendo a mesma arquitetura.
- Adicione uma validação, filtro, rota ou estado derivado pequeno.
- Remova uma abstração e veja se o código ficou melhor ou pior.
- Escreva uma pergunta de entrevista que você conseguiria responder com aquele projeto.

Seymour Papert defendia que aprender construindo muda a qualidade do entendimento. O microdesafio é esse princípio em escala pequena: você não prova que entendeu Angular lendo; prova quando consegue construir uma variação.

---

## 8. Progressão de Dificuldade

### Os quatro níveis e o que muda em cada um

A trilha está organizada em quatro camadas. Não é apenas uma escala de dificuldade — cada camada exige um **tipo diferente de raciocínio**:

| Camada | Tipo de raciocínio | O que você decide |
|---|---|---|
| Fundacional (01–04) | **Mecânico** — "como funciona?" | Onde colocar o signal, como ligar computed ao template |
| Intermediário (05–08) | **Estrutural** — "como organizo?" | Onde cortar componentes, como estruturar rotas, onde colocar estado |
| Avançado (09–13) | **Estratégico** — "quando usar o quê?" | Signals vs RxJS, SSR vs CSR, @defer vs lazy loading |
| Integração (14) | **Arquitetural** — "como combinar?" | Quais patterns aplicar juntos, como compor serviços e rotas |

### Fases fundacionais (★–★★) — Aprendendo o vocabulário

| Fase | Foco | Pré-requisito |
|---|---|---|
| 01 – UnitFlip | Signals básicos | TypeScript básico, Angular CLI |
| 02 – ShowCase | Templates modernos | Fase 01 (conceito de signal) |
| 03 – GlobeHop | HTTP e dados | Fase 01 + 02 |
| 04 – SkyPulse | Signals avançados | Fase 01 + 03 |

**O que marca a transição para o nível seguinte:** Você consegue, sem consultar documentação, criar um signal, derivar um computed, e fazer um httpResource reativo a mudanças de parâmetro. Se isso é natural, avance. Se ainda precisa pensar na sintaxe, pratique mais.

**Salto cognitivo para o intermediário:** Nas fases fundacionais, os problemas são "como faço X funcionar?". A partir da Fase 05, os problemas mudam para "como organizo X dentro da estrutura do app?". A pergunta deixa de ser sintática e passa a ser estrutural.

Estas fases constroem o vocabulário mínimo: signals para estado, template moderno para renderização, httpResource para dados. Faça todas na ordem.

### Fases intermediárias (★★★) — Aprendendo a organizar

| Fase | Foco | Pré-requisito |
|---|---|---|
| 05 – FlickBrowse | Roteamento | Fases 01–03 |
| 06 – DoDone | Formulários | Fase 01 |
| 07 – PeopleGrid | Composição | Fases 01–02 |
| 08 – PinBoard | Estado compartilhado | Fases 01, 03, 05 |

**O que marca a transição para o nível seguinte:** Você consegue estruturar um app com rotas, formulários e estado compartilhado sem que o código vire uma teia. Se você olha para o seu serviço de favoritos e consegue explicar por que o signal está no serviço e não no componente, está pronto.

**Salto cognitivo para o avançado:** No intermediário, cada feature era protagonista isolada. No avançado, as features interagem e competem: "uso signals ou RxJS aqui?", "SSR ou CSR para esta rota?". O raciocínio passa de "como implemento" para "quando é a hora certa de usar".

Aqui a ordem é mais flexível. Se formulários te interessam mais que roteamento, faça a 06 antes da 05. O pré-requisito real é dominar signals (Fase 01).

### Fases avançadas (★★★★) — Aprendendo a escolher

| Fase | Foco | Pré-requisito |
|---|---|---|
| 09 – LiveLens | RxJS + Signals | Fases 01, 03, 05 |
| 10 – PokeSignals | Rotas avançadas + @defer | Fases 05, 03 |
| 11 – PagePress | SSR | Fases 05, 03 |
| 12 – A11yForms | Acessibilidade | Fase 06 |
| 13 – TestBench | Testes | Pelo menos 3 fases completadas |

**O que marca a transição para a integração:** Você consegue, ao olhar um problema novo, identificar qual combinação de features Angular resolve melhor — e justificar a escolha. "Uso httpResource porque a busca é reativa ao parâmetro, mas uso switchMap no autocomplete porque preciso cancelar requests anteriores."

Estas fases podem ser feitas na ordem que fizer sentido para o seu objetivo. Se SSR é prioridade no trabalho, pule para a 11. Se testes são urgentes, vá para a 13 depois de ter 3 projetos implementados.

### Fase de integração (★★★★★) — Aprendendo a compor

| Fase | Foco | Pré-requisito |
|---|---|---|
| 14 – MetricsLab | Composição de features | Pelo menos 8 fases completadas |

**O que significa "sucesso" aqui:** Você compõe signals, rotas, httpResource, interceptors e estado compartilhado num projeto sem consultar fases anteriores a cada decisão. As escolhas são suas, não do guia.

Opcional, mas recomendada. Aqui você mede sua maturidade: se consegue compor sem consultar fases anteriores o tempo todo, você internalizou.

### Fases opcionais e trilhas mínimas

Nenhuma fase é obrigatória — mas se tempo for escasso, priorize:
- **Mínimo viável (5 fases):** 01, 03, 05, 06, 09 — signals, HTTP, rotas, forms, RxJS
- **Recomendado (10 fases):** 01 a 10 — cobertura sólida de Angular moderno
- **Completo (14 fases):** 01 a 14 — domínio profundo com SSR, a11y, testes e integração

---

## 9. Critérios de Qualidade para as Próximas Fases

Cada fase futura (01 a 14) seguirá um padrão consistente de conteúdo. Estes são os critérios que todo documento de fase deve respeitar:

### Estrutura obrigatória

1. **Objetivo claro em uma frase** — O que será aprendido e por quê
2. **O que será construído** — Descrição concreta do mini projeto com escopo definido
3. **Contexto antes do código** — Explicação do "por quê" antes do "como". Nenhum bloco de código aparece sem motivação prévia
4. **Features Angular em foco** — Lista explícita das APIs e patterns praticados
5. **O que esta fase NÃO cobre** — Exclusões explícitas com justificativa, para manter o escopo
6. **Justificativa técnica** — Por que essa feature existe, qual problema resolve, como era antes
7. **Trade-offs** — O que a abordagem escolhida ganha e o que perde. "computed é melhor que effect para derivação — mas por quê?"
8. **Erros comuns** — Armadilhas que devs encontram com frequência, apresentadas como "tente fazer X errado e observe o resultado"
9. **Passo a passo de implementação** — Progressivo, do mais simples ao completo, com checkpoints intermediários
10. **Checkpoints cognitivos** — Perguntas de verificação distribuídas ao longo da fase (não só no final). "Antes de prosseguir: por que o computed recalcula quando o signal muda?"
11. **Mini desafios** — Extensões opcionais que testam compreensão: "adicione conversão de velocidade ao UnitFlip sem consultar o código das outras conversões"
12. **Perguntas de entrevista** — Quando a feature for relevante para posições sênior. Ex: "Explique a diferença entre signal e BehaviorSubject"
13. **Fechamento com consolidação** — Resumo do que foi aprendido, o que muda no modelo mental, e preview do que vem na próxima fase
14. **Código de referência** — Exemplos completos e funcionais, nunca fragments isolados

### O que NÃO deve existir nas fases

- Setup que não contribui para o aprendizado da feature principal
- Configuração enterprise (monorepo, CI, boundaries, CODEOWNERS)
- Explicação de tooling como protagonista (ESLint, Husky, commitlint)
- Arquitetura por camadas artificiais (domain/infra/presentation num mini projeto)
- Abstrações prematuras (serviços genéricos para problemas específicos)
- Comentários óbvios no código

### Diretriz editorial

O tom é de mentor técnico, não de documentação oficial. Cada fase pode (e deve) ter opinião, desde que justificada. "Use `computed` em vez de `effect` para derivação" é uma diretriz válida com justificativa técnica. "Configure ESLint porque todo projeto deve ter lint" é dogma sem contexto.

---

## 10. Fechamento

### Resumo executivo

Esta trilha cobre Angular 18–21 em **14 mini projetos independentes**, organizados do fundacional ao avançado:

- **Fases 01–04** constroem a base: signals, templates modernos, dados e reatividade
- **Fases 05–08** expandem o repertório: roteamento, formulários, composição e estado
- **Fases 09–13** aprofundam temas avançados: RxJS, performance, SSR, acessibilidade e testes
- **Fase 14** integra tudo num projeto levemente maior

Cada projeto é auto-contido, usa `ng new` com Angular 21, e foca em features específicas do framework. Não há monorepo, shell, pipeline de CI ou arquitetura enterprise. A complexidade está no Angular, não ao redor dele.

### Por que a trilha foi desenhada assim

Três decisões de design sustentam esta trilha:

**1. Mini projetos em vez de projeto único.** Aprender um framework é construir modelos mentais. Modelos mentais se formam por repetição variada — ver signals resolver problemas diferentes em contextos diferentes. Um grande projeto oferece repetição, mas sem variação: o mesmo app, a mesma estrutura, os mesmos serviços. Mini projetos oferecem repetição **e** variação: signals no conversor, signals no clima, signals no dashboard. Cada contexto revela uma faceta diferente da mesma ferramenta.

**2. Sem infraestrutura desnecessária.** Nx, monorepo, CODEOWNERS, Husky, commitlint — tudo isso tem valor em projetos reais. Mas numa trilha de aprendizado, cada ferramenta extra é atrito cognitivo que compete com o Angular. Eliminar essa camada mantém o foco onde importa.

**3. Escopo controlado por fase.** Cada fase tem exclusões explícitas ("O que esta fase NÃO cobre"). Isso previne o problema mais comum de trilhas: uma fase que deveria ensinar roteamento acaba ensinando roteamento + interceptors + guards + resolvers + state management + testes — e o aluno não domina nenhum.

Além disso, mini projetos respeitam a energia. Terminar um projeto de 2–4 horas gera satisfação e impulso para o próximo. Carregar um projeto de 60 horas com setup de 8 gera cansaço e atrito crescente. A motivação importa tanto quanto o conteúdo.

### Por que começar pelo UnitFlip

A Fase 01 (UnitFlip — Conversor de Unidades) foi escolhida como ponto de partida por três razões:

1. **Domínio trivial.** Todo mundo sabe o que é converter Celsius para Fahrenheit. Carga cognitiva zero no domínio significa atenção total no Angular.
2. **Reatividade pura.** Um input muda, um output recalcula. Esse é o modelo mental de `signal` + `computed` na sua forma mais destilada. Sem HTTP, sem rotas, sem formulários — só reatividade.
3. **Resultado imediato.** Em 30 minutos, o conversor funciona. Essa vitória rápida calibra a expectativa para toda a trilha: projetos pequenos, aprendizado concreto, progresso visível.

O escopo é deliberadamente pequeno:

- `ng new unitflip` — um projeto Angular 21 limpo
- Um componente que usa `signal()` para um valor numérico
- Um `computed()` que converte esse valor em outra unidade em tempo real
- Um `effect()` que salva o histórico no `localStorage`
- Nenhuma API, nenhum roteamento, nenhum formulário complexo

O objetivo é sair da Fase 01 com uma compreensão visceral de como signals funcionam: quando atualizam, por que atualizam, e o que acontece quando não atualizam. Esse alicerce sustenta todas as 13 fases seguintes.

### Preparação mental

Antes de abrir o terminal e rodar `ng new`, responda:

- **Por que signals?** Porque o Angular vem migrando de um modelo mental baseado em detecção de mudanças global para um modelo de reatividade granular. Entender signals é entender o futuro do framework.
- **Por que não começar com um projeto "real"?** Porque projetos reais misturam 10 conceitos simultaneamente. Aprender é separar conceitos e dominá-los um por um.
- **Por que 14 projetos e não 5 ou 30?** 14 cobre os pilares do Angular moderno sem diluir nem comprimir. Cada projeto tem espaço para profundidade, e o conjunto tem diversidade suficiente para fixação.

---

### Como saber que a Fase 00 cumpriu seu papel

Você não precisa decorar este documento. Ele cumpriu seu papel se, ao fechar a leitura, você consegue responder:

- Por que a trilha usa mini projetos independentes em vez de um app gigante?
- Qual é a diferença entre aprender sintaxe Angular e construir fluência em Angular?
- Por que signals mudam o modelo mental do framework?
- Quando `computed()` é melhor que `effect()`?
- Por que Signal Forms e `resource/httpResource` devem ser estudados com atenção à estabilidade da API?
- Como estudar uma fase sem virar copiador de código?
- O que fazer quando uma API pública falhar?
- Qual fase você deve escolher se seu objetivo imediato for forms, rotas, SSR, testes ou acessibilidade?

Se essas respostas estão claras, a Fase 00 fez o trabalho dela: ela não ensinou tudo, mas te deu um mapa confiável, um método de estudo e critérios para perceber progresso real.

> **Nota final:** Este documento é o mapa. Os documentos de cada fase (01 a 14) são o território. O mapa mostra para onde ir. O território é onde o aprendizado acontece.
