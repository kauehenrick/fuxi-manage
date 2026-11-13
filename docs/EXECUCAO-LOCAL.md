# Execução local

O FuXi não mantém uma demo hospedada nem uma configuração de deploy. Para avaliar o sistema, cada pessoa deve clonar os dois repositórios e executá-los localmente. A API e o MySQL rodam em Docker; o frontend roda com Vite.

```text
Navegador (http://localhost:5173)
             │
             ▼
Frontend Vite ──► API Laravel em Docker (http://localhost:8000/api)
                         │
                         ▼
                    MySQL em Docker
```

## Pré-requisitos

- Git;
- Docker Engine ou Docker Desktop, com Docker Compose v2;
- Node.js 24+ e pnpm para o frontend.

## 1. Obter os repositórios

```bash
git clone https://github.com/kauehenrick/fuxi-backend.git
git clone https://github.com/kauehenrick/fuxi-manage.git
```

Os comandos seguintes consideram os dois diretórios no mesmo nível.

## 2. Iniciar a API e o banco

```bash
cd fuxi-backend
cp .env.example .env
LOCAL_UID=$(id -u) LOCAL_GID=$(id -g) docker compose up --build -d
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate --seed
```

Espere os containers ficarem saudáveis e valide a API:

```bash
curl -i http://localhost:8000/up
curl -i http://localhost:8000/api/login
```

O primeiro comando deve responder `200`. O segundo deve responder `405` para `GET`, confirmando que a rota existe e aceita somente `POST`.

## 3. Iniciar o frontend

Em outro terminal:

```bash
cd fuxi-manage
cp .env.example .env
pnpm install
pnpm dev
```

O arquivo `.env.example` já aponta `VITE_API_URL` para `http://localhost:8000/api`. Abra `http://localhost:5173` no navegador.

Use a conta criada pelo seeder:

```text
E-mail: admin@fuxi.com
Senha: fuxi123@
```

## 4. Encerrar ou reiniciar

```bash
cd fuxi-backend
docker compose down
```

Para apagar também os dados locais do MySQL e recomeçar do zero, use `docker compose down -v`; esse comando remove o volume local do banco.

## Roteiro de aceite

1. Abra `/login`, `/books` e `/genres` diretamente; as rotas não devem retornar 404.
2. Entre com a conta inicial ou cadastre um usuário, recarregue a página e confirme que a sessão continua válida.
3. Crie, edite, desative e restaure autor, gênero e livro.
4. Confira os cartões e gráficos do painel.
