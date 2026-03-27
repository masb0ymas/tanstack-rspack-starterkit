# ---- Stage 1: Install dependencies ----
FROM oven/bun:1 AS deps

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ---- Stage 2: Build frontend & server ----
FROM oven/bun:1 AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
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

# Copy built frontend
COPY --from=builder /app/dist ./dist

# Copy built server
COPY --from=builder /app/dist-server ./dist-server

# Copy production dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env ./

EXPOSE 3000

CMD ["bun", "run", "dist-server/index.js"]
