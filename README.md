# **FuXi Frontend**

Frontend da aplicação **FuXi**, um gerenciador de livros estilo biblioteca, desenvolvido com uma arquitetura baseada em **React**, **TypeScript** e **Vite**.

## **Stack**

- **React 19**
- **TypeScript**
- **Zustand**
- **TailwindCSS**
- **shadcn/ui**
- **Zod**
- **Vite 7**
- **Axios**
- **React Router**
- **Sonner**

## **Requisitos**

Antes de iniciar o projeto, certifique-se de ter instalado:

- **Node.js 24.17.0 ou superior**
- **PNPM**

Para verificar as versões instaladas:

```bash
node --version
pnpm --version
```

## **Como executar o projeto**

### **1. Instalar as dependências**

```bash
pnpm install
```

### **2. Configurar as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8000/api
```

A variável `VITE_API_URL` deve apontar para a URL da API do backend.

### **3. Executar em ambiente de desenvolvimento**

```bash
pnpm dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

## **Scripts disponíveis**

### **Desenvolvimento**

```bash
pnpm dev
```

Inicia o servidor de desenvolvimento do Vite.

### **Build**

```bash
pnpm build
```

Gera a versão otimizada da aplicação para produção.

### **Preview**

```bash
pnpm preview
```

Executa localmente a versão gerada pelo build.

### **Lint**

```bash
pnpm lint
```

Executa a análise estática do código.

### **Lint Fix**

```bash
pnpm lint:fix
```

Executa o **Biome** e corrige automaticamente os problemas que podem ser resolvidos de forma segura.

O comando utiliza:

```text
biome check --write --unsafe
```

> **Atenção:** a opção `--unsafe` permite que o Biome aplique correções consideradas potencialmente inseguras. Revise as alterações antes de realizar o commit.

### **Format**

```bash
pnpm format
```

Formata os arquivos do projeto utilizando o **Biome**.

## **Estrutura do projeto**

```text
src/
├── components/
│   ├── ui/
│   └── ...
├── pages/
│   ├── Dashboard/
│   ├── Login/
│   └── ...
├── stores/
│   ├── authorStore.ts
│   ├── bookStore.ts
│   ├── dashboardStore.ts
│   ├── genreStore.ts
│   └── ...
├── services/
│   └── api.ts
├── schemas/
│   └── ...
├── routes/
│   └── ...
├── App.tsx
└── main.tsx
```

## **Comunicação com o Backend**

A comunicação com a API é centralizada através da configuração do Axios.

A URL base da API deve ser definida através da variável de ambiente:

```env
VITE_API_URL=http://localhost:8000/api
```

Exemplos de endpoints utilizados pela aplicação:

```text
GET    /books
POST   /books
PATCH  /books/{id}
DELETE /books/{id}

GET    /authors
POST   /authors
PATCH  /authors/{id}
DELETE /authors/{id}

GET    /genres
POST   /genres
PATCH  /genres/{id}
DELETE /genres/{id}

GET    /dashboard
```

## **Variáveis de ambiente**

As variáveis de ambiente utilizadas pelo frontend devem possuir o prefixo `VITE_`.

Exemplo:

```env
VITE_API_URL=http://localhost:8000/api
```

> **Importante:** não armazene informações sensíveis em variáveis `VITE_*`, pois essas variáveis são incorporadas ao bundle durante o processo de build e podem ser acessadas pelo navegador.

## **Build para produção**

Para gerar os arquivos otimizados para produção:

```bash
pnpm build
```

Os arquivos serão gerados no diretório:

```text
dist/
```

A aplicação pode então ser hospedada em um servidor web ou serviço de hospedagem para aplicações frontend estáticas.

## **Fluxo da aplicação**

```text
┌───────────────┐
│     React     │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│    Zustand    │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│     Axios     │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│  Laravel API  │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│     MySQL     │
└───────────────┘
```

## **Licença**

Este projeto está sob a licença **MIT**.