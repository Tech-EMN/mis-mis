# MIS — M Group Intelligence System

> **Dashboard modularizado** — reestruturado a partir do protótipo monolítico original (8776 linhas / 726KB) em 2026-07-15.

## Arquitetura

| Camada | Tecnologia | Descrição |
|--------|-----------|-----------|
| **UI** | React 18 (CDN) | Interface construída com JSX via Babel standalone |
| **Estilo** | CSS vanilla | 11 arquivos modulares (reset, variáveis, layout, componentes, auth, dark mode, responsivo) |
| **Roteamento** | Hash-based (#/) | Navegação SPA sem dependência de servidor |
| **Runtime** | Babel standalone 7.29 | JSX transpilado no browser — **sem build system** |

## Estrutura de Pastas

```
MIS/
├── index.html              ← Entry point enxuto (78 linhas)
├── README.md
├── assets/
│   ├── css/                ← 11 arquivos CSS organizados
│   │   ├── reset.css
│   │   ├── variables.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── auth.css
│   │   ├── dark-mode-vars.css
│   │   ├── dark-mode-part1.css
│   │   ├── dark-mode-part2.css
│   │   ├── dark-mode-part3.css
│   │   ├── responsive.css
│   │   └── main.css
│   ├── js/                 ← 23 arquivos JSX (Babel)
│   │   ├── config.js       ← Tokens de cor, ícones, constantes
│   │   ├── app.js          ← Router principal + ReactDOM.render
│   │   └── components/     ← 21 componentes por responsabilidade
│   ├── images/             ← Assets extraídos dos base64 inline
│   ├── icons/
│   ├── svg/
│   └── fonts/
├── components/             ← (futuro: componentes HTML puros)
├── pages/                  ← (futuro: páginas standalone)
├── services/               ← (futuro: integrações API)
├── store/                  ← (futuro: gerenciamento de estado)
├── styles/                 ← (futuro: CSS modules)
└── config/                 ← (futuro: configurações)
```

## Como Servir

Por ser um SPA com Babel standalone, **qualquer servidor HTTP estático** funciona:

```bash
# Opção 1: Python
cd MIS && python3 -m http.server 8080

# Opção 2: npx serve
npx serve MIS/

# Opção 3: GitHub Pages
git push para o repositório configurado com GitHub Pages
```

## Páginas (Hash Routing)

| Hash | Tela |
|------|------|
| `#login` | Login |
| `#cadastro` | Cadastro |
| `#feed` | Feed principal |
| `#dashboard` | Dashboard do projeto |
| `#projetos` | Lista de projetos |
| `#projeto` | Detalhe do projeto |
| `#cronograma` | Cronograma |
| `#obras` | Execução de obras |
| `#atividades` | Atividades diárias |
| `#relatorio-fotos` | Relatório fotográfico |
| `#financeiro` | Financeiro |
| `#fluxo-caixa` | Fluxo de caixa |
| `#contratos` | Contratos |
| `#suprimentos` | Suprimentos |
| `#pedidos` | Pedidos |
| `#medicoes` | Medições |
| `#upload` | Upload de arquivos |
| `#notificacoes` | Notificações |
| `#configuracoes` | Configurações |
| `#perfil` | Perfil profissional |

## Regras de Arquitetura

1. ✅ Nenhum arquivo > 400 linhas
2. ✅ Cada componente tem uma responsabilidade
3. ✅ Sem código duplicado
4. ✅ Novas telas em `assets/js/components/`
5. ✅ Sem CSS inline
6. ✅ Sem JavaScript inline (addEventListener)
7. ✅ Nomenclatura kebab-case
8. ✅ Componentes desacoplados e reutilizáveis

## Limitações Conhecidas

- **Babel standalone**: JSX transpilado no browser (sem tree-shaking, sem code splitting). Para produção, migrar para Vite/Next.js.
- **Escopo global**: Scripts compartilham `window` — não há `import`/`export`.
- **React development build**: Para produção, substituir por `react.production.min.js`.

---

*Reestruturado por Daedalus (AG01) — NEUMANN · ATRIA Corp · 2026-07-15*
