import {Middleware} from "koa";
import {Unauthorized} from "http-errors";

const basicAuth = require('basic-auth');

const username: string = "guest";
const password: string = "password";

export const auth: Middleware =
    async (ctx, next) => {
        const user = basicAuth(ctx);

        if (user && user.name === username && user.pass === password) {
            return next();
        }
        
        throw new Unauthorized();
    };