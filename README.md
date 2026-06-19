# Sistema Unificado UniFECAF

Protótipo de portal unificado para a UniFECAF, integrando em um único sistema os fluxos de **alunos**, **colaboradores de polo**, **coordenadores** e **administradores**. O objetivo é centralizar matrícula, financeiro, conteúdo acadêmico e relatórios em uma única plataforma, eliminando a fragmentação entre sistemas legados.

> Protótipo gerado no **Figma Make**
> [Ver protótipo original no Figma](https://www.figma.com/make/eg2vozJYdxtzLVsdX2ZXjZ/Sistema-Unificado-UniFECAF?fullscreen=1&t=sks98EWpntAXkDUw-1&code-node-id=0-9)

---

## Visão geral

O sistema possui **login único com 4 perfis de acesso**, cada um com seu próprio painel e navegação, podendo aumentar a quantidade de tipos de perfis:

| Perfil | Descrição | Acesso típico |
|---|---|---|
| **Aluno** | Portal acadêmico do estudante | `nome@aluno.unifecaf.edu.br` |
| **Colaborador** | Secretaria, atendimento e financeiro do polo | `nome@polo.unifecaf.edu.br` |
| **Coordenador** | Gestão do polo, equipe e relatórios | `nome@polo.unifecaf.edu.br` |
| **Administrador** | Acesso total ao sistema (multi-polo) | `nome@unifecaf.edu.br` |

No protótipo, o perfil é resolvido automaticamente a partir do e-mail digitado (não há backend/autenticação real — é uma simulação para fins de demonstração).

---

## Funcionalidades por perfil

### Portal do Aluno
- **Início** — resumo com disciplinas em curso, média geral, próxima aula e situação financeira
- **Disciplinas** — disciplinas matriculadas no semestre
- **Conteúdo Online** — acesso a conteúdo das aulas/EAD
- **Biblioteca** — acervo digital
- **Financeiro** — situação financeira do aluno
- **Meus Boletos** — segunda via e status de boletos (com indicador de pendências)
- **Suporte** — chat online, telefone e abertura de chamado

### Painel do Colaborador
- **Início** — visão geral do dia a dia do polo
- **Alunos** — consulta e gestão de alunos
- **Nova Matrícula** — fluxo de matrícula de novos alunos
- **Financeiro** — gestão financeira do polo
- **Boletos** — emissão e gestão de boletos
- **Relatórios** — relatórios operacionais do polo

### Painel do Coordenador
- **Início** — indicadores gerais do polo
- **Minha Equipe** — gestão da equipe de colaboradores
- **Alunos** — visão consolidada dos alunos do polo
- **Matrículas** — acompanhamento de matrículas
- **Financeiro** — indicadores financeiros do polo
- **Relatórios** — relatórios gerenciais

### Painel do Administrador
- **Visão Geral** — indicadores globais (todos os polos)
- **Usuários** — gestão de usuários do sistema
- **Configurar Polo** — cadastro e configuração de polos
- **Relatórios Globais** — relatórios consolidados de toda a rede
- **Configurações** — configurações gerais do sistema

---
 
## Stack tecnológica
 
- **[React 18](https://react.dev/)** + **TypeScript**
- **[Vite 6](https://vitejs.dev/)** — build e dev server
- **[Tailwind CSS 4](https://tailwindcss.com/)** — estilização
- **[shadcn/ui](https://ui.shadcn.com/)** sobre **[Radix UI](https://www.radix-ui.com/)** — biblioteca de componentes (accordion, dialog, dropdown, tabs, sidebar, etc.)
- **[Material UI](https://mui.com/)** (`@mui/material`, `@mui/icons-material`) — componentes complementares
- **[Lucide React](https://lucide.dev/)** — ícones
- **[Recharts](https://recharts.org/)** — gráficos e relatórios
- **[React Hook Form](https://react-hook-form.com/)** — formulários
- **[Motion](https://motion.dev/)** (Framer Motion) — animações
- **[Sonner](https://sonner.emilkowal.ski/)** — notificações toast
- **[React Router](https://reactrouter.com/)** — roteamento
- Outras libs de apoio: `date-fns`, `embla-carousel-react`, `react-dnd`, `react-resizable-panels`, `cmdk`, `vaul`, `canvas-confetti`
> ⚠️ Este é um protótipo de **interface (front-end apenas)**. Não há backend, banco de dados ou autenticação real — os dados exibidos são mockados diretamente nos componentes.
 
---
 
## Estrutura do projeto
 
```
.
├── index.html
├── package.json
├── vite.config.ts
├── src/
│   ├── main.tsx                     # Entry point
│   ├── app/
│   │   ├── App.tsx                  # Roteamento por perfil (role) e estado do usuário logado
│   │   └── components/
│   │       ├── Login.tsx            # Tela de login / seleção de perfil
│   │       ├── Layout.tsx           # Layout base (sidebar, header, navegação)
│   │       ├── student/
│   │       │   └── StudentApp.tsx   # Portal do Aluno
│   │       ├── staff/
│   │       │   └── StaffApp.tsx     # Painel do Colaborador
│   │       ├── coordinator/
│   │       │   └── CoordinatorApp.tsx  # Painel do Coordenador
│   │       ├── admin/
│   │       │   └── AdminApp.tsx     # Painel do Administrador
│   │       ├── figma/
│   │       │   └── ImageWithFallback.tsx
│   │       └── ui/                  # Componentes shadcn/ui (button, card, table, tabs, sidebar...)
│   ├── styles/                      # globals.css, theme.css, tailwind.css, fonts.css
│   └── imports/                     # Assets (logo, imagens)
└── guidelines/
    └── Guidelines.md                # Diretrizes de design do protótipo
```
 
---
 
## Como rodar localmente
 
**Pré-requisitos:** [Node.js](https://nodejs.org/) 18+ e `npm` (ou `pnpm`).
 
```bash
# 1. Instalar dependências
npm install
 
# 2. Rodar o servidor de desenvolvimento
npm run dev
```
 
O projeto abrirá em `http://localhost:5173` (porta padrão do Vite).
 
Para gerar o build de produção:
 
```bash
npm run build
```
 
---

## Como testar os perfis

Na tela de login, escolha entre **Aluno** ou **Staff** (Colaborador/Coordenador/Administrador). No fluxo de staff, o perfil exibido é resolvido a partir do e-mail informado (ex.: contas de exemplo pré-configuradas em `Login.tsx`). Como não há autenticação real, qualquer senha é aceita — o objetivo é navegar pelas telas de cada perfil.

---

## Status do protótipo

-  Navegação completa entre os 4 perfis
-  Telas principais de cada módulo implementadas com dados mockados
-  Sem integração com backend/API real
-  Sem persistência de dados (estado perdido ao recarregar a página)

---

## Criação

Protótipo escalável criado por Priscylla Pfleger, gestora do polo Lages SC - Copacabana. 2026.
