# PERN Stack Template

A full-stack TypeScript template using React, Express, and PostgreSQL. Structured for real-world patterns: feature-based server organization, raw SQL via `node-postgres`, structured logging with Pino, and schema migrations with `node-pg-migrate`.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Backend | Node.js + Express 5 |
| Language | TypeScript (strict, ESM throughout) |
| Database | PostgreSQL — raw SQL via `node-postgres` |
| Migrations | `node-pg-migrate` |
| Logging | Pino + pino-http |
| Package Manager | pnpm workspaces |
| Dev Runtime | tsx (ESM-native TypeScript execution) |

---

## Project Structure

```
vite-fullstack-template/
├── packages/
│   ├── client/                    # React + Vite frontend
│   └── server/                    # Express backend
│       └── src/
│           ├── features/          # Feature-based modules
│           │   ├── posts/         # posts.controller, .routes, .service, .test
│           │   ├── users/         # users.controller, .routes, .service, .test
│           │   └── health/        # health.controller, .routes, .service, .test
│           ├── db/
│           │   ├── index.ts       # pg.Pool (private) + query/getClient/end exports
│           │   ├── types.ts       # TypeScript interfaces for DB entities
│           │   ├── seed.ts        # Dev data seed script
│           │   ├── migrations/    # node-pg-migrate SQL migration files
│           │   └── repositories/  # Raw SQL per domain (posts, users)
│           ├── lib/
│           │   ├── appError.ts    # createAppError factory + ERROR_CODE
│           │   ├── asyncHandler.ts
│           │   └── logger.ts      # Pino singleton
│           ├── middleware/
│           │   └── error.middleware.ts
│           ├── app.ts
│           └── index.ts
├── docker-compose.yml
├── pnpm-workspace.yaml
└── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/installation) v9+
- [Docker](https://www.docker.com/) (for local Postgres) — or a [Neon](https://neon.tech) account for a cloud DB

Install pnpm if you don't have it:

```bash
npm install -g pnpm
```

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

```bash
cp packages/server/.env.sample packages/server/.env
```

The default `.env` is pre-configured for the local Docker database — no edits needed if you're running locally. For Neon, replace `DATABASE_URL` with your connection string.

```env
PORT=5001
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/local_db
```

### 3. Start the database

**Local (Docker):**

```bash
pnpm db:up
```

This starts a Postgres container using the credentials in `docker-compose.yml`. Data is persisted in a Docker volume between restarts.

**Neon (cloud):**

Skip this step. Set `DATABASE_URL` in your `.env` to your Neon connection string — the standard `pg` driver connects to Neon without any extra configuration.

### 4. Run migrations

```bash
pnpm db:migrate
```

Runs all pending migration files from `packages/server/src/db/migrations/` in order. Creates tables from scratch on a fresh database. `node-pg-migrate` tracks which migrations have run in a `pgmigrations` table.

### 5. Seed the database

```bash
pnpm db:seed
```

Populates the database with development data (users and posts).

### 6. Start the dev server

```bash
pnpm dev
```

Starts both the frontend and backend concurrently:

- **Frontend:** `http://localhost:5173`
- **Backend:** `http://localhost:5001`
- **Health check:** `http://localhost:5001/api/health`

The Vite dev server proxies all `/api/*` requests to the Express backend — no CORS configuration needed.

---

## Database Commands

All database scripts are run from the root of the project with pnpm:

| Command | Description |
|---|---|
| `pnpm db:up` | Start local Postgres container |
| `pnpm db:down` | Stop and remove local Postgres container |
| `pnpm db:migrate` | Run all pending migrations |
| `pnpm db:migrate:create <name>` | Generate a new migration file |
| `pnpm db:migrate:down` | Roll back the most recent migration |
| `pnpm db:seed` | Seed the database with dev data |
| `pnpm db:reset` | Run migrations + seed (full rebuild) |

### Fresh database reset

To nuke the database and start clean — useful during development or when onboarding:

```bash
pnpm db:down && pnpm db:up && pnpm db:reset
```

### Adding a migration

When the schema needs to change, generate a new migration file:

```bash
pnpm db:migrate:create add-tags-to-posts
```

This creates a timestamped file in `packages/server/src/db/migrations/`. Fill in `up` (apply) and `down` (rollback), then run `pnpm db:migrate`.

---

## Root Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start client + server concurrently |
| `pnpm build` | Build client + server for production |
| `pnpm test` | Run all tests (client + server) |
| `pnpm tsc` | Type-check client + server |
| `pnpm lint` | Lint the entire project |
| `pnpm format` | Format with Prettier |

---

## Architecture

### Feature-based structure

Server code is organized by domain rather than by layer. Everything related to `posts` lives in `features/posts/` — controller, routes, service, and tests together. Adding a new feature means adding a new folder; deleting one means deleting a folder.

### Raw SQL with the repository pattern

Queries are written in plain SQL using parameterized `$1, $2` syntax. No ORM. Each domain has a repository file (`db/repositories/posts.repository.ts`) that owns all SQL for that entity. Services call repositories; repositories call the pool via the `query()` helper in `db/index.ts`.

The `db/index.ts` module keeps the `pg.Pool` private and exposes three functions:

```ts
query(text, params)   // for standard queries
getClient()           // for transactions
end()                 // for graceful shutdown in scripts
```

This gives a single place to add cross-cutting concerns — slow query logging, metrics, tracing — without touching individual repositories.

### Error handling

Intentional errors (not found, validation, conflict) are created with `createAppError(ERROR_CODE.X, message)` from `lib/appError.ts`. All route handlers are wrapped with `asyncHandler` which forwards unhandled promise rejections to the Express error middleware via `next(err)`. Controllers contain no try/catch blocks.

### Structured logging

Pino is used for all server logging. Every HTTP request is logged by `pino-http` middleware. Slow database queries (> 500ms) emit a `warn`-level log with the query text and duration. Parameters are never logged.

Log output is pretty-printed in development (`NODE_ENV !== 'production'`) and emits newline-delimited JSON in production.

---

## Testing

```bash
# All tests
pnpm test

# Server tests only (watch mode)
pnpm --filter server test:watch
```

Tests use Vitest with Supertest for HTTP integration tests.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Postgres connection string |
| `PORT` | No | Server port (default: `5001`) |
| `NODE_ENV` | No | `development` or `production` |
| `LOG_LEVEL` | No | Pino log level (default: `info`) |
