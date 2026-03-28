#!/bin/bash
set -e

# Install dependencies (including devDependencies needed for build)
bun install --frozen-lockfile

# Build the project
bun run build:web
bun run build:server

# Create .output directory
mkdir -p .output

# Copy dist files to .output
cp -r client/ .output/client/
cp -r dist-server/ .output/server/
cp package.json .output/
cp .env.production .output/.env

# Install production dependencies only in .output directory
cd .output
bun install --frozen-lockfile --production

# Start the server
bun run server/index.js
