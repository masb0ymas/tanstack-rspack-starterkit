#!/bin/bash
set -e

# Install dependencies (including devDependencies needed for build)
bun install --frozen-lockfile

# Build the project
bun run build:web
bun run build:server

# Create app directory
mkdir -p app

# Copy dist files to app
cp -r dist/ app/dist/
cp -r dist-server/ app/dist-server/
cp package.json app/
cp .env.production app/.env

# Install production dependencies only in app directory
cd app
bun install --frozen-lockfile --production
cd ..

# Start the server
node app/dist-server/index.js
