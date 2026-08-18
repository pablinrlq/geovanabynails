# Geovanna Alves Nail Designer

Site responsivo com portfólio, agendamento online, encaminhamento para WhatsApp e painel administrativo.

## Stack

- Next.js 16 e React 19
- Neon Postgres para os agendamentos
- Deploy preparado para Vercel
- Painel administrativo protegido por senha e cookie assinado

## Configuração local

1. Instale as dependências com `npm install`.
2. Copie `.env.example` para `.env.local`.
3. Crie um projeto no Neon.
4. Execute `neon/migrations/001_create_bookings.sql` no banco Neon.
5. Preencha as variáveis de ambiente.
6. Rode `npm run dev`.

## Variáveis de ambiente

```env
ADMIN_PASSWORD=uma-senha-forte
ADMIN_SESSION_SECRET=um-segredo-longo-e-aleatorio
DATABASE_URL=postgresql://usuario:senha@host/banco?sslmode=require
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`DATABASE_URL` é exclusivamente de servidor. Nunca use o prefixo `NEXT_PUBLIC_` nela.

## Deploy na Vercel

1. Importe este repositório na Vercel.
2. Cadastre as quatro variáveis acima em **Settings → Environment Variables**.
3. Em produção, configure `NEXT_PUBLIC_SITE_URL` com a URL final do site.
4. Faça o deploy.

O painel fica disponível em `/admin`. O banco é acessado somente pelas rotas do servidor.
