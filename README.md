# Documento de Arquitetura de Software: E-commerce de Estudo

---

| Versão | Data de Modificação | O que mudou |
| ------ | ------------------ | ----------- |
| 1.0.0  | 02/09/2025         | Primeira implementação do documento |

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
- Práticas modernas do ecossistema React e recomendações da Telefónica.

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
- Projeto React com Vite.
- Estrutura de pastas e arquivos definida.
- Sistema de rotas: Home, ProductDetail, Cart.
- Lista de produtos hard-coded na HomePage.
- ProductDetailPage com opções simuladas e botão "Adicionar ao Carrinho".
- CartPage para visualizar, alterar quantidade e remover itens.
- Gestão de estado do carrinho (Context API).

### Should Have (Alta Prioridade Pós-MVP)
- Integração com API mock via Tweak.
- Internacionalização com i18next.
- Testes unitários (React Testing Library) para controllers e utils.
- Testes de componente/E2E (Cypress) para o fluxo principal.
- Formulários com validação (React Hook Form + Zod).
- Indicadores de loading (skeletons).

### Could Have (Menor Prioridade)
- Testes de mutação com Stryker.
- Layout do Figma.
- Storybook para componentes de UI.

### Won't Have (Fora do Escopo Inicial)
- Autenticação de usuário.
- Processo de checkout e pagamento.
- Backend ou banco de dados.
- Persistência entre sessões (ex: localStorage).

---

## 4. Método Técnico

### Arquitetura Geral: View/Controller com Hooks

- **Controller:**  
  Lógica de negócio, manipulação de estado, efeitos colaterais e callbacks encapsulados em hooks customizados (ex: `useHomeController`).

- **View:**  
  Componente React responsável apenas por renderizar a UI com dados e handlers do controller. Mantido o mais "burro" possível.

#### Diagrama de Fluxo de Dados

> Adição de produto ao carrinho (PlantUML):

![Diagrama de Fluxo](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA/8AAAGeCAYAAADCNbGAAAAQAElEQVR4A...)

### Gestão de Estado

- **Server State:**  
  React Query para buscar, cachear e sincronizar dados dos produtos da API mock. Gerencia estados de loading, error e success.

- **Global Client State:**  
  Context API para gerenciar o estado do carrinho (estrutura simples, 100% cliente).

### API Mocking

- Tweak intercepta chamadas do ProductService.
- Mock em `mocks/products.json` seguindo interface `IProduct`.
- Tweak retorna o JSON no endpoint `/products`.

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

## 5. Plano de Implementação (MVP-First)

1. **Bootstrap do Projeto (1-2 dias)**
   - [x] Criar projeto React com Vite.
   - [x] Instalar dependências essenciais.
   - [x] Estruturar pastas.

2. **Rotas e Páginas Básicas (2-3 dias)**
   - [x] Configurar rotas: Home, ProductDetail/:id, Cart.
   - [x] Criar componentes de view vazios.

3. **Estado do Carrinho e Contratos (2-3 dias)**
   - Definir interfaces `IProduct` e `ICartItem`.
   - Criar CartContext com funções principais.

4. **Fluxo com Dados Hard-coded (3-5 dias)**
   - Array de produtos fake no controller.
   - Lógica de passagem de dados para view.
   - Implementar addToCart e gerenciamento do carrinho.

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