import * as Koa from 'koa';
// Import * as Router from '@koa/router';
import {koaBody} from 'koa-body';
import * as jwt from 'koa-jwt';
import zodRouter from 'koa-zod-router';
import config from './config';
import {uploadFileRoute} from './routes/upload-file';
import {downloadFileRoute} from './routes/download-file';
import {listFilesRoute} from './routes/list-files';

const PORT = 3000;
const app = new Koa();
// Const imageRouter = new Router();

// imageRouter
// 	.prefix('/images')
// 	.post('/', uploadFile)
// 	.get('/', listFiles)
// 	.get('/:id', downloadFile);

const imageRouter = zodRouter();
imageRouter.register(uploadFileRoute);
imageRouter.register(listFilesRoute);
imageRouter.register(downloadFileRoute);

app
	.use(jwt({secret: config.jwtSecret}))
	.use(koaBody({multipart: true}))
	.use(imageRouter.routes())
	.listen(PORT, () => {
		console.info(`Listing on port ${PORT}`);
	});
