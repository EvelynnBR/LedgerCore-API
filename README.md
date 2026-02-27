# LedgerCore API

**LedgerCore API**, uma aplicação backend robusta desenvolvida para gerenciamento de contas, transações e perfis de usuários, com foco em segurança e performance.

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias e bibliotecas:

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)

</div>

### Principais Dependências

- **Express**: Framework web rápido e minimalista para Node.js.
- **Prisma**: ORM moderno para Node.js e TypeScript.
- **Zod**: Validação de esquemas TypeScript-first.
- **Bcrypt**: Biblioteca para hash de senhas.
- **JsonWebToken (JWT)**: Implementação de tokens JSON Web para autenticação segura.

---

## 🛠️ Funcionalidades

- **Autenticação e Autorização**: Sistema seguro de login com JWT e controle de acesso baseado em cargos (RBAC - Role Based Access Control).
- **Gerenciamento de Usuários**: Criação e visualização de perfis.
- **Transações Financeiras**: Registro de transações seguras.
- **Logs de Atividades**: Histórico de ações realizadas no sistema.

---

## 📡 Rotas da API

### **Usuários** (`/user`)

| Método | Rota | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Cria um novo usuário no sistema. | Público |

### **Sessão** (`/session`)

| Método | Rota | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Realiza login e gera um token JWT. | Público |

### **Perfil** (`/profile`)

| Método | Rota | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Retorna os dados do perfil do usuário autenticado. | Autenticado (Manager/Client) |

### **Transações** (`/transaction`)

| Método | Rota | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Cria uma nova transação financeira. | Autenticado (Client) |

### **Logs** (`/logs`)

| Método | Rota | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Lista os logs de atividades do sistema. | Autenticado (Manager/Client) |

---

## ⚙️ Como Executar

### Pré-requisitos

- Node.js
- PostgreSQL

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd LedgerCore-API
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` baseado no `.env-example` e configure a URL do seu banco de dados:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
   JWT_SECRET="sua_chave_secreta"
   ```

4. **Execute as migrações do banco de dados:**
   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

O servidor estará rodando em `http://localhost:3333` (ou a porta definida no seu arquivo `.env`).

---

Feito com 💜 por [Evelyn]
