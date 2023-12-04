import {type Middleware} from 'koa';
import {Unauthorized} from 'http-errors';
import * as basicAuth from 'basic-auth';

const username = 'guest';
const password = 'password';

export const auth: Middleware
= async (ctx, next) => {
	const user = basicAuth(ctx.req);

	if (user && user.name === username && user.pass === password) {
		return next();
	}

	throw new Unauthorized();
};
