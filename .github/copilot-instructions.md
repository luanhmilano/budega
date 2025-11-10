# Contexto Geral do Projeto

<project_context>

Este projeto segue diretrizes modernas de desenvolvimento front-end e está orientado a componentes, escalabilidade, testabilidade e modularização. Todas as respostas do GitHub Copilot devem ser fornecidas em **português (PT-BR)** e sem uso de emojis.

</project_context>

<technologies>

Tecnologias Utilizadas

- **Linguagens e Frameworks:** React, TypeScript, Node.js, JavaScript
- **Gerenciamento de Estado:** Context API do React com hooks personalizados
- **Testes:** Vitest, React Testing Library, Cypress com Gherkin (BDD)
- **Design System:** Próprio, baseado em componentes reutilizáveis
- **Documentação de UI:** Storybook
- **Roteamento:** react-router-dom

</technologies>

<structural_architecture>

Estrutura Arquitetural

- O projeto é baseado na separação entre:
  
  `*.controller.tsx` — **Container Components**
  - Responsáveis por lógica de negócio, integração com APIs, controle de estado e manipulação de dados.
  - Gerenciam formulários com `React Hook Form` e validam dados com `Zod`.
  - Não devem conter elementos visuais.
  - **Skeletons não devem ser usados aqui.**

  `*.view.tsx` — **Presentational Components**
  - Responsáveis exclusivamente pela interface e exibição de dados.
  - Recebem dados e callbacks via `props`, sem acessar lógica ou estado global.
  - Podem conter animações, traduções e efeitos visuais.
  - **Skeletons são utilizados exclusivamente aqui.**

</structural_architecture>

<coding_style>

Padrões de Codificação

TypeScript:
- Todo novo código deve ser escrito em TypeScript.
- Seguir princípios de imutabilidade (`const`, `readonly`) e composição funcional.
- Usar interfaces para modelar estruturas de dados e contratos de tipos.
- Utilizar operadores como `?.` e `??` para segurança de acesso.

React:
- Utilizar exclusivamente **componentes funcionais com hooks**.
- Evitar hooks condicionais ou fora da ordem declarativa.
- Preferir `function declaration` ao invés de `const = () =>`. Exemplo: `export function doThing() {...}` Ou para componentes React: `export function MyComponent() {...}`

Nomenclatura
- **PascalCase**: componentes, interfaces, aliases de tipos
- **camelCase**: variáveis, funções, métodos
- **ALL_CAPS**: constantes
- **\_underscore**: prefixo para membros privados

</coding_style>

## Key Files
- [`src/App.tsx`](./../src/App.tsx) - Main app component with providers
- [`src/routes.tsx`](./../src/routes.tsx) - Route configuration
- [`src/context/cart-context.tsx`](./../src/context/cart-context.tsx) - Cart state management
- [`vitest.config.ts`](./../vitest.config.ts) - Test configuration
- [`stryker.config.mjs`](./../stryker.config.mjs) - Mutation testing setup
