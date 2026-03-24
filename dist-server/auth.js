import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
const DEFAULT_DEV_TOKEN = 'dev-admin-token';
export const auth = createMiddleware(async (c, next) => {
    const authorization = c.req.header('authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new HTTPException(401, { message: 'Missing bearer token' });
    }
    const token = authorization.slice(7).trim();
    const expectedToken = process.env.API_TOKEN ?? DEFAULT_DEV_TOKEN;
    if (token !== expectedToken) {
        throw new HTTPException(401, { message: 'Invalid token' });
    }
    c.set('user', {
        id: 'admin',
        role: 'admin',
    });
    await next();
});
//# sourceMappingURL=auth.js.map