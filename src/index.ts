import * as Koa from 'koa';
import * as Router from '@koa/router';
import {uploadFile} from './routes/upload-file';
import {koaBody} from 'koa-body';
import * as jwt from 'koa-jwt';
import {downloadFile} from './routes/download-file';
import config from './config';

const PORT = 3000;
const app = new Koa();
const imageRouter = new Router();

imageRouter
	.prefix('/images')
	.post('/', uploadFile)
	.get('/:id', downloadFile);

app
	.use(jwt({secret: config.jwtSecret}))
	.use(koaBody({multipart: true}))
	.use(imageRouter.routes())
	.listen(PORT, () => {
		console.info(`Listing on port ${PORT}`);
	});
