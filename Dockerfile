# ---- Stage 1: Dependencies ----
FROM oven/bun:1 AS deps

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install -g husky
RUN bun install --frozen-lockfile --production

# ---- Stage 2: Build ----
FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN cp .env.production .env

# Build frontend (outputs to dist/)
RUN bun run build:web

# Build server (outputs to dist-server/)
RUN bun run build:server

# ---- Stage 3: Production runtime ----
FROM oven/bun:1-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built artifacts
COPY --from=builder /app/client ./client
COPY --from=builder /app/dist-server ./server

# Copy production dependencies only
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env ./

EXPOSE 3000

CMD ["bun", "run", "server/index.js"]
