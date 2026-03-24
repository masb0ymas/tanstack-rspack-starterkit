import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';
import { env } from './config/env';
import { prettyLog } from './lib/colorize';
import { api } from './routes/api';
const app = new Hono();
app.use('*', logger());
app.use('/api/*', cors({
    origin: env.CLIENT_URL,
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
}));
app.get('/', (c) => {
    return c.json({
        message: 'Hello World',
        status: 'ok',
    });
});
app.get('/health', (c) => {
    return c.json({
        status: 'ok',
    });
});
app.route('/api', api);
app.notFound((c) => {
    return c.json({ message: 'Not Found' }, 404);
});
app.onError((error, c) => {
    if (error instanceof HTTPException) {
        return c.json({ message: error.message }, error.status);
    }
    if (error instanceof Error) {
        return c.json({ message: error.message }, 500);
    }
    return c.json({ message: 'Unexpected error' }, 500);
});
const port = env.SERVER_PORT;
const server = serve({ fetch: app.fetch, port }, (info) => {
    prettyLog('server', `Hono server running on http://localhost:${info.port}`);
    prettyLog('server', `Better Auth endpoint: ${env.SERVER_URL}/api/auth`);
});
let isShuttingDown = false;
const gracefulShutdown = (signal) => {
    if (isShuttingDown) {
        return;
    }
    isShuttingDown = true;
    prettyLog('server', `Received ${signal}, shutting down...`);
    server.close((error) => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        prettyLog('server', 'Server stopped');
        process.exit(0);
    });
    setTimeout(() => {
        prettyLog('server', 'Force shutdown after timeout');
        process.exit(1);
    }, 10_000).unref();
};
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
//# sourceMappingURL=index.js.map