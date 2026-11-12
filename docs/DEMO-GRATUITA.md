# Demo gratuita: Vercel + Render + Supabase

Arquitetura recomendada para demonstração, sem dados sensíveis:

```text
Navegador
   │ HTTPS
   ▼
Vercel (React/Vite) ── HTTPS + Bearer ──► Render (Laravel API) ──► Supabase (Postgres)
```

- **Vercel** hospeda o bundle estático; `vercel.json` mantém as rotas do React acessíveis por URL direta.
- **Render** executa a API Laravel como Web Service Docker. O plano gratuito é adequado a demo, mas a instância hiberna após 15 minutos sem tráfego; a primeira chamada posterior pode levar cerca de um minuto.
- **Supabase** oferece Postgres persistente no plano gratuito. É preferível ao Postgres gratuito do Render para a demo, pois este expira após 30 dias. Um projeto Supabase gratuito pode pausar depois de uma semana sem atividade.

Links oficiais: [Vercel — rewrites](https://vercel.com/docs/routing/rewrites), [Render — plano gratuito](https://render.com/docs/free), [Render — Laravel com Docker](https://render.com/docs/deploy-php-laravel-docker) e [Supabase — preços](https://supabase.com/pricing).

## 1. Dependência de backend

O deploy da API, banco, migrations, Docker e CORS pertence ao repositório `fuxi-backend`; consulte `fuxi-backend/docs/DEPLOY.md`. Antes do deploy do frontend, tenha a URL pública da API Render, por exemplo `https://fuxi-api-demo.onrender.com`.

## 2. Publicar o frontend na Vercel

1. Faça commit dos arquivos deste repositório e importe-o no painel da Vercel.
2. O framework será detectado como Vite. Mantenha `pnpm build` e diretório de saída `dist`.
3. Em **Settings → Environment Variables**, configure em Production e Preview:

```env
VITE_API_URL=https://fuxi-api-demo.onrender.com/api
```

4. Faça o deploy e copie a URL Vercel final para `CORS_ALLOWED_ORIGINS` no serviço da API. Depois, redeploy a API e o frontend.

## 3. Roteiro de aceite

1. Abra diretamente `/login`, `/books` e `/genres`: nenhuma deve retornar 404.
2. Cadastre um usuário de demonstração e confirme `GET /me` após recarregar.
3. Crie, edite, desative e restaure autor, gênero e livro.
4. Confira os cartões e gráficos do painel.
5. Confirme no navegador que a API aceita somente a origem Vercel e que não há segredo no bundle.

## Limites da demo

Esta estrutura é para avaliação, não produção: o backend pode demorar ao acordar, provedores gratuitos podem pausar serviços e não há SLA/backup garantido. Para produção, use instância sem hibernação, banco com backups e domínio próprio.
