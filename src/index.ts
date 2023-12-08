import * as Koa from 'koa';
import * as Router from '@koa/router';
import {koaBody} from 'koa-body';
import * as jwt from 'koa-jwt';
import config from './config';
import {uploadFile} from './routes/upload-file';
import {downloadFile} from './routes/download-file';
import {listFiles} from './routes/list-files';

const PORT = 3000;
const app = new Koa();
const imageRouter = new Router();

imageRouter
	.prefix('/images')
	.post('/', uploadFile)
	.get('/', listFiles)
	.get('/:id', downloadFile);

app
	.use(jwt({secret: config.jwtSecret}))
	.use(koaBody({multipart: true}))
	.use(imageRouter.routes())
	.listen(PORT, () => {
		console.info(`Listing on port ${PORT}`);
	});
