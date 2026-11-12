# FuXi Frontend

Interface web do FuXi, um gerenciador de acervo de biblioteca. Este repositório contém somente o frontend React; a API Laravel e o banco de dados são dependências externas.

## Stack

React 19, TypeScript, Vite 7, Zustand, Tailwind CSS, shadcn/ui, React Hook Form, Zod, Axios e React Router.

## Executar localmente

Pré-requisitos: Node.js 24+ e pnpm.

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Defina `VITE_API_URL` com a URL base da API, incluindo `/api`:

```env
VITE_API_URL=http://localhost:8000/api
```

Os comandos disponíveis são `pnpm dev`, `pnpm build`, `pnpm preview`, `pnpm lint`, `pnpm lint:fix` e `pnpm format`.

## Documentação

- [Visão técnica do projeto](docs/PROJETO.md): arquitetura, rotas, fluxos, contrato de API e limitações conhecidas.
- [Deploy da demo gratuita](docs/DEMO-GRATUITA.md): Vercel para o frontend, Render para a API Laravel e Supabase Postgres para persistência.

`VITE_*` é exposto no navegador durante o build. Não coloque tokens, senhas ou chaves nessas variáveis.
