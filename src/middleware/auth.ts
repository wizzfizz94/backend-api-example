import {Middleware} from "koa";
import {Unauthorized} from "http-errors";

export const auth: Middleware =
    async (ctx, next) => {
        // Put a basic auth solution here
        throw new Unauthorized();
    };