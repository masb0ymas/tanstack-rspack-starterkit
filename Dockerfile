# ---- Stage 1: Install dependencies ----
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

# ---- Stage 2: Build frontend & server ----
FROM oven/bun:1 AS prepare

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install -g husky
RUN bun install --frozen-lockfile --production

# ---- Stage 3: Production runtime ----
FROM oven/bun:1-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built frontend
COPY --from=builder /app/dist ./dist

# Copy built server
COPY --from=builder /app/dist-server ./dist-server

# Copy production dependencies
COPY --from=prepare /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env ./

EXPOSE 3000

CMD ["bun", "run", "dist-server/index.js"]
