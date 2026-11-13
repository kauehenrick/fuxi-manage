# FuXi — visão técnica

Aplicação web para gerir um acervo de biblioteca: livros, autores e gêneros. Há login/cadastro, painel com indicadores e desativação/restauração dos cadastros.

## Escopo versionado

Este repositório contém **somente o frontend**. Não há código, migrations, Dockerfile ou configuração do backend nele. As informações de backend abaixo descrevem o contrato exigido pelo cliente e não substituem a documentação do repositório da API.

## Frontend

| Área | Implementação |
| --- | --- |
| Runtime/build | React 19, TypeScript, Vite 7 e pnpm |
| Interface | Tailwind CSS 4, componentes `src/components/ui` e Sonner |
| Formulários | React Hook Form + Zod |
| Estado | Zustand; sidebar persiste no `localStorage` |
| Rotas | React Router, com rotas privadas protegidas por `ProtectedRoute` |
| HTTP | Axios, em `src/services/api.ts` |
| Qualidade | Biome (`pnpm lint`) e TypeScript no build |

### Rotas de tela

| Rota | Acesso | Finalidade |
| --- | --- | --- |
| `/login` | pública | login e criação de conta |
| `/` | autenticada | painel, totais, livros por gênero e autores em destaque |
| `/books` | autenticada | CRUD lógico de livros |
| `/authors` | autenticada | CRUD lógico de autores |
| `/genres` | autenticada | CRUD lógico de gêneros |
| `/people` | autenticada | placeholder, sem fluxo implementado |
| `/settings` | autenticada | placeholder, sem configurações implementadas |

### Fluxo e configuração

1. No início, `App` chama `GET /me`; sem usuário válido, as rotas privadas redirecionam para `/login`.
2. Login e cadastro recebem um token, salvo como `localStorage.token`.
3. O interceptor Axios envia `Authorization: Bearer <token>` e, em `401` fora de `/login` e `/me`, remove o token e retorna ao login.
4. A home carrega autores, gêneros, livros e indicadores uma vez por sessão do store.

`VITE_API_URL` é embutida no bundle pelo Vite. Ela deve terminar em `/api` e jamais conter segredos. O fallback de desenvolvimento é `http://localhost:8000/api`.

Comandos: `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm lint` e `pnpm preview`.

## Integração com backend

A API Laravel está no repositório irmão `fuxi-backend`. A documentação completa dela está em [API](https://github.com/kauehenrick/fuxi-backend/blob/main/docs/API.md) e [deploy](https://github.com/kauehenrick/fuxi-backend/blob/main/docs/DEPLOY.md). Este resumo mantém apenas o contrato consumido pelo frontend:

| Recurso | Operações |
| --- | --- |
| Autenticação | `POST /users`, `POST /login`, `POST /logout`, `GET /me` |
| Livros | `GET/POST /books`, `PATCH/DELETE /books/{id}`, `PATCH /books/{id}/restore` |
| Autores | `GET/POST /authors`, `PATCH/DELETE /authors/{id}`, `PATCH /authors/{id}/restore` |
| Gêneros | `GET/POST /genres`, `PATCH/DELETE /genres/{id}`, `PATCH /genres/{id}/restore` |
| Painel | `GET /dashboard` |

Respostas de listagem podem ser um array ou `{ data: [...] }`. `DELETE` é desativação lógica: a UI espera `book.deleted_at`, `author.deleted_at` ou `genre.deleted_at`; restauração devolve o registro correspondente. O painel espera `{ booksByGenre: [{ name, value }], topAuthors: [{ name, books }] }`.

Campos enviados:

- usuário: `name`, `email`, `password`, `confirmPassword` no cadastro; `email`, `password` no login;
- livro: `title`, `author_id`, `genre_id`, `published_year`, `amount`, `localization`, `isbn`;
- autor e gênero: `name`.

O backend deve manter uma lista explícita de origens em `CORS_ALLOWED_ORIGINS`, permitir o cabeçalho `Authorization` e responder a `OPTIONS`. No desenvolvimento local, a origem esperada é `http://localhost:5173`. Tokens, chave de aplicação e credenciais de banco ficam exclusivamente no ambiente da API.

## Pendências conhecidas

- Não há testes automatizados nem pipeline CI no repositório.
- Exportação, Pessoas e Configurações são somente interface.
- Os dados ficam em stores em memória; recarregar a página busca-os novamente.
- A URL da API é variável de build: ao alterá-la, reinicie o servidor de desenvolvimento ou gere um novo build do frontend.
