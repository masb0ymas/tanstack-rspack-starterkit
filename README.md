# TanStack Rspack Starter Kit

A modern full-stack web application starter kit built with **TanStack Router**, **Rspack**, **Hono**, and **Better Auth**. This project provides a production-ready foundation with authentication, routing, and a beautiful UI powered by shadcn/ui.

## Tech Stack

### Frontend

- **[Rsbuild](https://rsbuild.rs)** - Fast Rspack-based build tool
- **[TanStack Router](https://tanstack.com/router)** - Type-safe routing with auto code-splitting
- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization
- **[TanStack Table](https://tanstack.com/table)** - Headless table utilities
- **[TanStack Form](https://tanstack.com/form)** - Type-safe form management
- **[React 19](https://react.dev)** - Latest React with concurrent features
- **[shadcn/ui](https://ui.shadcn.com)** - Beautiful, accessible UI components
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev)** - Beautiful icon library

### Backend

- **[Hono](https://hono.dev)** - Ultrafast web framework
- **[Better Auth](https://www.better-auth.com)** - Modern authentication solution
- **[@hono/node-server](https://hono.dev/docs/getting-started/nodejs)** - Node.js adapter for Hono

### Development Tools

- **[Bun](https://bun.sh)** - Fast JavaScript runtime and package manager
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript
- **[ESLint](https://eslint.org)** - Code linting
- **[Prettier](https://prettier.io)** - Code formatting
- **[Rstest](https://rstest.rs)** - Testing framework
- **[Husky](https://typicode.github.io/husky)** - Git hooks

## Features

- ✅ **Full-stack TypeScript** - End-to-end type safety
- ✅ **Authentication** - Email/password and Google OAuth via Better Auth
- ✅ **Protected Routes** - Route-based authentication guards
- ✅ **Modern UI** - shadcn/ui components with dark mode support
- ✅ **File-based Routing** - Automatic route generation with TanStack Router
- ✅ **API Proxy** - Development proxy from frontend to backend
- ✅ **Docker Support** - Multi-stage production Dockerfile
- ✅ **Testing Setup** - Configured with Rstest and Testing Library
- ✅ **Code Quality** - ESLint, Prettier, and Git hooks
- ✅ **Environment Variables** - Type-safe env validation with @t3-oss/env-core

## Project Structure

```
├── src/                    # Frontend source code
│   ├── routes/            # File-based routes
│   │   ├── (public)/     # Public routes (auth, landing)
│   │   └── (protected)/  # Protected routes (dashboard)
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── layout/       # Layout components
│   │   └── block/        # Feature blocks
│   ├── lib/              # Utilities and providers
│   └── styles/           # Global styles
├── server/                # Backend source code
│   ├── routes/           # API routes
│   ├── middleware/       # Hono middleware
│   ├── lib/              # Server utilities
│   └── config/           # Server configuration
├── tests/                 # Test files
└── public/               # Static assets
```

## Setup

### Prerequisites

- [Bun](https://bun.sh) v1.0 or higher
- Node.js v18 or higher (for compatibility)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Copy environment variables:

```bash
cp .env.example .env
```

4. Configure your `.env` file with required values:
   - `BETTER_AUTH_SECRET` - Generate a secure random string
   - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - For Google OAuth (optional)

## Development

Start both frontend and backend dev servers concurrently:

```bash
bun run dev
```

This will start:

- Frontend dev server at [http://localhost:3000](http://localhost:3000)
- Backend API server at [http://localhost:8080](http://localhost:8080)

### Individual Commands

```bash
bun run dev:web        # Start frontend only
bun run dev:server     # Start backend only
```

## Building for Production

Build both frontend and backend:

```bash
bun run build
```

This creates:

- `client/` - Production frontend build
- `dist-server/` - Compiled backend code

### Standalone Server

Run the production build:

```bash
bun run serve:standalone
```

## Code Quality

### Linting

```bash
bun run lint           # Run ESLint with auto-fix
```

### Formatting

```bash
bun run format         # Format code with Prettier
```

### Check All

```bash
bun run check          # Run both format and lint
```

## Testing

```bash
bun run test           # Run tests once
bun run test:watch     # Run tests in watch mode
```

## Docker Deployment

Build and run with Docker:

You need to adjust the `.env` for production with Docker:

```bash
PORT=3000

BETTER_AUTH_URL=https://your-domain.com

CLIENT_URL=https://your-domain.com
```

And then run this:

```bash
docker build -t tanstack-rspack-app .
docker run -p 3000:3000 tanstack-rspack-app
```

The Dockerfile uses multi-stage builds for optimized production images.

## Learn More

### Documentation

- [Rsbuild](https://rsbuild.rs) - Build tool documentation
- [Rspack](https://rspack.rs) - Bundler documentation
- [TanStack Router](https://tanstack.com/router) - Routing documentation
- [Hono](https://hono.dev/docs) - Backend framework documentation
- [Better Auth](https://www.better-auth.com) - Authentication documentation
- [shadcn/ui](https://ui.shadcn.com) - UI components documentation

### Resources

- [Rsbuild GitHub](https://github.com/web-infra-dev/rsbuild)
- [TanStack GitHub](https://github.com/TanStack)
- [Hono GitHub](https://github.com/honojs/hono)

## License

MIT
