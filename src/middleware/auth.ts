import {type Middleware} from 'koa';
import {Unauthorized} from 'http-errors';
import * as basicAuth from 'basic-auth';
import config from "../config"

export const auth: Middleware
= async (ctx, next) => {
	const user = basicAuth(ctx.req);

	if (user && user.name ===config.username && user.pass ===config.password) {
		return next();
	}

	throw new Unauthorized();
};
