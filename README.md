<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

### 📌 **Plano de Ação para o Teste Técnico Backend**

Você precisa desenvolver uma **API RESTful** usando **NestJS** com **Node.js e TypeScript**, e lidar com **PostgreSQL**, **MongoDB** e **RabbitMQ**. Aqui está um plano detalhado para guiar seu desenvolvimento.

---

## 🚀 **1. Configuração do Ambiente**
Antes de iniciar o código, configure o ambiente:

### 📌 **Instalação do NestJS**
1. Instale o CLI do NestJS:
   ```sh
   npm i -g @nestjs/cli
   ```
2. Crie um novo projeto NestJS:
   ```sh
   nest new backend-pedidos
   ```
    - Escolha **npm** ou **yarn**.

3. Entre no diretório do projeto:
   ```sh
   cd backend-pedidos
   ```

4. Instale as dependências:
   ```sh
   npm install
   ```

### 📌 **Configuração do Banco de Dados**
1. **PostgreSQL** (para armazenar os pedidos):
   ```sh
   npm install @nestjs/typeorm typeorm pg
   ```
    - Configurar **TypeORM** no `app.module.ts`.

2. **MongoDB** (para logs e histórico dos pedidos):
   ```sh
   npm install @nestjs/mongoose mongoose
   ```
    - Configurar **Mongoose** no `app.module.ts`.

### 📌 **Configuração do RabbitMQ**
1. Instalar o cliente:
   ```sh
   npm install amqplib
   ```
2. Criar um serviço de mensagens para lidar com filas.

---

## 🔧 **2. Estrutura do Projeto**
Divida seu código de forma organizada:

```
backend-pedidos/
│── src/
│   ├── pedidos/        # Módulo para pedidos
│   │   ├── pedidos.module.ts
│   │   ├── pedidos.controller.ts
│   │   ├── pedidos.service.ts
│   │   ├── pedidos.entity.ts
│   │   ├── pedidos.repository.ts
│   ├── processamento/  # Módulo para fila de pedidos (RabbitMQ)
│   ├── logs/           # Módulo para histórico/logs no MongoDB
│   ├── database/       # Configuração de bancos de dados
│   ├── app.module.ts
│   ├── main.ts
│── docker-compose.yml  # Configuração de Docker
│── README.md
│── package.json
```

---

## 🎯 **3. Implementação dos Endpoints**
### **📌 Criar módulo de pedidos**
```sh
nest generate module pedidos
nest generate controller pedidos
nest generate service pedidos
```
Criar endpoints:
- **POST /pedidos** → Criar um novo pedido
- **GET /pedidos** → Listar pedidos
- **GET /pedidos/:id** → Detalhar um pedido

### **📌 Criar sistema de processamento assíncrono (RabbitMQ)**
- Criar módulo para consumir mensagens da fila.
- Criar worker para processar pedidos e salvar histórico no MongoDB.

### **📌 Criar módulo de logs**
- **MongoDB** armazenará eventos do processamento dos pedidos.

---

## 🐳 **4. Configuração do Docker**
Criar um **docker-compose.yml** para subir PostgreSQL, MongoDB e RabbitMQ juntos.

```yaml
version: '3'
services:
  postgres:
    image: postgres
    container_name: postgres_db
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: pedidos
    ports:
      - "5432:5432"

  mongodb:
    image: mongo
    container_name: mongo_db
    ports:
      - "27017:27017"

  rabbitmq:
    image: "rabbitmq:3-management"
    container_name: rabbitmq
    ports:
      - "5672:5672"
      - "15672:15672"
```

Subir os serviços:
```sh
docker-compose up -d
```

---

## ✅ **5. Testes e Documentação**
- **Testes Automatizados:** Implementar testes unitários e de integração usando Jest.
- **Swagger:** Documentar a API com Swagger (`@nestjs/swagger`).
- **README:** Explicar como rodar a aplicação.

---

## 🚀 **6. (Opcional) Criar um Frontend**
Se quiser desenvolver uma interface, use **React ou Angular** para listar e criar pedidos.

---
