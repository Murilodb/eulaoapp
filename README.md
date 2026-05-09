# Sentobar | Console Master de Barbearia

**Sentobar** é uma plataforma micro-SaaS profissional e multi-tenant (multi-empresa), projetada especificamente para o mercado de barbearias de alto padrão. Combina agendamento de precisão, gestão de clientes e notificações automatizadas via WhatsApp para oferecer uma experiência premium tanto para os donos de barbearia quanto para seus clientes.

---

## 🚀 Visão Geral

A plataforma foi construída com uma arquitetura **Multi-tenant**, onde cada barbearia opera em um ambiente seguro e isolado. A linguagem de design é **"Modern Noir"**—enfatizando precisão, estilo e luxo através de uma estética minimalista disciplinada.

---

## 💻 Frontend (Next.js + React + Tailwind)

O frontend utiliza **Next.js 15+** com **App Router**, utilizando um sistema de design personalizado inspirado em lounges de barbearia de luxo.

### Páginas Principais
- **Login (`/login`):** Ponto de entrada cinemático e de alto contraste.
- **Painel/Dashboard (`/dashboard`):** Visão geral em tempo real com analíticos de receita e equipe.
- **Agenda (`/calendar`):** O motor do app—uma grade interativa de alta precisão para gerenciar horários semanais.
- **Serviços (`/services`):** Interface de gestão de menu, preços e durações.
- **Clientes (`/clients`):** Diretório CRM com histórico de visitas e status de fidelidade.
- **Agendamento Público (`/book`):** Experiência de reserva passo a passo focada no cliente.
- **Configurações (`/settings`):** Regras operacionais, janelas de cancelamento e perfis da loja.

---

## ⚙️ Backend (Prisma + API Routes)

O backend é integrado ao Next.js através de **API Routes**, garantindo uma comunicação rápida e tipada.

### Arquitetura
- **ORM:** Prisma para consultas ao banco de dados e migrações seguras.
- **Validação:** **Zod** para validação de esquemas em todas as entradas de API.
- **Autenticação:** **NextAuth.js** (configurado para JWT e credenciais).
- **Banco de Dados:** PostgreSQL (Recomendado).

---

## 🛠️ Guia de Desenvolvimento e Testes

Siga este guia para configurar seu ambiente local e testar todas as funcionalidades.

### 1. Configuração do Ambiente
Crie um arquivo `.env` na raiz do projeto (use o `.env.example` como base):
```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO"
NEXTAUTH_SECRET="um-segredo-muito-forte"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Preparação do Banco de Dados (Docker)
Para facilitar o desenvolvimento, você pode subir o banco de dados usando o Docker:

```bash
docker-compose up -d
```

Com o banco de dados rodando, execute as migrations do Prisma para criar as tabelas:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 3. Rodando o Projeto
```bash
npm install
npm run dev
```
O app estará disponível em `http://localhost:3000`.

### 4. Como Testar as Funcionalidades

#### Fluxo de Administrador:
1. **Login:** Acesse `/login`. Como o banco está vazio, você precisará criar um usuário via script ou manualmente no banco para o primeiro acesso.
2. **Dashboard:** Após logar, verifique se os cards de receita e equipe carregam corretamente.
3. **Gestão de Serviços:** Vá em `/services` e tente adicionar um novo serviço. Verifique a API em `POST /api/services`.
4. **Agenda:** Acesse `/calendar` para visualizar os agendamentos existentes.

#### Fluxo do Cliente (Agendamento):
1. **Reserva:** Acesse `/book`.
2. **Seleção:** Escolha um serviço e avance para as informações pessoais.
3. **Data/Hora:** Selecione um dia no calendário e um horário disponível.
4. **Confirmação:** Clique em "Confirmar Agendamento". O sistema verificará automaticamente conflitos de horário via API.

#### Teste de API (Endpoints):
Você pode testar os endpoints usando ferramentas como Postman ou Insomnia:
- `GET /api/services`: Lista todos os serviços disponíveis.
- `GET /api/appointments`: Lista agendamentos (filtro por `barberId` opcional).
- `POST /api/appointments`: Cria um agendamento com validação de colisão de horários.

---

## 🛡️ Segurança e Regras de Negócio

1. **Prevenção de Colisão:** O sistema bloqueia agendamentos que se sobrepõem no mesmo barbeiro (`RN-03`).
2. **Preços em Centavos:** Todos os valores monetários são tratados como inteiros (centavos) para evitar erros de arredondamento.
3. **Integridade:** Campos como `email` e `phone` são validados via Zod antes de qualquer inserção.

---

> **Filosofia de Design:** "A diferença entre um corte de cabelo e uma obra é a precisão." Esta plataforma é o conjunto de ferramentas digitais para essa obra.
