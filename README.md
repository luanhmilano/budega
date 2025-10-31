# Documento de Arquitetura de Software: E-commerce "Budega"

---

| Versão | Data de Modificação | O que mudou |
| ------ | ------------------ | ----------- |
| 1.0.0  | 02/09/2025         | Primeira implementação do documento |
| 2.0.0  | 31/10/2025         | MVP Finalizado, definição das implementações Pós-MVP e estrutura da aplicação |

---

## 1. Background

**Objetivo do Projeto:**  
Desenvolver um e-commerce frontend como projeto de estudo para aprofundar conhecimentos em arquitetura de software, boas práticas com React e fluxo de carrinho de compras. O projeto será um ambiente controlado para aplicar padrões do mercado e compor portfólio técnico.

**Público-Alvo:**  
- Principal: O próprio desenvolvedor (aprendizado).
- Secundário: Recrutadores e líderes técnicos (demonstração de competência).

**Proposta de Valor:**  
- Arquitetura limpa e desacoplada (View/Controller).
- Suíte de testes completa (unitário, mutação, componente).
- Práticas modernas do ecossistema React.

---

## 2. Proto-personas

### 1. Desenvolvedor (Usuário Principal)
- **Demografia:** Desenvolvedor Frontend.
- **Objetivos/Necessidades:**
  - Desacoplar lógica de negócio da renderização (View/Controller).
  - Implementar ciclo de testes robusto.
  - Base de código fácil de evoluir e manter.
- **Frustrações:** Código legado com baixa cobertura de testes; dificuldade em isolar regras de negócio complexas.
- **Cenário de Uso:**  
  > "Preciso adicionar uma nova regra de validação no formulário de configuração do produto. Quero fazer isso no controller, escrever um teste unitário para a nova lógica e garantir que nenhum comportamento antigo quebrou, tudo isso sem tocar no componente de view."

### 2. Comprador (Usuário Final Simulado)
- **Demografia:** Jovem adulto, 25-40 anos, familiarizado com compras online.
- **Objetivos/Necessidades:**
  - Visualizar produtos claramente.
  - Configurar opções (cor, tamanho) e adicionar ao carrinho.
  - Gerenciar itens no carrinho de forma intuitiva.
- **Frustrações:** Interfaces lentas; fluxo confuso de adição ao carrinho; dificuldade para editar pedido antes de finalizar.
- **Cenário de Uso:**  
  > "Vi um produto que gostei na página inicial. Cliquei, escolhi a cor, adicionei 2 unidades ao carrinho. Fui para o carrinho, decidi que queria apenas 1 unidade e ajustei a quantidade facilmente."

---

## 3. Requisitos (MoSCoW)

### Must Have (MVP Essencial)
- ✅ Projeto React com Vite.
- ✅ Estrutura de pastas e arquivos definida.
- ✅ Sistema de rotas: Home, ProductDetail, Cart, etc.
- ✅ Lista de produtos hard-coded na HomePage.
- ✅ ProductDetailPage com opções simuladas e botão "Adicionar ao Carrinho".
- ✅ CartPage para visualizar, alterar quantidade e remover itens.
- ✅ Gestão de estado do carrinho (Context API).

### Should Have (Alta Prioridade Pós-MVP)
- Persistência entre sessões (ex: localStorage).
- Estilização e Indicadores de loading (skeletons).
- Testes unitários (React Testing Library) para controllers e utils.
- Testes de componente/E2E (Cypress) para o fluxo principal.
- Internacionalização com i18next.

### Could Have (Menor Prioridade)
- Integração com API mock via Tweak.
- Testes de mutação com Stryker.
- Layout do Figma.
- Storybook para componentes de UI.

### Won't Have (Fora do Escopo Inicial)
- Autenticação de usuário.
- Formulários com validação (React Hook Form + Zod).
- Processo de checkout e pagamento.
- Backend ou banco de dados.

---

## 4. Método Técnico

### Arquitetura Geral: View/Controller com Hooks

- **Controller:**  
  Lógica de negócio, manipulação de estado, efeitos colaterais e callbacks encapsulados em funções controladoras (ex: `HomeController`).

- **View:**  
  Componente React responsável apenas por renderizar a UI com dados e handlers do controller. Mantido o mais "burro" possível.

### Gestão de Estado

- **Global Client State:**  
  Context API para gerenciar o estado do carrinho (estrutura simples, 100% cliente).

### API Mocking

- Mock em `mocks/products.json` seguindo interface `IProduct`.
- Chamadas atrasadas para simular uma chamada de requisição.

### Data Contracts (Interfaces)

- Interfaces TypeScript em `src/interfaces` para garantir consistência dos dados.

### API do CartContext

- **Estado Exposto:**
  - `cartItems: ICartItem[]`
  - `totalItems: number` (calculado via `useMemo`)

- **Funções Expostas:**
  - `addToCart(product, selectedVariant, quantity)`
  - `incrementQuantity(cartItemId)`
  - `decrementQuantity(cartItemId)` (remove se quantidade = 1)
  - `removeFromCart(cartItemId)`

---

## 5. Plano de Implementação

### Fase 1: MVP (Concluída) ✅

1. **Bootstrap do Projeto**
   - [x] Criar projeto React com Vite.
   - [x] Instalar dependências essenciais.
   - [x] Estruturar pastas.

2. **Rotas e Páginas Básicas**
   - [x] Configurar rotas: Home, ProductDetail/:id, Cart.
   - [x] Criar componentes de view vazios.

3. **Estado do Carrinho e Contratos**
   - [x] Definir interfaces `IProduct` e `ICartItem`.
   - [x] Criar CartContext com funções principais.

4. **Fluxo com Dados Hard-coded**
   - [x] Array de produtos fake no controller.
   - [x] Lógica de passagem de dados para view.
   - [x] Implementar addToCart e gerenciamento do carrinho.

### Fase 2: Persistência e UX (2-3 semanas)

1. **Persistência entre Sessões (3-4 dias)**
   - [ ] Implementar hook `useLocalStorage` para carrinho.
   - [ ] Criar middleware para sincronizar CartContext com localStorage.
   - [ ] Adicionar loading state durante hidratação inicial.

2. **Estilização e Loading States (5-7 dias)**
   - [ ] Implementar sistema de design básico (cores, tipografia, espaçamentos).
   - [ ] Criar componentes de skeleton para produtos e carrinho.
   - [ ] Adicionar loading spinners e estados de carregamento.
   - [ ] Implementar feedback visual para ações do usuário (toast notifications).

3. **Melhoria de UX (2-3 dias)**
   - [ ] Adicionar animações de transição entre páginas.
   - [ ] Implementar debounce para busca de produtos.
   - [ ] Criar componente de quantidade com controles visuais.

### Fase 3: Testes e Qualidade (2-3 semanas)

1. **Testes Unitários (5-7 dias)**
   - [ ] Configurar React Testing Library e Jest.
   - [ ] Implementar testes para todos os controllers.
   - [ ] Criar testes para utils e helpers.
   - [ ] Testar hooks customizados (useLocalStorage, etc).
   - [ ] Atingir cobertura mínima de 90%.

2. **Testes de Componente/E2E (5-7 dias)**
   - [ ] Configurar Cypress para testes E2E.
   - [ ] Implementar testes do fluxo principal:
     - Navegar da Home → ProductDetail → adicionar ao carrinho.
     - Gerenciar itens no carrinho (alterar quantidade, remover).
     - Persistência entre reloads da página.
   - [ ] Testes de acessibilidade básica.

3. **Pipeline de Qualidade (2-3 dias)**
   - [ ] Configurar GitHub Actions para CI/CD.
   - [ ] Integrar ESLint com regras estritas.
   - [ ] Configurar Prettier para formatação.
   - [ ] Setup de pre-commit hooks com Husky.

### Fase 4: Internacionalização (1-2 semanas)

1. **Setup i18next (2-3 dias)**
   - [ ] Instalar e configurar react-i18next.
   - [ ] Criar arquivos de tradução (pt-BR, en-US).
   - [ ] Implementar hook customizado para tradução.

2. **Implementação (3-4 dias)**
   - [ ] Traduzir todos os textos estáticos.
   - [ ] Implementar formatação de números e moedas.
   - [ ] Criar componente de seletor de idioma.
   - [ ] Persistir preferência de idioma no localStorage.

3. **Testes de Internacionalização (1-2 dias)**
   - [ ] Testes unitários para formatação de textos.
   - [ ] Testes E2E para troca de idiomas.

### Fase 5: Deploy (1 semana)

1. **Deploy e Monitoramento (2-3 dias)**
   - [ ] Setup do GitHub Pages ou Vercel.
   - [ ] Configurar pipeline de deploy automático.
   - [ ] Documentar processo de deploy.

---

## 6. Marcos de Entrega (Milestones)

- **Milestone 1 (Semana 2):** MVP funcional (navegação, produtos hard-coded, carrinho funcional).
- **Milestone 2 (Semana 3):** Integração com API mock e internacionalização.
- **Milestone 3 (Semana 5):** Cobertura de testes >80%, E2E com Cypress.
- **Milestone 4 (Contínuo):** Layout do Figma, Storybook, publicação no GitHub Pages.

---

## 7. Avaliação de Resultados

- **Validação dos Requisitos:**  
  Checklist funcional ao final de cada milestone.

- **KPIs de Código:**
  - Cobertura de testes unitários (>80%).
  - Mutation Score com Stryker (>80%).
  - ESLint com regras estritas.

- **Monitoramento Pós-deploy:**
  - Lighthouse Score (>90 em todas categorias).
  - React DevTools Profiler para performance de renderização.

---