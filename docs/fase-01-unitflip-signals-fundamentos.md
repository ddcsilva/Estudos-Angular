# Fase 01 — UnitFlip: Fundamentos Reativos com Signals

> **O que é este documento:** o guia completo da primeira fase da trilha de mini projetos Angular moderno. Ensina `signal`, `computed` e `effect` construindo um conversor de unidades progressivo.
> **O que não é:** tutorial de setup, aula de CSS, guia de arquitetura.
> **Pré-requisito:** TypeScript básico (tipos, interfaces, arrow functions) e Angular CLI instalado (`ng version` funciona no terminal).
> **Tempo estimado:** 3–5 horas de estudo focado, não de codificação corrida.

---

## Sumário

- [1. Visão da Fase](#1-visão-da-fase)
- [2. O que Será Construído](#2-o-que-será-construído)
- [3. O que Você Vai Aprender](#3-o-que-você-vai-aprender)
- [4. Modelo Mental Central](#4-modelo-mental-central)
- [5. Intuição e Analogias](#5-intuição-e-analogias)
- [6. Mapa da Construção](#6-mapa-da-construção)
- [7. Construção Progressiva do Projeto](#7-construção-progressiva-do-projeto)
  - [Acordo de baixa carga cognitiva](#acordo-de-baixa-carga-cognitiva)
  - [Etapa 1 — Criar o projeto e o componente base](#etapa-1--criar-o-projeto-e-o-componente-base)
  - [Etapa 2 — O primeiro signal: valor digitado](#etapa-2--o-primeiro-signal-valor-digitado)
  - [Etapa 3 — Unidades de origem e destino](#etapa-3--unidades-de-origem-e-destino)
  - [Etapa 4 — O primeiro computed: conversão em tempo real](#etapa-4--o-primeiro-computed-conversão-em-tempo-real)
  - [Etapa 5 — Expandir para múltiplas categorias](#etapa-5--expandir-para-múltiplas-categorias)
  - [Etapa 6 — Histórico de conversões](#etapa-6--histórico-de-conversões)
  - [Etapa 7 — Persistir histórico com effect](#etapa-7--persistir-histórico-com-effect)
  - [Etapa 8 — Carregar histórico ao iniciar](#etapa-8--carregar-histórico-ao-iniciar)
- [8. Explicações Guiadas Pós-Construção](#8-explicações-guiadas-pós-construção)
- [9. Comparações Fundamentais](#9-comparações-fundamentais)
- [10. Laboratório de Erros Comuns](#10-laboratório-de-erros-comuns)
- [11. Checkpoints Cognitivos](#11-checkpoints-cognitivos)
- [12. Exercícios de Consolidação](#12-exercícios-de-consolidação)
- [13. Perguntas de Entrevista e Visão Sênior](#13-perguntas-de-entrevista-e-visão-sênior)
- [14. Resumo Final da Fase](#14-resumo-final-da-fase)

---

## 1. Visão da Fase

### Objetivo

Construir um entendimento profundo de como o Angular moderno gerencia estado reativo. Ao final desta fase, você saberá usar `signal`, `computed` e `effect` com precisão — não porque decorou a sintaxe, mas porque entendeu o modelo mental por trás.

O objetivo não é "fazer um conversor". O conversor é o laboratório. O objetivo real é aprender a responder, com segurança, três perguntas que aparecem em qualquer app Angular moderno:

1. **Qual dado é fonte de verdade?**
2. **Qual dado é apenas consequência de outro?**
3. **Qual ação atravessa a fronteira entre Angular e o mundo externo?**

Se essas três perguntas ficarem claras, `signal`, `computed` e `effect` deixam de ser APIs soltas e viram uma forma previsível de desenhar estado.

### Por que este mini projeto

Um conversor de unidades é o veículo perfeito para isolar reatividade:

- **O domínio é trivial.** Todo mundo sabe o que é converter Celsius para Fahrenheit. Isso libera 100% da atenção para o Angular.
- **O fluxo é puro.** Um valor entra, uma transformação acontece, um resultado sai. Esse fluxo mapeia diretamente para `signal → computed → template`.
- **O efeito colateral é natural.** Salvar histórico de conversões no `localStorage` é um side effect real, não artificial.
- **O escopo é controlado.** Nenhuma API, nenhuma rota, nenhum formulário complexo. Só estado, derivação e efeito.

### Por que esta é a melhor porta de entrada

Signals são o primitivo reativo do Angular moderno. APIs mais avançadas da plataforma constroem em cima da mesma ideia: estado explícito, dependências rastreáveis e atualização previsível. Se o alicerce for frágil, tudo desmorona. Se for sólido, tudo que vem depois é extensão natural.

A Fase 01 existe para garantir que esse alicerce seja sólido.

John Sweller, ao estudar carga cognitiva, mostrou que aprender fica mais difícil quando muitos conceitos competem pela mesma atenção. Por isso esta fase remove HTTP, rotas, forms e componentização. Não é pobreza de escopo; é engenharia didática. Um conceito difícil merece um ambiente simples.

### O que você vai dominar ao final

- Criar estado reativo com `signal()`
- Derivar valores com `computed()` — e entender por que isso é diferente de calcular manualmente
- Executar efeitos colaterais com `effect()` — e entender por que isso não é derivação
- Ler signals no template e observar atualizações automáticas
- Distinguir com clareza: fonte de estado, valor derivado e efeito colateral
- Reconhecer os erros mais comuns com signals e saber evitá-los

---

## 2. O que Será Construído

### O mini projeto: UnitFlip

Um conversor interativo de unidades com três categorias:

1. **Temperatura** — Celsius ↔ Fahrenheit ↔ Kelvin
2. **Distância** — Metros ↔ Quilômetros ↔ Milhas
3. **Peso** — Quilogramas ↔ Gramas ↔ Libras

O usuário digita um valor, escolhe a unidade de origem e a unidade de destino. O resultado aparece instantaneamente, sem nenhum botão de "converter". Um histórico das últimas conversões é mantido e persiste entre sessões do navegador.

### O que entra no escopo

| Entra | Por quê |
|---|---|
| `signal()` para valor digitado, unidades selecionadas, histórico | São os estados fonte da aplicação |
| `computed()` para resultado da conversão | É derivação pura — depende do valor e das unidades |
| `effect()` para persistir histórico no `localStorage` | É efeito colateral legítimo — sincroniza com o mundo externo |
| Standalone component | Padrão do Angular moderno |
| Zoneless change detection | Padrão didático da trilha para treinar o modelo moderno |
| Template com `@if` e `@for` | Uso mínimo para exibir histórico e resultado |

### O que NÃO entra no escopo

| Não entra | Por quê |
|---|---|
| HTTP / APIs | Fórmulas de conversão são matemática pura; HTTP vem na Fase 03 |
| Roteamento | Uma tela única; rotas vêm na Fase 05 |
| Signal Forms / Reactive Forms | O input aqui é simples; formulários complexos vêm na Fase 06 |
| Múltiplos componentes | Um componente é suficiente para o conversor; componentização vem na Fase 02 |
| Estilização elaborada | CSS mínimo funcional; a atenção é no Angular, não na aparência |
| Diretivas, pipes customizados | Vêm nas Fases 03 e 07 |

---

## 3. O que Você Vai Aprender

Competências concretas, não buzzwords:

1. **Criar um signal** — `signal(0)` — e entender que ele é uma caixa reativa que notifica leitores quando muda
2. **Atualizar um signal** — `.set()` para substituir, `.update()` para derivar do valor anterior
3. **Derivar estado com computed** — `computed(() => ...)` — e entender que ele é preguiçoso (só calcula quando lido) e memorizado (só recalcula quando a dependência muda)
4. **Executar efeito colateral com effect** — `effect(() => ...)` — e entender que ele roda automaticamente quando qualquer signal lido dentro dele muda
5. **Reconhecer quando `onCleanup` é necessário** — timers, subscriptions e recursos que precisam ser liberados; `localStorage` não precisa disso
6. **Ler signals no template** — `{{ meuSignal() }}` — e entender que o Angular registra quais leituras dependem de quais signals
7. **Distinguir os três papéis** — fonte (`signal`), derivação (`computed`), efeito (`effect`) — e nunca confundir um com o outro
8. **Identificar erros comuns** — usar `effect` para derivação, duplicar estado, criar signals desnecessários

---

## 4. Modelo Mental Central

Esta seção é a mais importante da fase. Leia com calma. Se o modelo mental ficar sólido aqui, o código que vem depois vai fazer sentido imediato. Se ficar vago, o código vai parecer mágica.

### Os três papéis do estado reativo

Em um sistema reativo bem modelado, você tenta separar três papéis. Nem todo código real começa assim, mas código bom caminha nessa direção:

```
┌──────────────────┐
│   ESTADO FONTE   │  ← O dado original. Alguém ou algo externo o define.
│   signal()       │     Exemplo: o valor que o usuário digitou.
└────────┬─────────┘
         │ leitura automática
         ▼
┌──────────────────┐
│  VALOR DERIVADO  │  ← Calculado a partir do estado fonte. Nunca definido diretamente.
│   computed()     │     Exemplo: o resultado da conversão.
└────────┬─────────┘
         │ leitura automática
         ▼
┌──────────────────┐
│ EFEITO COLATERAL │  ← Ponte para o mundo externo. Não produz valor para o Angular.
│   effect()       │     Exemplo: salvar no localStorage, logar analytics.
└──────────────────┘
```

Essa separação é a versão Angular de uma ideia clássica de design: reduzir ambiguidades sobre onde a verdade vive. David Parnas defendia esconder decisões de projeto para reduzir acoplamento; Martin Fowler costuma insistir que nomes e estruturas devem revelar intenção. Aqui, a intenção é simples: se algo é fonte, chame de `signal`; se é consequência, chame de `computed`; se é ação externa, chame de `effect`.

**Checkpoint de previsão:** antes de seguir, responda sem olhar o código: no UnitFlip, o resultado da conversão deve ser salvo em um `signal` ou calculado por um `computed`? Se sua resposta foi "computed", você já entendeu metade da fase.

### Estado fonte: `signal()`

Um signal é uma **fonte de estado mutável e observável**. Ele guarda um valor, permite atualizar esse valor e notifica os contextos reativos que o leram.

```typescript
const temperatura = signal(0);     // cria com valor inicial 0
temperatura.set(100);              // substitui o valor por 100
temperatura.update(v => v + 1);    // incrementa usando o valor anterior
console.log(temperatura());        // lê o valor atual: 101
```

Regras fundamentais:
- Criar um signal exige um valor inicial. Não existe signal vazio.
- Ler um signal exige parênteses: `temperatura()`, não `temperatura`.
- Só signals criados com `signal()` podem ser atualizados (`.set()`, `.update()`). Signals retornados por `computed()` são apenas leitura.

O ponto mais importante: nem todo valor que muda merece ser um signal. Um signal deve representar uma fonte de verdade da aplicação. No UnitFlip, o valor digitado é fonte de verdade porque vem do usuário. O resultado da conversão não é fonte; é consequência.

### Valor derivado: `computed()`

Um computed é uma **fórmula reativa pura**. Você não define o resultado diretamente; você define como ele é calculado a partir de signals. O Angular rastreia as leituras, guarda o resultado em cache e recalcula quando alguma dependência relevante muda.

```typescript
const celsius = signal(0);
const fahrenheit = computed(() => celsius() * 9/5 + 32);

// Se celsius é 0, fahrenheit é 32.
// Se celsius mudar para 100, fahrenheit automaticamente se torna 212.
// Você nunca precisou chamar nada. A fórmula se resolveu sozinha.
```

Duas propriedades essenciais:

1. **Preguiçoso (lazy).** O computed só calcula quando alguém lê o valor. Se ninguém lê, a fórmula não roda. Isso é eficiência — não gaste energia calculando algo que ninguém vai usar.

2. **Memorizado (memoized).** Se as dependências não mudaram, o computed retorna o valor em cache. Não recalcula. Isso importa quando a fórmula é pesada ou quando o template lê o computed várias vezes por ciclo.

3. **Dependências dinâmicas.** O Angular rastreia os signals lidos na execução atual do `computed`. Se uma ramificação condicional não lê certo signal, aquele signal não conta como dependência naquele momento. Para a Fase 01, isso aparece de forma simples: `result` depende do valor, da categoria e das unidades atualmente lidas pela fórmula.

O erro conceitual que `computed()` evita é armazenar manualmente um valor que poderia ser recalculado. Valor derivado armazenado como fonte vira dívida: alguém precisa lembrar de atualizá-lo em todos os caminhos.

### Efeito colateral: `effect()`

Um effect é uma **ponte para o mundo externo**. Ele lê signals, rastreia essas leituras e executa uma ação quando alguma dependência muda. Ele não produz um valor para o Angular usar.

```typescript
effect(() => {
  localStorage.setItem('ultimaCidade', cidadeSelecionada());
});
// Toda vez que cidadeSelecionada() mudar, o localStorage é atualizado.
```

A regra de ouro: **`effect()` é para o mundo fora do Angular**. Se o resultado deve aparecer no template ou alimentar outro signal, use `computed()`. Se o resultado é salvar num storage, logar num analytics, ou atualizar uma lib de terceiros, use `effect()`.

Na documentação oficial, o alerta é claro: não use effects para propagar mudanças de estado. Isso pode gerar ciclos, erros de verificação e atualizações desnecessárias. No UnitFlip, `effect()` é apropriado para `localStorage` porque o storage não é parte do grafo reativo do Angular.

**Nota sobre `onCleanup`:** effects podem registrar uma limpeza com `onCleanup` quando criam recursos duráveis, como `setInterval`, timers, listeners manuais ou subscriptions. O effect desta fase não precisa de cleanup porque `localStorage.setItem` é uma ação síncrona e instantânea: ela acontece e termina.

### Como o template participa

O template Angular é, ele próprio, um contexto reativo. Quando você escreve `{{ fahrenheit() }}` num template, o Angular registra que aquela renderização depende do signal `fahrenheit`. Quando `fahrenheit` muda, o Angular tem informação suficiente para direcionar a atualização aos consumidores relevantes daquele signal.

Isso é a mentalidade compatível com o modelo moderno e zoneless: em vez de depender de uma varredura ampla para descobrir se algo talvez mudou, você declara fontes e leituras reativas. O Angular sabe onde a mudança importa porque o signal foi lido em um contexto rastreável.

### O fluxo completo no UnitFlip

```
Usuário digita "100"
       │
       ▼
valorDigitado.set(100)          ← signal (fonte)
       │
       ▼
resultado = computed(() =>       ← computed (derivação)
  converter(valorDigitado(),
            unidadeOrigem(),
            unidadeDestino()))
       │
       ▼
{{ resultado() }}                ← template (leitura reativa)
       │
       ▼
effect(() =>                     ← effect (ponte para localStorage)
  salvarNoHistorico(...))
```

Cada peça tem um papel. Nenhuma peça faz o trabalho da outra.

Pense nisso como um pequeno **grafo de dependências**:

```
inputValue ─┐
unitFrom   ├──> result ───> template
unitTo     ┘
history ─────> effect ────> localStorage
```

O grafo diz quem depende de quem. `result` depende das entradas. O template depende de `result`. O `localStorage` não depende de nada no sentido Angular; ele apenas recebe uma sincronização feita por `effect`.

---

## 5. Intuição e Analogias

Analogias ajudam a fixar, mas analogias erradas ensinam errado. Estas foram escolhidas por serem tecnicamente fiéis ao comportamento real.

### Signal — a célula de uma planilha

Imagine uma célula `A1` numa planilha. Você digita `100` nela. Essa célula é um signal: tem um valor, e quem depende dela sabe que ela pode mudar.

- `signal(100)` = digitar 100 na célula A1.
- `.set(200)` = apagar e digitar 200.
- `.update(v => v + 1)` = editar a célula para ser "valor anterior + 1".

### Computed — a fórmula de uma planilha

Agora imagine a célula `B1` com a fórmula `=A1 * 9/5 + 32`. Você não digita um número em `B1`. Ela calcula sozinha. Se `A1` muda, `B1` recalcula automaticamente. Se `A1` não mudou, `B1` mostra o valor anterior sem recalcular.

- `computed(() => celsius() * 9/5 + 32)` = a fórmula da célula B1.
- Nunca se faz `.set()` num computed. Assim como nunca se digita manualmente numa célula com fórmula.

### Effect — a impressora automática

Agora imagine que você configurou a planilha para **imprimir automaticamente** toda vez que `B1` mudar. A impressora não é parte da planilha. Ela é o mundo externo. Você não quer que a impressora calcule o resultado, nem que edite a célula `A1`. Você quer apenas que ela execute uma ação quando a planilha já tem um valor pronto.

- `effect(() => localStorage.setItem(...))` = a impressora que reage a mudanças.
- O effect não produz valor. Ele produz ação no mundo externo.
- Se a impressora começa a editar células, ela deixa de ser saída e vira parte confusa da fórmula. É assim que bugs circulares nascem.

### A fronteira que não deve ser cruzada

Se a impressora (effect) começasse a alterar o valor da célula A1, você teria um loop infinito: A1 muda → B1 recalcula → impressora dispara → impressora muda A1 → B1 recalcula → impressora dispara...

No Angular, a regra prática é: **não use `.set()` ou `.update()` dentro de um `effect()` para derivar estado**. Isso pode causar `ExpressionChangedAfterItHasBeenChecked`, ciclos circulares ou atualizações difíceis de rastrear. Se um valor depende de outro, use `computed()`. Se o estado precisa ser derivado e também ajustável pelo usuário, isso vira assunto de `linkedSignal` em uma fase posterior.

---

## 6. Mapa da Construção

Antes de escrever código, entenda a jornada. Cada etapa introduz um conceito e constrói sobre o anterior.

| Etapa | O que faz | Conceito central | Habilidade desenvolvida |
|---|---|---|---|
| 1 | Criar o projeto e o componente base | Setup mínimo | Confirmar ambiente funcionando |
| 2 | Adicionar signal para o valor digitado | `signal()` como estado fonte | Criar e ler um signal no template |
| 3 | Adicionar unidades de origem e destino | `signal()` para seleção | Múltiplos signals independentes |
| 4 | Calcular conversão com computed | `computed()` como derivação | Derivar valor de múltiplos signals |
| 5 | Expandir para múltiplas categorias | `signal()` para categoria ativa | Reatividade com mais fontes |
| 6 | Adicionar histórico de conversões | `signal()` para lista, `.update()` | Signals com arrays |
| 7 | Persistir histórico com effect | `effect()` como ponte para localStorage | Side effect controlado |
| 8 | Carregar histórico ao iniciar | `signal()` com valor inicial do storage | Inicialização a partir de dados externos |

### Por que esta ordem

A progressão segue o princípio de carga cognitiva mínima:

- **Etapas 1–2:** Só `signal`. Nenhuma derivação, nenhum efeito. Você precisa se sentir confortável criando e lendo signals antes de adicionar qualquer complexidade.
- **Etapa 3:** Mais signals, mas ainda sem derivação. Aumenta a familiaridade com o primitivo antes de combinar.
- **Etapa 4:** Primeiro `computed`. É aqui que o modelo mental de derivação se forma. O momento mais importante da fase.
- **Etapa 5:** Expansão natural. Mais dados, mesmos conceitos. Repetição variada que fixa.
- **Etapa 6:** Signal com array. Mudar um array dentro de um signal tem nuances que precisam de atenção.
- **Etapa 7:** Primeiro `effect`. Introduzido só depois que `signal` e `computed` estão confortáveis. A fronteira entre derivação e efeito fica mais clara quando os dois já são familiares.
- **Etapa 8:** Refinamento. Fechar o ciclo: o effect salva, a inicialização carrega.

---

## 7. Construção Progressiva do Projeto

### Acordo de baixa carga cognitiva

Esta seção tem um compromisso: cada passo deve ensinar **uma coisa principal por vez**. Quando aparecer código que existe só para conversar com o navegador, validar entrada ou deixar a tela mais confortável, ele será tratado como apoio, não como o centro da aula.

Use esta regra enquanto codifica:

1. Primeiro entenda qual signal, computed ou effect acabou de entrar.
2. Depois entenda o código utilitário ao redor.
3. Se o CSS aparecer, copie como **andaime visual**. Ele existe para deixar a tela alinhada e tranquila, não para virar assunto da fase.

O objetivo é que você não precise gastar energia com uma tela torta, um ternário denso ou uma conversão de tipo misteriosa enquanto ainda está formando o modelo mental de reatividade.

### Etapa 1 — Criar o projeto e o componente base

**Objetivo:** Ter um projeto Angular 21 limpo rodando, sem ruído.

**Raciocínio:** Antes de pensar em signals, confirme que o ambiente funciona. Problemas de setup não devem se misturar com aprendizado de reatividade.

No terminal:

```bash
ng new unitflip --style=css --ssr=false --skip-tests
cd unitflip
ng serve
```

> A flag `--ssr=false` simplifica o setup. SSR é tema da Fase 11. A flag `--skip-tests` evita gerar arquivos `.spec.ts` por enquanto — testes são tema da Fase 13.

Abra `http://localhost:4200` e confirme que a página padrão do Angular aparece.

Antes de limpar o componente, ajuste o CSS global uma única vez:

```css
/* src/styles.css */
html {
  background: #f7f8fb;
}

body {
  min-height: 100vh;
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #f7f8fb;
}
```

**Por que isso entra agora:** o fundo claro pertence à página inteira, não apenas ao componente. O `margin: 0` remove a margem padrão do navegador. O `min-height: 100vh` faz o `body` ocupar pelo menos a altura visível da janela. Juntos, eles evitam tanto a faixa de fundo limitada ao topo quanto a barra de rolagem artificial causada por `100vh` somado à margem padrão do `body`.

Pense assim: `src/styles.css` pinta a folha inteira; `app.component.ts` organiza o cartão onde vamos estudar reatividade.

Agora limpe o `app.component.ts` para começar do zero:

```typescript
// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main class="unitflip">
      <h1>UnitFlip</h1>
      <p class="subtitle">Conversor de unidades — Fase 01</p>
    </main>
  `,
  styles: `
    :host {
      display: block;
      box-sizing: border-box;
      padding: 2rem 1rem;
      color: #172033;
    }

    .unitflip {
      width: min(100%, 480px);
      margin: 0 auto;
      padding: 1.5rem;
      border: 1px solid #d9dee8;
      border-radius: 8px;
      background: #fff;
    }

    h1 {
      margin: 0 0 0.25rem;
      font-size: 2rem;
    }

    .subtitle {
      margin: 0;
      color: #5b6472;
    }
  `
})
export class AppComponent {}
```

**O que esse código ensina:** Nada de signals ainda. Só a estrutura mínima de um standalone component com template inline.

**O que é só andaime visual:** o reset em `src/styles.css`, `.unitflip`, `.subtitle`, `padding`, `border` e `background`. Eles deixam a tela estável desde o começo para você não precisar estudar reatividade em uma interface desalinhada. Repare na separação: o `body` cuida do fundo da página inteira; o componente cuida do conteúdo.

**Checkpoint:** A página exibe "UnitFlip" e "Conversor de unidades — Fase 01" dentro de uma área branca alinhada, com fundo claro ocupando a página inteira e sem barra de rolagem vertical desnecessária? Se não exibe assim, resolva antes de seguir.

**Se apareceu uma barra de rolagem:** confira se `src/styles.css` tem `body { margin: 0; }`. Sem esse reset, a altura de `100vh` pode somar com a margem padrão do navegador.

---

### Etapa 2 — O primeiro signal: valor digitado

**Objetivo:** Criar o primeiro estado reativo e exibi-lo no template.

**Raciocínio:** O valor que o usuário digita é o dado mais fundamental do conversor. Ele é a *fonte de verdade* de toda a aplicação. Sem ele, não há nada para converter.

Nesta etapa, vamos em três micro-passos. A ideia é não misturar `signal`, binding de input e tratamento de evento na mesma mordida.

#### Micro-passo 2.1 — criar e ler o signal

Primeiro, adicione apenas o signal e uma leitura no template:

```typescript
inputValue = signal(0);
```

```html
<p class="result">Valor atual: {{ inputValue() }}</p>
```

Aqui só existem duas ideias:

1. `signal(0)` cria uma fonte de estado com valor inicial `0`.
2. `inputValue()` lê o valor. Os parênteses são a leitura reativa.

**Rode agora:** a tela deve mostrar `Valor atual: 0`. Ainda não existe input. Isso é intencional.

#### Micro-passo 2.2 — mostrar o valor dentro do input

Agora adicione o input lendo o mesmo signal:

```html
<input
  type="number"
  [value]="inputValue()"
/>
```

`[value]="inputValue()"` significa: "o valor visual deste input vem do signal". Neste ponto, se você digitar no campo, o parágrafo ainda não muda. Falta ligar o evento do navegador ao signal.

#### Micro-passo 2.3 — atualizar o signal quando o usuário digita

Agora sim entra o evento `(input)` e o método `onInputChange`.

```typescript
// src/app/app.component.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main class="unitflip">
      <h1>UnitFlip</h1>
      <p class="subtitle">Conversor de unidades — Fase 01</p>

      <div class="form-grid">
        <label>
          Valor
          <input
            type="number"
            [value]="inputValue()"
            (input)="onInputChange($event)"
            placeholder="Digite um número"
          />
        </label>
      </div>

      <p class="result">Valor atual: {{ inputValue() }}</p>
    </main>
  `,
  styles: `
    :host {
      display: block;
      box-sizing: border-box;
      padding: 2rem 1rem;
      color: #172033;
    }

    .unitflip {
      width: min(100%, 480px);
      margin: 0 auto;
      padding: 1.5rem;
      border: 1px solid #d9dee8;
      border-radius: 8px;
      background: #fff;
    }

    h1 {
      margin: 0 0 0.25rem;
      font-size: 2rem;
    }

    .subtitle {
      margin: 0;
      color: #5b6472;
    }

    .form-grid {
      display: grid;
      gap: 1rem;
      margin-top: 1.25rem;
    }

    label {
      display: grid;
      gap: 0.35rem;
      font-weight: 600;
    }

    input {
      width: 100%;
      box-sizing: border-box;
      padding: 0.55rem 0.65rem;
      border: 1px solid #b8c0cc;
      border-radius: 6px;
      font: inherit;
      background: #fff;
    }

    .result {
      margin: 1.25rem 0 0;
      padding: 0.85rem 1rem;
      border-radius: 8px;
      background: #eef3f8;
      font-weight: 700;
    }
  `
})
export class AppComponent {
  inputValue = signal(0);

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.valueAsNumber;
    const safeValue = Number.isNaN(value) ? 0 : value;

    this.inputValue.set(safeValue);
  }
}
```

**Leitura guiada:**

1. `inputValue = signal(0)` — Cria um signal com valor inicial `0`. Este é o **estado fonte**. É mutável: pode ser atualizado com `.set()`.
2. `[value]="inputValue()"` — Property binding. Lê o signal (note os parênteses) e vincula ao atributo `value` do input.
3. `(input)="onInputChange($event)"` — Event binding. Quando o usuário digita, chama o método que atualiza o signal.
4. `event.target as HTMLInputElement` — O DOM entrega um `Event` genérico. Esta linha diz ao TypeScript: "neste caso, o alvo do evento é um input HTML".
5. `input.valueAsNumber` — Lê o valor do campo como número. Se o campo estiver vazio, o navegador pode devolver `NaN`.
6. `Number.isNaN(value) ? 0 : value` — Cria um valor seguro. Se não houver número válido, usamos `0`.
7. `this.inputValue.set(safeValue)` — Atualiza o signal com um valor já limpo.
8. `{{ inputValue() }}` — Interpolação. O template lê o signal e exibe o valor atualizado.

**Por que quebrar em quatro linhas?**

Esta versão:

```typescript
const input = event.target as HTMLInputElement;
const value = input.valueAsNumber;
const safeValue = Number.isNaN(value) ? 0 : value;

this.inputValue.set(safeValue);
```

ensina melhor que esta:

```typescript
this.inputValue.set(isNaN(value) ? 0 : value);
```

A segunda é curta, mas comprime parsing do DOM, tratamento de número inválido e atualização do signal em uma tacada só. Nesta fase, clareza vale mais que concisão.

**O que esse código ensina:**
- Signal é criado com `signal(valorInicial)`.
- Signal é lido com parênteses: `meuSignal()`.
- Signal é atualizado com `.set(novoValor)`.
- `$event` é a ponte entre o evento nativo do navegador e o método do componente.
- O template registra leituras reativas quando chama `inputValue()`.

**Erro comum:** Esquecer os parênteses. Escrever `{{ inputValue }}` em vez de `{{ inputValue() }}`. Sem parênteses, o template exibe a *função signal*, não o *valor*.

**Checkpoint:** Digite `42` no campo. O bloco azul-claro exibe "Valor atual: 42" em tempo real? Se sim, o signal está funcionando.

**Se travar aqui:** leia só o método `onInputChange` e explique em voz alta: "pego o input, leio número, protejo contra `NaN`, atualizo o signal". Se essa frase fizer sentido, siga.

**Mini desafio:** Mude o valor inicial de `0` para `100`. O que muda na tela ao carregar? O input começa preenchido com 100? A interpolação mostra 100? Isso confirma que o valor inicial do signal é refletido imediatamente no template.

---

### Etapa 3 — Unidades de origem e destino

**Objetivo:** Adicionar mais signals para as unidades selecionadas, formando o conjunto completo de entradas do conversor.

**Raciocínio:** O conversor precisa de três informações: o valor, a unidade de origem e a unidade de destino. Cada uma é um estado independente que o usuário controla. Cada uma é um signal.

Antes do código completo, vamos separar as três ideias novas.

#### Ideia 1 — limitar as unidades possíveis

```typescript
type TemperatureUnit = '°C' | '°F' | 'K';

const TEMPERATURE_UNITS: TemperatureUnit[] = ['°C', '°F', 'K'];
```

`TemperatureUnit` é um tipo literal. Ele diz ao TypeScript: "uma unidade de temperatura só pode ser `'°C'`, `'°F'` ou `'K'`". Isso evita que você coloque `'metros'` por acidente em um signal de temperatura.

#### Ideia 2 — cada select controla um signal

```typescript
unitFrom = signal<TemperatureUnit>('°C');
unitTo = signal<TemperatureUnit>('°F');
```

Agora existem três fontes de verdade:

1. `inputValue`: o número digitado.
2. `unitFrom`: a unidade de origem.
3. `unitTo`: a unidade de destino.

#### Ideia 3 — o DOM sempre entrega string

O valor de um `<select>` vem do navegador como texto. Mesmo quando as opções estão tipadas no TypeScript, o DOM não sabe disso. Por isso usamos uma função pequena para fazer a ponte:

```typescript
asTemperatureUnit(event: Event): TemperatureUnit {
  const select = event.target as HTMLSelectElement;
  return select.value as TemperatureUnit;
}
```

Essa função **não converte temperatura**. Ela só interpreta o valor selecionado como uma das unidades permitidas.

Agora veja o código completo da etapa:

```typescript
// src/app/app.component.ts
import { Component, signal } from '@angular/core';

type TemperatureUnit = '°C' | '°F' | 'K';

const TEMPERATURE_UNITS: TemperatureUnit[] = ['°C', '°F', 'K'];

@Component({
  selector: 'app-root',
  template: `
    <main class="unitflip">
      <h1>UnitFlip</h1>
      <p class="subtitle">Conversor de unidades — Fase 01</p>

      <div class="form-grid">
        <label>
          Valor
          <input
            type="number"
            [value]="inputValue()"
            (input)="onInputChange($event)"
          />
        </label>

        <label>
          De
          <select (change)="onUnitFromChange($event)">
            @for (unit of units; track unit) {
              <option [value]="unit" [selected]="unitFrom() === unit">{{ unit }}</option>
            }
          </select>
        </label>

        <label>
          Para
          <select (change)="onUnitToChange($event)">
            @for (unit of units; track unit) {
              <option [value]="unit" [selected]="unitTo() === unit">{{ unit }}</option>
            }
          </select>
        </label>
      </div>

      <p class="result">
        {{ inputValue() }} {{ unitFrom() }} = ??? {{ unitTo() }}
      </p>
    </main>
  `,
  styles: `
    :host {
      display: block;
      box-sizing: border-box;
      padding: 2rem 1rem;
      color: #172033;
    }

    .unitflip {
      width: min(100%, 480px);
      margin: 0 auto;
      padding: 1.5rem;
      border: 1px solid #d9dee8;
      border-radius: 8px;
      background: #fff;
    }

    h1 {
      margin: 0 0 0.25rem;
      font-size: 2rem;
    }

    .subtitle {
      margin: 0;
      color: #5b6472;
    }

    .form-grid {
      display: grid;
      gap: 1rem;
      margin-top: 1.25rem;
    }

    label {
      display: grid;
      gap: 0.35rem;
      font-weight: 600;
    }

    input, select {
      width: 100%;
      box-sizing: border-box;
      padding: 0.55rem 0.65rem;
      border: 1px solid #b8c0cc;
      border-radius: 6px;
      font: inherit;
      background: #fff;
    }

    .result {
      margin: 1.25rem 0 0;
      padding: 0.85rem 1rem;
      border-radius: 8px;
      background: #eef3f8;
      font-weight: 700;
    }
  `
})
export class AppComponent {
  readonly units = TEMPERATURE_UNITS;

  inputValue = signal(0);
  unitFrom = signal<TemperatureUnit>('°C');
  unitTo = signal<TemperatureUnit>('°F');

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.valueAsNumber;
    const safeValue = Number.isNaN(value) ? 0 : value;

    this.inputValue.set(safeValue);
  }

  onUnitFromChange(event: Event) {
    this.unitFrom.set(this.asTemperatureUnit(event));
  }

  onUnitToChange(event: Event) {
    this.unitTo.set(this.asTemperatureUnit(event));
  }

  asTemperatureUnit(event: Event): TemperatureUnit {
    const select = event.target as HTMLSelectElement;
    return select.value as TemperatureUnit;
  }
}
```

**Leitura guiada:**

1. `unitFrom = signal<TemperatureUnit>('°C')` — Um signal tipado. O TypeScript garante que só valores válidos (`'°C'`, `'°F'`, `'K'`) entram.
2. `(change)="onUnitFromChange($event)"` — O template não faz conversão de tipo. Ele só encaminha o evento para um método com nome claro.
3. `onUnitFromChange` e `onUnitToChange` — Atualizam os signals de unidade. Cada handler faz uma coisa pequena.
4. `asTemperatureUnit(event)` — Pega o `<select>` que disparou o evento e lê o valor selecionado. A asserção `as TemperatureUnit` informa ao TypeScript que esse valor vem da lista controlada por `TEMPERATURE_UNITS`.
5. `@for (unit of units; track unit)` — Control flow moderno do Angular. Renderiza as opções do select. `track unit` diz ao Angular como identificar cada item para otimizar re-renderização.
6. `[selected]="unitFrom() === unit"` — Sincroniza a opção visível do select com o valor do signal. Sem `FormsModule`, o atributo `[value]` no `<select>` não garante que o navegador exiba a opção correta na renderização inicial. O `[selected]` em cada `<option>` resolve isso: o Angular avalia a comparação e marca como selecionada a opção cujo valor coincide com o signal.
7. `{{ inputValue() }} {{ unitFrom() }} = ??? {{ unitTo() }}` — Três signals lidos no template. Cada leitura cria uma dependência reativa. Mude a unidade de origem e observe que o Angular sabe quais consumidores daquele signal precisam ser reavaliados.

**O que esse código ensina:**
- Signals podem ser tipados: `signal<Tipo>(valorInicial)`.
- Cada signal é independente. Mudar `unitFrom` não afeta `inputValue` nem `unitTo`.
- Eventos do DOM costumam precisar de uma pequena ponte de tipagem antes de chegar ao signal.
- O template lê múltiplos signals de forma natural. Sem subscribe, sem pipe async, sem ngOnChanges.

**Erro comum:** Usar `.set()` com tipo errado. Se `unitFrom` é `signal<TemperatureUnit>('°C')`, tentar `unitFrom.set('metros')` dá erro de tipo. O TypeScript protege.

**Checkpoint:** Mude a unidade de origem para "°F" e a unidade de destino para "K". O bloco de resultado mostra "0 °F = ??? K"? Se sim, os três signals estão reativos e independentes.

**Se travar aqui:** diga em voz alta: "`asTemperatureUnit` não converte temperatura; ele só transforma um evento de select em uma unidade tipada". Essa distinção evita muita confusão.

**Observe:** Ainda há "???" no resultado. Falta o `computed`. Esse é o próximo passo — e o momento mais importante da fase.

---

### Etapa 4 — O primeiro computed: conversão em tempo real

**Objetivo:** Substituir o "???" por um resultado calculado automaticamente. Esta é a etapa mais importante da fase.

**Raciocínio:** O resultado da conversão não é um dado que alguém digita. Ele é *derivado* de três outros dados: o valor, a unidade de origem e a unidade de destino. Quando qualquer um dos três muda, o resultado precisa mudar junto. Isso é exatamente o que `computed()` faz.

**Previsão antes do código:** se o usuário trocar apenas a unidade de destino, qual parte do modelo deve mudar? O `inputValue` não muda. A fórmula muda de resultado porque `unitTo` é uma dependência. Esse pequeno exercício evita um erro comum: achar que cada evento precisa "mandar recalcular" algo manualmente.

Primeiro, a lógica de conversão. Adicione acima do componente:

```typescript
function convertTemperature(
  value: number,
  from: TemperatureUnit,
  to: TemperatureUnit
): number {
  if (from === to) return value;

  // Converte para Celsius como base intermediária
  let celsius: number;
  switch (from) {
    case '°C': celsius = value; break;
    case '°F': celsius = (value - 32) * 5 / 9; break;
    case 'K':  celsius = value - 273.15; break;
  }

  // Converte de Celsius para a unidade de destino
  switch (to) {
    case '°C': return celsius;
    case '°F': return celsius * 9 / 5 + 32;
    case 'K':  return celsius + 273.15;
  }
}
```

Agora, adicione o `computed` no componente:

```typescript
import { Component, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';

// ... (type e TEMPERATURE_UNITS ficam como antes)

@Component({
  selector: 'app-root',
  imports: [DecimalPipe],
  template: `
    <main class="unitflip">
      <h1>UnitFlip</h1>
      <p class="subtitle">Conversor de unidades — Fase 01</p>

      <div class="form-grid">
        <label>
          Valor
          <input
            type="number"
            [value]="inputValue()"
            (input)="onInputChange($event)"
          />
        </label>

        <label>
          De
          <select (change)="onUnitFromChange($event)">
            @for (unit of units; track unit) {
              <option [value]="unit" [selected]="unitFrom() === unit">{{ unit }}</option>
            }
          </select>
        </label>

        <label>
          Para
          <select (change)="onUnitToChange($event)">
            @for (unit of units; track unit) {
              <option [value]="unit" [selected]="unitTo() === unit">{{ unit }}</option>
            }
          </select>
        </label>
      </div>

      <div class="result">
        {{ inputValue() }} {{ unitFrom() }} =
        {{ result() | number:'1.2-2' }} {{ unitTo() }}
      </div>
    </main>
  `,
  styles: `
    :host {
      display: block;
      box-sizing: border-box;
      padding: 2rem 1rem;
      color: #172033;
    }

    .unitflip {
      width: min(100%, 480px);
      margin: 0 auto;
      padding: 1.5rem;
      border: 1px solid #d9dee8;
      border-radius: 8px;
      background: #fff;
    }

    h1 {
      margin: 0 0 0.25rem;
      font-size: 2rem;
    }

    .subtitle {
      margin: 0;
      color: #5b6472;
    }

    .form-grid {
      display: grid;
      gap: 1rem;
      margin-top: 1.25rem;
    }

    label {
      display: grid;
      gap: 0.35rem;
      font-weight: 600;
    }

    input, select {
      width: 100%;
      box-sizing: border-box;
      padding: 0.55rem 0.65rem;
      border: 1px solid #b8c0cc;
      border-radius: 6px;
      font: inherit;
      background: #fff;
    }

    .result {
      margin-top: 1.25rem;
      padding: 0.85rem 1rem;
      border-radius: 8px;
      background: #eef3f8;
      font-weight: 700;
    }
  `
})
export class AppComponent {
  readonly units = TEMPERATURE_UNITS;

  inputValue = signal(0);
  unitFrom = signal<TemperatureUnit>('°C');
  unitTo = signal<TemperatureUnit>('°F');

  result = computed(() =>
    convertTemperature(
      this.inputValue(),
      this.unitFrom(),
      this.unitTo()
    )
  );

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.valueAsNumber;
    const safeValue = Number.isNaN(value) ? 0 : value;

    this.inputValue.set(safeValue);
  }

  onUnitFromChange(event: Event) {
    this.unitFrom.set(this.asTemperatureUnit(event));
  }

  onUnitToChange(event: Event) {
    this.unitTo.set(this.asTemperatureUnit(event));
  }

  asTemperatureUnit(event: Event): TemperatureUnit {
    const select = event.target as HTMLSelectElement;
    return select.value as TemperatureUnit;
  }
}
```

**O que acabou de entrar de novo?**

Duas coisas:

1. `result = computed(...)` — a fórmula reativa que calcula o resultado.
2. `DecimalPipe` — importado de `@angular/common` para que o pipe `| number` funcione no template.

**Sobre o `DecimalPipe`:** em componentes standalone, pipes não vêm "de graça". Cada pipe usado no template precisa ser importado explicitamente no array `imports` do `@Component`. O `| number:'1.2-2'` usa `DecimalPipe` por baixo. Sem esse import, o Angular emite um erro: `The pipe 'number' could not be found`. Você poderia importar `CommonModule` inteiro, mas importar só `DecimalPipe` é mais preciso — traz apenas o que o template usa.

O resto é continuidade:

- O input continua atualizando `inputValue`.
- Os selects continuam atualizando `unitFrom` e `unitTo`.
- `convertTemperature` é matemática pura: recebe valores comuns e devolve um número.
- O CSS continua sendo andaime visual.
- A novidade é que o resultado deixou de ser `???` e passou a ser uma fórmula reativa.

**Leitura guiada — esta merece atenção extra:**

```typescript
result = computed(() =>
  convertTemperature(
    this.inputValue(),    // lê signal 1
    this.unitFrom(),      // lê signal 2
    this.unitTo()         // lê signal 3
  )
);
```

O que acontece aqui:

1. `computed()` recebe uma função. Dentro dela, três signals são lidos.
2. O Angular rastreia automaticamente essas três leituras. Não é mágica — ele sabe que `computed` depende de `inputValue`, `unitFrom` e `unitTo` porque eles foram chamados dentro da função.
3. Quando qualquer um dos três muda, o `computed` se marca como "desatualizado".
4. Na próxima vez que alguém ler `result()` — por exemplo, o template — a função roda de novo e retorna o novo valor.
5. Se ninguém ler `result()`, a função **não roda**. Isso é a preguiça (lazy evaluation).
6. Se os três signals não mudaram desde a última vez, `result()` retorna o valor em cache **sem recalcular**. Isso é a memorização.

**O que esse código ensina:**
- `computed()` é uma fórmula, não um valor. Você define *como* calcular, não *o que* é o resultado.
- `computed()` é readonly. Não existe `result.set(...)`. Isso faz sentido: você não digita manualmente numa célula que tem fórmula.
- As dependências são detectadas automaticamente. Você não declara "este computed depende daquele signal". O Angular descobre sozinho ao executar a função.

**Por que NÃO usar um método no template?**

Você poderia escrever:

```html
<!-- ⚠️ Funciona, mas perde as vantagens do computed -->
{{ convertTemperature(inputValue(), unitFrom(), unitTo()) }}
```

Isso pode funcionar para uma fórmula pequena, mas não declara uma unidade de derivação reutilizável. O método é chamado quando o template é verificado; ele não oferece, por si só, a mesma memoização nem a mesma fronteira conceitual de um `computed`.

O `computed` torna a intenção explícita: "este valor é consequência destes signals". Essa explicitude é tão importante quanto a performance. Donald Knuth lembrava que programas são escritos para pessoas lerem e só depois para máquinas executarem; aqui, `computed` deixa o raciocínio legível para quem mantiver o código.

**Erro comum:** Tentar `.set()` num computed.

```typescript
// ❌ ERRO — computed é readonly
this.result.set(42);
// TypeScript impede: Property 'set' does not exist on type 'Signal<number>'
```

Se você precisa de um valor que é derivado E que pode ser manualmente sobrescrito, o Angular tem `linkedSignal()` para isso. Mas aqui, o resultado é derivação pura — `computed` é a escolha certa.

**Checkpoint:** Digite `100` no campo, com "°C → °F". O resultado mostra "212.00"? Mude para "°C → K". Mostra "373.15"? Mude o valor para `0` e volte para "°C → °F". Mostra "32.00"?

Se sim, o `computed` está derivando corretamente a partir de três signals.

**Explique para um colega:** em voz alta, complete a frase: "`result` não é um `signal` porque...". Se a resposta mencionar "não é fonte de verdade" e "depende de outros valores", o conceito está no lugar certo.

**Pare e reflita:** Você não chamou nenhuma função de atualização para o resultado. Não existe `recalcular()`. Não existe `onChange`. O resultado simplesmente... se atualizou. Esse é o modelo mental que precisa ficar gravado: **defina a fórmula uma vez; o Angular cuida do resto.**

---

### Etapa 5 — Expandir para múltiplas categorias

**Objetivo:** Adicionar distância e peso além de temperatura, com um seletor de categoria.

**Raciocínio:** Repetir o pattern `signal + computed` em mais contextos consolida o aprendizado. A variação mostra que o modelo é o mesmo — muda o domínio, a reatividade funciona igual.

Você verá uma função chamada `asUnit`. Ela é a versão genérica de `asTemperatureUnit`: pega o valor textual de um `<select>` e devolve uma unidade. Não é uma função de conversão matemática.

```typescript
// src/app/app.component.ts
import { Component, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';

// --- Tipos ---
type Category = 'temperatura' | 'distância' | 'peso';
type Unit = string;

interface CategoryConfig {
  label: string;
  units: Unit[];
  convert: (value: number, from: Unit, to: Unit) => number;
}

// --- Funções de conversão ---
function convertViaBase(
  value: number,
  from: Unit,
  to: Unit,
  toBase: Record<string, number>
): number {
  if (from === to) return value;
  const base = value * toBase[from];
  return base / toBase[to];
}

function convertTemperature(value: number, from: Unit, to: Unit): number {
  if (from === to) return value;
  let celsius: number;
  switch (from) {
    case '°C': celsius = value; break;
    case '°F': celsius = (value - 32) * 5 / 9; break;
    case 'K':  celsius = value - 273.15; break;
    default:   celsius = value;
  }
  switch (to) {
    case '°C': return celsius;
    case '°F': return celsius * 9 / 5 + 32;
    case 'K':  return celsius + 273.15;
    default:   return celsius;
  }
}

// --- Configuração das categorias ---
const CATEGORIES: Record<Category, CategoryConfig> = {
  temperatura: {
    label: 'Temperatura',
    units: ['°C', '°F', 'K'],
    convert: convertTemperature,
  },
  distância: {
    label: 'Distância',
    units: ['m', 'km', 'mi'],
    convert: (v, from, to) =>
      convertViaBase(v, from, to, { m: 1, km: 1000, mi: 1609.344 }),
  },
  peso: {
    label: 'Peso',
    units: ['kg', 'g', 'lb'],
    convert: (v, from, to) =>
      convertViaBase(v, from, to, { kg: 1, g: 0.001, lb: 0.453592 }),
  },
};

const CATEGORY_KEYS: Category[] = ['temperatura', 'distância', 'peso'];

@Component({
  selector: 'app-root',
  imports: [DecimalPipe],
  template: `
    <main class="unitflip">
      <h1>UnitFlip</h1>
      <p class="subtitle">Conversor de unidades — Fase 01</p>

      <nav class="category-tabs">
        @for (cat of categoryKeys; track cat) {
          <button
            [class.active]="category() === cat"
            (click)="onCategoryChange(cat)"
          >
            {{ categories[cat].label }}
          </button>
        }
      </nav>

      <div class="form-grid">
        <label>
          Valor
          <input
            type="number"
            [value]="inputValue()"
            (input)="onInputChange($event)"
          />
        </label>

        <label>
          De
          <select (change)="onUnitFromChange($event)">
            @for (unit of currentUnits(); track unit) {
              <option [value]="unit" [selected]="unitFrom() === unit">{{ unit }}</option>
            }
          </select>
        </label>

        <label>
          Para
          <select (change)="onUnitToChange($event)">
            @for (unit of currentUnits(); track unit) {
              <option [value]="unit" [selected]="unitTo() === unit">{{ unit }}</option>
            }
          </select>
        </label>
      </div>

      <div class="result">
        {{ inputValue() }} {{ unitFrom() }} =
        {{ result() | number:'1.2-4' }} {{ unitTo() }}
      </div>
    </main>
  `,
  styles: `
    :host {
      display: block;
      box-sizing: border-box;
      padding: 2rem 1rem;
      color: #172033;
    }

    .unitflip {
      width: min(100%, 480px);
      margin: 0 auto;
      padding: 1.5rem;
      border: 1px solid #d9dee8;
      border-radius: 8px;
      background: #fff;
    }

    h1 {
      margin: 0 0 0.25rem;
      font-size: 2rem;
    }

    .subtitle {
      margin: 0;
      color: #5b6472;
    }

    .category-tabs {
      display: flex;
      gap: 0.5rem;
      margin-top: 1.25rem;
      flex-wrap: wrap;
    }

    .category-tabs button {
      padding: 0.5rem 1rem;
      border: 1px solid #b8c0cc;
      border-radius: 6px;
      background: #fff;
      font: inherit;
    }

    .category-tabs button.active {
      background: #1a73e8;
      color: #fff;
      border-color: #1a73e8;
    }

    .form-grid {
      display: grid;
      gap: 1rem;
      margin-top: 1.25rem;
    }

    label {
      display: grid;
      gap: 0.35rem;
      font-weight: 600;
    }

    input, select {
      width: 100%;
      box-sizing: border-box;
      padding: 0.55rem 0.65rem;
      border: 1px solid #b8c0cc;
      border-radius: 6px;
      font: inherit;
      background: #fff;
    }

    .result {
      margin-top: 1.25rem;
      padding: 0.85rem 1rem;
      border-radius: 8px;
      background: #eef3f8;
      font-weight: 700;
    }
  `
})
export class AppComponent {
  readonly categories = CATEGORIES;
  readonly categoryKeys = CATEGORY_KEYS;

  category = signal<Category>('temperatura');
  inputValue = signal(0);
  unitFrom = signal<Unit>('°C');
  unitTo = signal<Unit>('°F');

  currentUnits = computed(() => CATEGORIES[this.category()].units);

  result = computed(() => {
    const config = CATEGORIES[this.category()];
    return config.convert(
      this.inputValue(),
      this.unitFrom(),
      this.unitTo()
    );
  });

  onCategoryChange(cat: Category) {
    this.category.set(cat);
    const units = CATEGORIES[cat].units;
    this.unitFrom.set(units[0]);
    this.unitTo.set(units[1]);
    this.inputValue.set(0);
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.valueAsNumber;
    const safeValue = Number.isNaN(value) ? 0 : value;

    this.inputValue.set(safeValue);
  }

  onUnitFromChange(event: Event) {
    this.unitFrom.set(this.asUnit(event));
  }

  onUnitToChange(event: Event) {
    this.unitTo.set(this.asUnit(event));
  }

  asUnit(event: Event): Unit {
    const select = event.target as HTMLSelectElement;
    return select.value;
  }
}
```

**O que acabou de entrar de novo?**

Nesta etapa entram três ideias, mas elas têm papéis separados:

1. `category` é uma nova fonte de verdade: qual categoria está ativa.
2. `currentUnits` é uma derivação: quais unidades pertencem à categoria atual.
3. `result` passa a usar a configuração da categoria atual.

A matemática de `convertViaBase` e `convertTemperature` cresceu, mas ela continua fora do núcleo reativo. Pense nela como uma calculadora comum que o `computed` chama.

O método `asUnit` tem o mesmo papel que `asTemperatureUnit` na Etapa 3. A diferença é que agora as unidades podem ser temperatura, distância ou peso, então o tipo genérico `Unit = string` basta para esta fase.

**Leitura guiada:**

1. **`currentUnits = computed(() => CATEGORIES[this.category()].units)`** — Um segundo computed. Este deriva a lista de unidades disponíveis a partir da categoria selecionada. Quando `category` muda, `currentUnits` atualiza automaticamente, e os selects re-renderizam com as novas opções.

2. **`result` lê `category()` indiretamente** — `CATEGORIES[this.category()]` dentro do computed faz com que `result` dependa de `category`, `inputValue`, `unitFrom` e `unitTo`. Quatro signals, uma fórmula.

3. **`onCategoryChange` faz múltiplos `.set()`** — Quando o usuário troca de categoria, o valor, a unidade de origem e a unidade de destino precisam resetar. Três `.set()` em sequência não significam que você precisa chamar três recálculos manuais. O grafo reativo fica inválido onde precisa ficar, e o template volta a ler os valores consistentes.

**O que esse código ensina:**
- Computeds podem depender de outros computeds. `currentUnits` depende de `category`. O template depende de `currentUnits`. A cadeia reativa se estende naturalmente.
- Múltiplos `.set()` em sequência não exigem múltiplas chamadas suas de atualização. Você altera as fontes; os computeds e o template seguem as dependências.
- O pattern é sempre o mesmo: signal para fonte, computed para derivação. Muda o domínio, o modelo reativo é idêntico.

**Checkpoint:** Clique em "Distância". Os selects mudam para "m", "km", "mi"? Digite `1` com "km → mi". O resultado fica perto de `0.6214`? Clique em "Peso". Os selects mudam para "kg", "g", "lb"?

---

### Etapa 6 — Histórico de conversões

**Objetivo:** Adicionar um signal que armazena uma lista de conversões recentes.

**Raciocínio:** Até agora, os signals guardam valores primitivos (number, string). Agora vamos usar um signal com array. Isso introduz uma nuance: para comunicar uma nova versão do estado, o array precisa ser *substituído* (imutável), não *modificado por dentro* (push). A referência é parte da mensagem.

Adicione ao componente:

```typescript
interface ConversionEntry {
  value: number;
  from: Unit;
  to: Unit;
  result: number;
  category: string;
  timestamp: number;
}
```

No componente, adicione:

```typescript
export class AppComponent {
  // ... signals existentes ...

  history = signal<ConversionEntry[]>([]);

  addToHistory() {
    const entry: ConversionEntry = {
      value: this.inputValue(),
      from: this.unitFrom(),
      to: this.unitTo(),
      result: this.result(),
      category: CATEGORIES[this.category()].label,
      timestamp: Date.now(),
    };

    this.history.update(previousEntries => {
      const nextEntries = [entry, ...previousEntries];
      return nextEntries.slice(0, 10);
    });
  }

  clearHistory() {
    this.history.set([]);
  }
}
```

**O que acabou de entrar de novo?**

Só um novo signal fonte: `history`.

O restante é código de lista:

- `entry` monta uma conversão salva.
- `previousEntries` é o histórico antigo.
- `nextEntries` é o novo histórico, com a entrada recente no topo.
- `.slice(0, 10)` mantém só as 10 últimas.

No template, adicione um botão de salvar e a lista de histórico (lembre que `DecimalPipe` já está importado desde a Etapa 4):

```html
    <button (click)="addToHistory()" class="save-btn">
      Salvar conversão
    </button>

    @if (history().length > 0) {
      <h2>Histórico</h2>
      <button (click)="clearHistory()" class="clear-btn">Limpar</button>
      <ul>
        @for (entry of history(); track entry.timestamp) {
          <li>
            {{ entry.value }} {{ entry.from }} =
            {{ entry.result | number:'1.2-4' }} {{ entry.to }}
            <small>({{ entry.category }})</small>
          </li>
        }
      </ul>
    }
```

**Leitura guiada:**

```typescript
this.history.update(previousEntries => {
  const nextEntries = [entry, ...previousEntries];
  return nextEntries.slice(0, 10);
});
```

Este trecho merece atenção especial:

1. `.update()` recebe uma função que recebe o valor anterior e retorna o novo valor. É diferente de `.set()`, que simplesmente substitui.
2. `previousEntries` nomeia o histórico anterior. O nome longo é proposital: reduz adivinhação.
3. `[entry, ...previousEntries]` cria um **novo array** com a nova entrada no início, seguida das anteriores. Não modifica o array existente.
4. `.slice(0, 10)` limita a 10 entradas. Sem isso, o histórico cresceria indefinidamente.
5. O signal detecta a mudança porque recebeu uma **nova referência** de array. Se usássemos `prev.push(entry); return prev;`, o valor retornado teria a mesma referência. Pela igualdade padrão, isso parece "o mesmo array" para o signal, mesmo que o conteúdo interno tenha sido mutado.

**O que esse código ensina:**
- Signals com arrays pedem atualizações imutáveis: crie um novo array em vez de modificar o existente.
- `.update()` é preferível a `.set()` quando o novo valor depende do anterior.
- `@if` e `@for` no template reagem naturalmente a signals que contêm arrays.
- `track entry.timestamp` diz ao Angular como identificar cada item da lista para otimizar inserções e remoções.

**Erro comum:** Mutar o array:

```typescript
// ❌ Retorna a mesma referência
this.history.update(prev => {
  prev.push(entry);  // modifica o array existente
  return prev;        // retorna a mesma referência
});

// ✅ Correto — retorna novo array
this.history.update(prev => [entry, ...prev]);
```

**Checkpoint:** Faça uma conversão e clique em "Salvar conversão". A entrada aparece no histórico? Faça outra. Aparecem duas, com a mais recente em cima? Limpe o histórico. A lista some? O `@if` esconde a seção quando o array está vazio?

---

### Etapa 7 — Persistir histórico com effect

**Objetivo:** Usar `effect()` para salvar o histórico no `localStorage` automaticamente. Este é o primeiro efeito colateral da fase.

**Raciocínio:** Até agora, se você recarregar a página, o histórico desaparece. Queremos que ele persista. Salvar no `localStorage` é uma operação que não produz valor para o Angular — é um efeito colateral. Não é derivação (computed). É ação no mundo externo (effect).

Adicione no construtor do componente:

```typescript
import { Component, signal, computed, effect } from '@angular/core';

// ...

export class AppComponent {
  // ... signals e computeds existentes ...

  constructor() {
    effect(() => {
      const entries = this.history();
      localStorage.setItem('unitflip-history', JSON.stringify(entries));
    });
  }

  // ... métodos existentes ...
}
```

**O que acabou de entrar de novo?**

Só o primeiro `effect`.

Ele lê `history()` e escreve no `localStorage`. Essa é a fronteira importante: `history` pertence ao Angular; `localStorage` pertence ao navegador. O effect é a ponte.

**Leitura guiada:**

```typescript
effect(() => {
  const entries = this.history();
  localStorage.setItem('unitflip-history', JSON.stringify(entries));
});
```

1. `effect()` é chamado no construtor. Efeitos precisam ser criados num **contexto de injeção** — o construtor é o lugar mais natural nesta fase. Fora desse contexto, você precisaria fornecer um `Injector` explicitamente.
2. Dentro do callback, `this.history()` é lido. O Angular rastreia essa leitura: agora o efeito **depende** de `history`. Se você lesse outros signals dentro do callback, eles também virariam dependências.
3. Toda vez que `history` muda, o efeito roda de novo e salva no `localStorage`.
4. O efeito roda **pelo menos uma vez** ao ser criado. Nesta etapa, antes do carregamento inicial da Etapa 8, isso significa salvar o array inicial no storage.
5. `localStorage.setItem(...)` não entra no grafo reativo do Angular. É só uma escrita externa. Por isso este é um bom uso de `effect`.

**O que esse código ensina:**
- `effect()` é criado no construtor (contexto de injeção).
- O efeito detecta dependências automaticamente — assim como `computed`, mas com propósito diferente.
- O efeito é para ações externas: localStorage, logging, analytics. Não para derivar valores.
- O efeito roda automaticamente quando as dependências mudam. Você não precisa chamar nada.
- `onCleanup` não é necessário aqui: não há timer, subscription ou listener para desmontar. A escrita no `localStorage` começa e termina na mesma linha.

**Checkpoint:** Adicione duas conversões ao histórico. Abra o DevTools → Application → Local Storage. Existe uma chave `unitflip-history` com um array JSON? Sim? O efeito está funcionando.

**Pare e compare:** Na Etapa 4, você criou um `computed` que calcula o resultado. Aqui, você criou um `effect` que salva no storage. A diferença:

| | `computed` (Etapa 4) | `effect` (Etapa 7) |
|---|---|---|
| **Produz valor para o Angular?** | Sim — o template lê `result()` | Não — o localStorage é externo ao Angular |
| **É readonly?** | Sim | Não se aplica — não é um signal |
| **Quando roda?** | Quando lido e dependências mudaram | Quando dependências mudaram (automaticamente) |
| **Propósito** | Derivar estado | Sincronizar com mundo externo |

Se o que você precisa aparece no template: use `computed`.
Se o que você precisa é uma ação fora do Angular: use `effect`.

**Armadilha sutil:** `effect` parece tentador porque "reage a mudanças", então dá vontade de usá-lo para tudo. Kent Beck defende passos pequenos e feedback rápido, mas feedback não é sinônimo de improviso. O passo correto aqui é pequeno e preciso: `computed` para valor, `effect` para fronteira externa.

---

### Etapa 8 — Carregar histórico ao iniciar

**Objetivo:** Fechar o ciclo: o effect salva, e a inicialização carrega.

**Raciocínio:** O signal `history` começa com `[]`, mas o localStorage pode ter dados de uma sessão anterior. Precisamos carregar esses dados ao criar o signal.

Altere a inicialização do signal `history`:

```typescript
history = signal<ConversionEntry[]>(loadHistory());
```

E adicione a função fora do componente:

```typescript
function loadHistory(): ConversionEntry[] {
  try {
    const raw = localStorage.getItem('unitflip-history');
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    const isHistoryArray = Array.isArray(parsed);

    if (!isHistoryArray) return [];
    return parsed;
  } catch {
    return [];
  }
}
```

**O que acabou de entrar de novo?**

Só uma função de inicialização: `loadHistory`.

Ela não é reatividade. Ela roda uma vez para descobrir qual deve ser o valor inicial de `history`. Depois disso, o signal assume.

**Leitura guiada:**

1. `signal<ConversionEntry[]>(loadHistory())` — O valor inicial do signal vem de uma função que lê o localStorage. Isso acontece uma vez, na criação do signal.
2. `try/catch` protege contra JSON inválido. Se alguém editou o localStorage manualmente e corrompeu o JSON, o conversor não quebra — começa com histórico vazio.
3. `Array.isArray(parsed)` é uma segunda camada de proteção: mesmo que o JSON seja válido, verifica se é realmente um array.
4. `return parsed` só acontece depois dessas proteções. Dados externos entram no app com desconfiança.

**O que esse código ensina:**
- O valor inicial de um signal pode vir de qualquer fonte síncrona. Não precisa ser literal.
- Dados externos são não confiáveis. Valide sempre.
- O ciclo está completo: `signal(loadHistory())` carrega → `effect()` salva → próxima sessão carrega de novo.

Depois desta etapa, quando o effect roda pela primeira vez, ele salva o histórico já carregado por `loadHistory()`. Isso evita a interpretação errada de que o effect sempre "apaga" o storage na inicialização. A ordem importa: primeiro o signal nasce com o valor inicial; depois o effect observa esse valor.

**Checkpoint:** Adicione conversões, recarregue a página. O histórico sobrevive? Abra o DevTools, edite o valor no localStorage para `"lixo"`, recarregue. O app começa com histórico vazio sem erro no console? Se sim, a proteção funciona.

**Erro comum neste ponto:** Criar um segundo signal ou variável para "histórico carregado" e tentar sincronizar com o signal principal. Não faça isso. Um signal, um propósito. O valor inicial resolve o carregamento; o effect resolve a persistência.

---

## 8. Explicações Guiadas Pós-Construção

### Por que `convertViaBase` usa fator multiplicador

Para distância e peso, a conversão usa um fator relativo a uma base (metros para distância, quilogramas para peso). Isso simplifica: em vez de escrever funções para cada par possível (m→km, m→mi, km→mi...), converte para a base e depois para o destino. Duas operações para qualquer combinação.

Temperatura é diferente porque a relação não é proporcional (Fahrenheit tem offset), então precisa de fórmula dedicada.

**Trade-off:** A abordagem `convertViaBase` é mais genérica e extensível. Adicionar uma nova unidade de distância (jardas, por exemplo) exige apenas uma linha no objeto de fatores. A abordagem de temperatura é mais legível para quem conhece as fórmulas. Nenhuma é universalmente "melhor" — cada uma é adequada ao seu contexto.

### Por que o histórico é limitado a 10 itens

`.slice(0, 10)` não é arbitrário. Um histórico ilimitado:
- Consome memória crescente no localStorage (limite de ~5MB por origin).
- Torna a lista visual longa demais para ser útil.
- Serializa/deserializa JSON cada vez maior a cada mudança.

10 é um número razoável para um conversor. Em produção, você calibraria com base em uso real.

### Por que o effect salva o array inteiro, não só a última entrada

O effect salva `JSON.stringify(entries)` — o array completo — e não apenas a entrada mais recente. Motivo: o localStorage é key-value. Não tem "append". Se você salvar só a última, perde as anteriores. Salvar tudo é a abordagem mais simples que funciona.

**Trade-off:** Para listas grandes (milhares de itens), salvar tudo a cada mudança seria ineficiente. Nesse caso, usaria-se IndexedDB ou um banco local. Para 10 itens, JSON no localStorage é perfeitamente adequado.

### Por que usar `[value]` + `(input)` manualmente

O input poderia ser resolvido com abstrações de formulário em fases futuras, mas isso esconderia justamente o fluxo que precisamos enxergar agora:

1. `[value]="inputValue()"` mostra a leitura reativa: o template lê o signal.
2. `(input)="onInputChange($event)"` mostra a escrita explícita: o evento do usuário atualiza a fonte de verdade.
3. O `computed` reage a essa fonte sem que o handler mande recalcular o resultado.

Essa escolha é pedagógica. Seymour Papert defendia que bons ambientes de aprendizagem tornam ideias abstratas manipuláveis. Aqui, o fluxo fica visível: leitura no template, escrita no evento, derivação no `computed`. Depois que isso estiver sólido, forms deixam de parecer mágica e passam a ser uma camada de ergonomia.

---

## 9. Comparações Fundamentais

### `signal()` vs variável comum

```typescript
// Variável comum
let temperatura = 0;

// Signal
const temperatura = signal(0);
```

| Aspecto | Variável | Signal |
|---|---|---|
| O template cria dependência reativa explícita? | Não | Sim — a leitura `temperatura()` é rastreada |
| Posso derivar outro valor que atualiza sozinho? | Só manualmente | Sim — com `computed()` |
| Posso reagir a mudanças automaticamente? | Só chamando código manualmente | Sim — com `effect()` |
| Funciona bem no modelo zoneless? | Não como fonte rastreável | Sim — signals notificam consumidores |
| Leitura no código | `temperatura` | `temperatura()` |

**Quando usar variável comum:** Para dados que nunca mudam (constantes), ou dados que não precisam ser refletidos no template (variáveis temporárias dentro de funções).

**Quando usar signal:** Para estado fonte que o template precisa ler ou do qual outros valores dependem.

**Diferença essencial:** uma variável pode mudar, mas não anuncia sua mudança ao grafo reativo. Um signal muda e comunica: "quem me leu pode precisar reavaliar". Essa comunicação é o que torna o Angular moderno previsível.

### `computed()` vs cálculo disperso

```typescript
// ❌ Cálculo disperso: o resultado é calculado no método e salvo num signal
result = signal(0);

onInputChange(event: Event) {
  const value = /* ... */;
  this.inputValue.set(value);
  this.result.set(convertTemperature(value, this.unitFrom(), this.unitTo()));
}

onUnitFromChange(unit: TemperatureUnit) {
  this.unitFrom.set(unit);
  this.result.set(convertTemperature(this.inputValue(), unit, this.unitTo()));
}

onUnitToChange(unit: TemperatureUnit) {
  this.unitTo.set(unit);
  this.result.set(convertTemperature(this.inputValue(), this.unitFrom(), unit));
}

// ✅ Computed: o resultado se calcula sozinho
result = computed(() =>
  convertTemperature(this.inputValue(), this.unitFrom(), this.unitTo())
);
```

**Por que essa abordagem parece razoável no começo:** ela imita um raciocínio imperativo comum: "quando o usuário muda algo, eu recalculo". Para um formulário pequeno, isso parece direto. O problema aparece quando há mais caminhos de mudança.

**O que há de errado com a abordagem dispersa:**
1. **Duplicação.** A mesma fórmula aparece em três lugares. Esqueceu de atualizar um? Bug silencioso.
2. **Fragilidade.** Adicionou um quarto signal que afeta o resultado? Precisa lembrar de adicionar a atualização em todos os handlers.
3. **Estado duplicado.** `result` é um signal que poderia ser um computed. Ter dois signals quando um depende do outro cria risco de dessincronização.
4. **Intenção fraca.** Quem lê o código precisa descobrir, por investigação, que `result` não é fonte de verdade.

**O que o computed resolve:**
1. **Uma fórmula, um lugar.** Qualquer mudança em qualquer dependência recalcula automaticamente.
2. **Impossível dessincronizar.** O computed sempre reflete o estado atual. Não existe "esqueci de atualizar".
3. **Menos código.** Três handlers com cálculo viram zero handlers com cálculo.
4. **Leitura de intenção.** O tipo da API já comunica o papel: isto é derivação.

### `computed()` vs `effect()` para derivação

```typescript
// ❌ Effect usado para derivar valor (ERRADO)
result = signal(0);

constructor() {
  effect(() => {
    this.result.set(
      convertTemperature(this.inputValue(), this.unitFrom(), this.unitTo())
    );
  });
}

// ✅ Computed (CORRETO)
result = computed(() =>
  convertTemperature(this.inputValue(), this.unitFrom(), this.unitTo())
);
```

**Por que o effect parece razoável no começo:** ele "roda quando signals mudam", então parece uma ferramenta genérica de reação. Mas reação não é o mesmo que derivação. Derivação precisa produzir um valor puro e legível pelo Angular; efeito precisa atravessar uma fronteira externa.

**Por que o effect é errado aqui:**
1. `effect()` que chama `.set()` para manter outro signal sincronizado pode causar ciclos, atualizações redundantes e erros como `ExpressionChangedAfterItHasBeenChecked` em modo desenvolvimento.
2. É conceitualmente errado. O resultado da conversão é um valor derivado — depende de outros valores e pode ser recalculado a qualquer momento. Isso é a definição de `computed`.
3. O effect cria um intermediário desnecessário: signal de resultado que é atualizado pelo effect. O computed elimina o intermediário.
4. A dependência fica indireta: em vez de `result` declarar de onde vem, um effect escondido passa a empurrar valor para ele.

**Regra prática:**
- Se o resultado deve aparecer no template ou alimentar outro computed → use `computed`.
- Se o resultado é uma ação no mundo externo (localStorage, log, DOM imperativo) → use `effect`.

### Quando `effect()` é aceitável vs mau uso

| Cenário | Correto? | Por quê |
|---|---|---|
| Salvar no localStorage quando signal muda | ✅ Correto | Ação externa, não derivação |
| Logar analytics quando signal muda | ✅ Correto | Ação externa |
| Atualizar lib de gráfico quando dados mudam | ✅ Correto | DOM imperativo, mundo externo |
| Calcular resultado de conversão | ❌ Mau uso | É derivação — use computed |
| Manter dois signals sincronizados | ❌ Mau uso | Um deveria ser computed do outro |

**Regra de reconhecimento em código real:** se o corpo do `effect` termina com `.set()` em outro signal, pare e pergunte: "isso é uma ação externa ou eu estou simulando um `computed`?". Muitas vezes, a resposta revela o bug antes que ele apareça no navegador.

---

## 10. Laboratório de Erros Comuns

Erros não são obstáculos — são dados. Cada erro nesta seção revela algo sobre como signals funcionam por dentro. Não apenas leia: **provoque cada erro** no seu projeto e observe o comportamento.

### Erro 1 — Usar `effect()` para derivar valor

```typescript
// ❌ 
displayResult = signal('');

constructor() {
  effect(() => {
    this.displayResult.set(
      `${this.inputValue()} ${this.unitFrom()} = ${this.result()} ${this.unitTo()}`
    );
  });
}
```

**Por que parece fazer sentido:** o texto exibido muda quando os dados mudam, então parece natural "escutar" as mudanças e gravar o texto pronto.

**O que acontece:** Pode funcionar superficialmente, mas pode causar `ExpressionChangedAfterItHasBeenChecked` em modo desenvolvimento ou criar cadeias de atualização difíceis de rastrear. O Angular percebe que um signal foi alterado enquanto outro processo de verificação estava em andamento.

**Correção:** Use `computed`:

```typescript
// ✅
displayResult = computed(() =>
  `${this.inputValue()} ${this.unitFrom()} = ${this.result()} ${this.unitTo()}`
);
```

**Como reconhecer no código real:** se o effect monta uma string, calcula um número, filtra uma lista ou transforma dados para a tela, ele provavelmente está fazendo trabalho de `computed`.

**Lição:** Se o valor é usado no template e depende de outros signals, é derivação. Derivação = `computed`.

### Erro 2 — Duplicar estado desnecessariamente

```typescript
// ❌ Dois signals para a mesma informação
inputValue = signal(0);
inputValueFormatted = signal('0');

onInputChange(event: Event) {
  const v = /* ... */;
  this.inputValue.set(v);
  this.inputValueFormatted.set(v.toFixed(2));
}
```

**Por que parece fazer sentido:** guardar o valor "normal" e o valor "formatado" dá a sensação de controle. Em telas pequenas, isso até parece economizar cálculo.

**O que acontece:** Funciona, mas `inputValueFormatted` pode ficar dessincronizado se você atualizar `inputValue` em outro lugar e esquecer de atualizar `inputValueFormatted`. Em produção, esse erro aparece como UI incoerente: uma parte da tela mostra um valor e outra parte mostra outro.

**Correção:** Um signal fonte, um computed derivado:

```typescript
// ✅
inputValue = signal(0);
inputValueFormatted = computed(() => this.inputValue().toFixed(2));
```

**Como reconhecer no código real:** dois signals mudam quase sempre juntos, no mesmo método, e um pode ser calculado a partir do outro. Esse é o cheiro de estado duplicado.

**Lição:** Se um valor é função de outro, ele não precisa ser signal. Precisa ser computed. Quanto menos signals-fonte, menor a superfície de bugs.

### Erro 3 — Criar signal para constante

```typescript
// ❌ Nunca muda — não precisa ser reativo
title = signal('UnitFlip');
maxHistorySize = signal(10);
```

**Correção:**

```typescript
// ✅ Constante. Sem reatividade. Sem overhead.
readonly title = 'UnitFlip';
readonly maxHistorySize = 10;
```

**Por que parece fazer sentido:** depois que você aprende signals, dá vontade de transformar tudo em signal para "padronizar". Essa padronização é falsa: ela torna o código menos claro.

**Lição:** Signal existe para estado que muda. Se nunca muda, é uma constante. Fazer constante reativa é desperdício pequeno de performance, mas desperdício grande de semântica: quem lê o código pensa que aquele valor pode mudar.

### Erro 4 — Lógica excessiva no template

```typescript
// ❌ No template:
// {{ convertTemperature(inputValue(), unitFrom(), unitTo()) | number:'1.2-4' }}
```

**Por que parece fazer sentido:** o template está "perto" da visualização, então parece prático colocar a chamada ali.

**O que acontece:** A função pode rodar sempre que o template for verificado/renderizado, sem a mesma memoização de um `computed`. Para uma fórmula pequena, a diferença é imperceptível. Para uma fórmula pesada ou uma lista grande, vira custo acumulado.

**Correção:** Mova para computed:

```typescript
// ✅
result = computed(() => convertTemperature(this.inputValue(), this.unitFrom(), this.unitTo()));
// No template: {{ result() | number:'1.2-4' }}
```

**Como reconhecer no código real:** templates com chamadas longas, pipes encadeados e funções com muitos argumentos costumam esconder derivação que deveria ter nome.

**Lição:** O template é para *ler* estado preparado, não para concentrar lógica de derivação. Cálculos reativos vão no `computed`.

### Erro 5 — Mutar array dentro de signal

```typescript
// ❌ Push muta o array existente
this.history.update(prev => {
  prev.push(entry);
  return prev; // mesma referência!
});
```

**Por que parece fazer sentido:** `push` é a forma mais conhecida de adicionar item a array em JavaScript. O array realmente muda por dentro, então o erro é sutil.

**O que acontece:** você retorna a mesma referência que já estava no signal. Com a igualdade padrão, o signal pode entender que não recebeu uma nova versão do valor e, portanto, pode não notificar os consumidores.

**Correção:**

```typescript
// ✅ Cria novo array
this.history.update(prev => [entry, ...prev]);
```

**Como reconhecer no código real:** procure `push`, `splice`, `sort`, atribuição direta em propriedades (`obj.x = ...`) ou qualquer mutação antes de `return prev`.

**Lição:** Para arrays e objetos em signals, trate cada atualização como uma nova versão. Novo objeto/array = intenção clara de mudança. Mesmo objeto mutado = intenção ambígua.

### Erro 6 — Esquecer os parênteses no template

```html
<!-- ❌ Exibe "[Signal]" ou "[object Object]" -->
<p>{{ inputValue }}</p>

<!-- ✅ Exibe o valor -->
<p>{{ inputValue() }}</p>
```

**Por que parece fazer sentido:** em Angular clássico, propriedades eram lidas sem parênteses. Signals mudam esse hábito porque a leitura precisa ser rastreável.

**Lição:** Signal é uma função getter. Sem `()`, você passa a referência da função, não o valor. Os parênteses não são detalhe sintático; são a leitura reativa.

---

## 11. Checkpoints Cognitivos

Estas perguntas validam se o modelo mental está formado, não se a sintaxe foi decorada. Responda com suas palavras antes de ler a resposta sugerida.

### Sobre signal

**1. "O que é um signal, em uma frase?"**
> Um signal é uma caixa reativa que guarda um valor e notifica automaticamente qualquer leitor quando esse valor muda.

**2. "Por que `signal` exige parênteses para ler — `count()` e não `count`?"**
> Porque signal é uma função getter. Os parênteses são o mecanismo que permite ao Angular rastrear a leitura: quando você chama `count()` dentro de um computed ou template, o Angular registra que aquele contexto depende de `count`.

**3. "Qual a diferença entre `.set()` e `.update()`?"**
> `.set(novoValor)` substitui o valor independentemente do anterior. `.update(fn)` recebe uma função que transforma o valor anterior no novo valor. Use `.update()` quando o novo valor depende do anterior (ex: incrementar, adicionar item a lista).

### Sobre computed

**4. "O que acontece se nenhum lugar do template ler `result()`?"**
> O computed nunca calcula. Ele é preguiçoso (lazy): só executa a função de derivação quando alguém lê o valor. Se ninguém lê, nenhum ciclo de CPU é gasto.

**5. "Por que `result` é `computed` e não `signal`?"**
> Porque o resultado da conversão nunca é definido diretamente. Ele sempre depende de `inputValue`, `unitFrom` e `unitTo`. Fazer dele um signal criaria a responsabilidade de mantê-lo atualizado manualmente — e o risco de esquecer. O computed atualiza sozinho.

**6. "Se `inputValue()` e `unitFrom()` não mudaram, e eu leio `result()` 10 vezes, quantas vezes a fórmula de conversão roda?"**
> Uma. Na primeira leitura, o computed calcula e cacheia o resultado (memoização). As 9 leituras seguintes retornam o cache.

**7. "Como o Angular sabe de quais signals um computed depende?"**
> Ele rastreia os signals lidos durante a execução da função. A dependência não é declarada numa lista manual; ela nasce da leitura. Se uma leitura só acontece em uma ramificação condicional, ela só participa enquanto aquela ramificação estiver ativa.

### Sobre effect

**8. "Por que o histórico é salvo com `effect()` e não com `computed()`?"**
> Porque salvar no localStorage é uma ação no mundo externo — não produz um valor que o Angular usa. `computed` é para derivar valores; `effect` é para ações externas.

**9. "O que acontece se colocar `.set()` de um signal dentro de um `effect()`?"**
> Depende do caso, mas é um sinal de alerta. Se você está derivando estado, pode criar loops, atualizações redundantes ou erros de verificação. Se o valor depende de outro, use `computed` ou `linkedSignal`.

**10. "O effect roda na inicialização?"**
> Sim. Todo effect roda pelo menos uma vez quando é criado. Depois da Etapa 8, isso significa que o effect salva o histórico já carregado por `loadHistory()`.

**11. "Quando `onCleanup` seria necessário nesta fase?"**
> Não no `localStorage`. Seria necessário se o effect criasse algo que continua existindo depois da execução do callback, como timer, listener manual ou subscription. A limpeza evita que recursos antigos sobrevivam após uma nova execução ou destruição.

### Sobre o modelo completo

**12. "No UnitFlip, qual é a fonte real de verdade?"**
> Os quatro signals: `inputValue`, `unitFrom`, `unitTo`, `category`. Tudo mais (resultado, lista de unidades, persistência) é derivado ou efeito desses quatro.

**13. "Se eu removesse o `computed` de `result` e exibisse `convertTemperature(...)` direto no template, o que mudaria?"**
> Funcionaria, mas a conversão poderia rodar sempre que o template fosse verificado/renderizado, sem a mesma memoização nem a mesma clareza de intenção. Para uma fórmula simples, a diferença é imperceptível. Para uma fórmula pesada, lista grande ou renderização frequente, o custo acumulado aparece.

**Checkpoint de ensino:** explique o UnitFlip para alguém usando apenas quatro palavras-chave: **fonte**, **derivação**, **efeito** e **template**. Se você conseguir montar essa explicação sem citar sintaxe, o modelo mental está mais forte que a memória de curto prazo.

---

## 12. Exercícios de Consolidação

Estes exercícios testam se você internalizou os conceitos. Tente implementar cada um **sem consultar as etapas anteriores**. Se precisar consultar, identifique o que não fixou. Robert Bjork chama esse tipo de esforço de recuperação de "dificuldade desejável": um pouco de esforço agora fortalece a memória que você vai precisar depois.

### Exercício 1 — Nova categoria de conversão

Adicione uma quarta categoria: **velocidade** (km/h, m/s, mph).

Fórmulas:
- km/h → m/s: ÷ 3.6
- km/h → mph: ÷ 1.60934

**O que testa:** Se você entende como adicionar dados à configuração sem modificar a lógica de signals e computeds. Se o computed de `result` continua funcionando sem alteração, você entendeu a separação entre dados e reatividade.

**Critério de sucesso:** você adiciona a categoria mexendo na configuração e no mínimo necessário de tipos; não cria novo `computed` de resultado nem novo handler especial para velocidade.

### Exercício 2 — Impedir histórico duplicado consecutivo

Se o usuário clicar em "Salvar conversão" duas vezes seguidas com os mesmos valores, a segunda entrada não deve ser adicionada.

**O que testa:** Uso de `.update()` com lógica condicional. Você precisa comparar a nova entrada com a primeira do array anterior.

**Critério de sucesso:** a função retorna o `prev` original quando detecta duplicata e retorna um novo array quando adiciona entrada. Nada de `push`.

### Exercício 3 — Mensagem para valor zero

Quando `inputValue()` for `0`, exiba uma mensagem diferente no resultado: "Digite um valor para converter" em vez do resultado numérico.

**O que testa:** Pode ser feito com `@if` no template ou com um `computed` que retorna string diferente. A escolha entre os dois revela o que você aprendeu sobre onde colocar lógica.

**Critério de sucesso:** a regra fica em um lugar claro. Se virar string derivada reutilizada, prefira `computed`; se for apenas uma condição visual local, `@if` basta.

### Exercício 4 — Destacar conversão mais recente

No histórico, a primeira entrada (mais recente) deve ter fundo diferente.

**O que testa:** Uso de `$first` dentro de `@for` (variável contextual). Não precisa de signal novo.

**Critério de sucesso:** o destaque depende da posição no `@for`, não de um novo campo salvo no histórico.

### Exercício 5 — Inverter unidades

Adicione um botão "⇄" que troca unidade de origem com unidade de destino.

**O que testa:** Dois `.set()` em sequência. O resultado recalcula automaticamente? Sim — o computed depende de ambos.

**Critério de sucesso:** você guarda os valores atuais antes de trocar, faz dois `.set()` e não chama nenhuma função manual de recálculo.

### Exercício 6 — Contador de conversões por sessão

Adicione um `computed` que conta quantas conversões foram feitas (tamanho do histórico).

```typescript
historyCount = computed(() => this.history().length);
```

**O que testa:** Se você reconhece que um computed pode derivar de outro signal sem complexidade. Se o template exibe `{{ historyCount() }}` e atualiza automaticamente.

**Critério de sucesso:** `historyCount` é readonly, não tem `.set()`, e muda quando o histórico muda.

### Rubrica antes de avançar

Você está pronto para a próxima fase se consegue:

1. Apontar, no código, quais valores são fonte de verdade e quais são derivação.
2. Remover um `effect` indevido e substituí-lo por `computed` sem quebrar o app.
3. Explicar por que `history.update(prev => [entry, ...prev])` comunica melhor a mudança do que `push`.
4. Alterar uma categoria/unidade e prever quais computeds serão invalidados.
5. Ensinar, em dois minutos, por que o template lê `signal()` com parênteses.

---

## 13. Perguntas de Entrevista e Visão Sênior

Estas perguntas aparecem em entrevistas para posições Angular sênior. As respostas estão contextualizadas com o que você praticou.

### "O que são signals no Angular e por que foram introduzidos?"

Signals são primitivos de reatividade granular. Antes deles, o Angular dependia de Zone.js para detectar mudanças: operações assíncronas como timers, promises e event listeners podiam disparar uma verificação ampla da árvore de componentes. Isso funcionava, mas era impreciso — o Angular partia da suspeita de que algo poderia ter mudado.

Signals resolvem isso declarando onde o estado vive e quem depende dele. Quando um signal muda, os consumidores daquele signal podem ser notificados diretamente. O resultado é uma detecção de mudanças mais granular: o Angular trabalha com dependências conhecidas em vez de depender apenas de uma suspeita global de que "algo talvez mudou".

No UnitFlip, quando `inputValue` muda, `result` fica desatualizado porque depende dele via `computed`, e os trechos do template que leem `inputValue()` e `result()` têm uma dependência explícita. Você não precisa espalhar chamadas de atualização por botões, selects e handlers.

### "Qual a diferença entre `computed` e `effect`?"

`computed` produz um valor derivado. É síncrono, preguiçoso, memorizado, e o resultado é lido por outros signals ou pelo template. O Angular pode otimizar a execução porque sabe que é pura derivação.

`effect` produz uma ação no mundo externo. Não retorna valor. Não é memorizado. O Angular o executa durante o processo de change detection (para efeitos de componente) ou como microtask (para efeitos raiz). Serve para sincronizar com APIs imperativas: localStorage, logging, libs de terceiros.

A distinção importa porque misturar os dois (usar effect para derivar estado) cria bugs: loops circulares, erros de verificação, comportamento inconsistente.

### "Por que `effect` exige cautela?"

Porque é o único ponto da API de signals que pode causar efeitos colaterais. Um `signal` guarda estado. Um `computed` deriva estado. Ambos são previsíveis e testáveis. Um `effect`, por definição, faz algo fora do modelo reativo — salva no disco, faz log, muda o DOM imperativo.

Efeitos colaterais são onde bugs moram:
- O que acontece se o efeito falhar? (O signal já mudou, mas o localStorage não atualizou.)
- O que acontece se o efeito tiver dependência circular? (Signal A muda → effect atualiza signal B → signal B muda → effect roda de novo → ...)
- O que acontece se o efeito for pesado? (Toda mudança no signal dispara I/O.)

A orientação oficial do Angular é evitar effects para propagar mudanças de estado. Prefira `computed` para derivação e `linkedSignal` para estado que é derivado e também pode ser manualmente atualizado.

### "Como signals se relacionam com o modelo zoneless?"

Zone.js intercepta operações assíncronas para saber quando "algo pode ter mudado". Signals reduzem essa dependência porque o Angular passa a ter fontes de estado e consumidores rastreáveis. Isso torna o modelo zoneless natural.

Nesta trilha, usamos zoneless como padrão didático para treinar a mentalidade moderna. Isso não significa que Zone.js deixou de funcionar; significa que, com signals, você aprende a depender menos de interceptação global e mais de dependências explícitas.

O UnitFlip foi desenhado para funcionar bem nesse modelo. Quando `inputValue.set(100)` é chamado, o Angular sabe que `result` foi invalidado e que certos trechos do template leem esse valor. Sem depender de um "talvez tudo tenha mudado" como primeiro impulso mental.

### "Como isso melhora clareza e previsibilidade em projetos grandes?"

Em projetos com Zone.js, a pergunta "por que o template atualizou?" é difícil de responder. Qualquer operação assíncrona pode ter disparado a verificação. Com signals, a resposta é precisa: "o template atualizou porque `signal X` mudou, e este trecho do template lê `signal X`".

Essa rastreabilidade é ouro em times grandes. Quando um bug de "o dado não atualiza" aparece, você rastreia qual signal deveria ter mudado e por quê. O caminho é linear e auditável.

---

## 14. Resumo Final da Fase

### O que você construiu

Um conversor de unidades funcional com três categorias, conversão em tempo real e histórico persistente. Simples no escopo, profundo na formação.

### Principais aprendizados

| Conceito | O que você sabe agora |
|---|---|
| `signal()` | Cria estado reativo mutável. Lido com `()`. Atualizado com `.set()` ou `.update()`. |
| `computed()` | Deriva valor de outros signals. Lazy, memoizado, readonly. Nunca `.set()`. |
| `effect()` | Ponte para o mundo externo. Não deriva valor. Roda quando dependências mudam. |
| Template reativo | `{{ meuSignal() }}` registra uma leitura reativa no template. |
| Imutabilidade | Para arrays em signals, crie novo array em vez de mutar o existente. |
| Modelo mental | Fonte → Derivação → Efeito. Cada peça tem um papel. Nenhuma faz o trabalho da outra. |

### Modelo mental esperado ao final

```
"Eu tenho dados que o usuário controla (signals).
 Eu tenho valores que se calculam sozinhos a partir desses dados (computeds).
 Eu tenho ações que acontecem no mundo externo quando os dados mudam (effects).
 O template lê tudo isso e atualiza sozinho."
```

Se esse parágrafo faz sentido intuitivo — não como frase decorada, mas como descrição natural do que você implementou — a base reativa está formada.

### Como saber que a Fase 01 cumpriu seu papel

A fase cumpriu seu papel se você consegue olhar para uma mudança de requisito e classificar a solução antes de escrever código:

1. "Isso é dado que alguém controla?" Então provavelmente é `signal`.
2. "Isso é consequência de dados existentes?" Então provavelmente é `computed`.
3. "Isso escreve, lê ou sincroniza algo fora do Angular?" Então talvez seja `effect`.
4. "Isso é só uma decisão visual local?" Então talvez seja template com `@if` ou `@for`, sem estado novo.

Esse é o ganho real da fase: não decorar três APIs, mas escolher a API certa com baixa hesitação.

### Erros que não devem ir para a próxima fase

Leve estes para frente e você terá problemas:

1. **Confundir effect com computed.** Se o valor aparece no template, é computed. Se a ação é no localStorage/analytics/DOM, é effect.
2. **Criar signal para tudo.** Constantes são constantes. Valores derivados são computeds. Só o que muda E é fonte original de verdade precisa ser signal.
3. **Mutar arrays dentro de signals.** Sempre crie novo array/objeto. Signal compara por referência.
4. **Esquecer os parênteses.** `signal()` no template, não `signal`.

### Ponte para a Fase 02 — ShowCase

Na Fase 01, tudo aconteceu num único componente. O conversor era simples o suficiente para isso. Mas apps reais têm dezenas de componentes que precisam se comunicar: um componente de filtro fala com um componente de lista, um componente de card recebe dados de um componente pai.

A Fase 02 (ShowCase — Galeria de Componentes) vai ensinar exatamente isso:
- Como dividir a interface em componentes menores
- Como passar dados de pai para filho (`input()`)
- Como emitir eventos de filho para pai (`output()`)
- Como projetar conteúdo com `<ng-content>`
- Como o control flow moderno (`@if`, `@for`, `@switch`) compõe esses componentes

Os signals que você dominou aqui serão o estado que flui entre componentes. A Fase 02 não repete signals — ela os usa como ferramenta para resolver o problema novo: composição de componentes.

Antes de avançar, verifique se você não está levando uma confusão central: componente não corrige modelo mental fraco. Na Fase 02, `input()` e `output()` vão mover dados entre peças menores; se você já sabe distinguir fonte, derivação e efeito, essa comunicação fica muito mais fácil de entender.

---

> **Nota final:** Esta fase foi pequena no escopo e grande na formação. Se você entendeu *por que* cada decisão foi tomada — não apenas *o que* foi implementado — está pronto para a próxima fase. Se algo ficou vago, releia a Seção 4 (Modelo Mental) e a Seção 9 (Comparações) antes de seguir. A base precisa ser sólida.
