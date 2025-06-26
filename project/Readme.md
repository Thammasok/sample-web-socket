# Sample Web Socket

this is a sample web socket application that allows users to chat with each other.

## Setup

### Database

start docker container:

```bash
docker-compose up -d
```

download and install mongo compose link here: [MongoDB Compass](https://www.mongodb.com/try/download/compass)

connect to the database:

```text
mongodb://admin:password@localhost:27017?authSource=admin
```

create the database:

```text
chat_db
```

---

## Service

navigate to the service folder:

```bash
cd service
```

install dependencies:

```bash
pnpm install
```

create an `.env` file with the following:

```bash
cp .env.example .env
```

---

## Client (Chat-app)

navigate to the client folder:

```bash
cd client
```

install dependencies:

```bash
pnpm install
```

create an `.env` file with the following:

```bash
cp .env.example .env
```
