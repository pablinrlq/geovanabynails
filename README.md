# Geovanna Alves Nail Designer

Site responsivo com portfólio, agendamento online, encaminhamento para WhatsApp e painel administrativo.

## Stack

- Next.js 16 e React 19
- Supabase Postgres para os agendamentos
- Deploy preparado para Vercel
- Painel administrativo protegido por senha e cookie assinado

## Configuração local

1. Instale as dependências com `npm install`.
2. Copie `.env.example` para `.env.local`.
3. Crie um projeto no Supabase.
4. Execute `supabase/migrations/001_create_bookings.sql` no SQL Editor do Supabase.
5. Preencha as variáveis de ambiente.
6. Rode `npm run dev`.

## Variáveis de ambiente

```env
ADMIN_PASSWORD=uma-senha-forte
ADMIN_SESSION_SECRET=um-segredo-longo-e-aleatorio
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`SUPABASE_SERVICE_ROLE_KEY` é exclusivamente de servidor. Nunca use o prefixo `NEXT_PUBLIC_` nela.

## Deploy na Vercel

1. Importe este repositório na Vercel.
2. Cadastre as cinco variáveis acima em **Settings → Environment Variables**.
3. Em produção, configure `NEXT_PUBLIC_SITE_URL` com a URL final do site.
4. Faça o deploy.

O painel fica disponível em `/admin`. A tabela usa RLS sem políticas públicas; os acessos ao banco passam somente pelas rotas protegidas do servidor.
