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