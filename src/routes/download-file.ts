import {type Context, type Middleware} from 'koa';
import {GetObjectCommand, S3ServiceException} from '@aws-sdk/client-s3';
import {InternalServerError, NotFound} from 'http-errors';
import config from '../config';
import client from '../client';

export const downloadFile: Middleware
= async (ctx: Context) => {
	const id: string = typeof ctx.params.id === 'string' ? ctx.params.id as string : '';
	try {
		const res = await downloadFileFromS3(id);
		ctx.response.set('content-type', 'image');
		ctx.response.set('content-disposition', `attachment; filename=${res.Metadata ? res.Metadata.name : 'unknown'}`);
		ctx.body = res.Body;
	} catch (error) {
		console.error(error);
		if (error instanceof S3ServiceException && (error).$metadata.httpStatusCode === 404) {
			throw new NotFound(`Image: ${id} not found`);
		} else {
			throw new InternalServerError();
		}
	}
};

export async function downloadFileFromS3(id: string) {
	const command = new GetObjectCommand({
		Bucket: config.bucketName,
		Key: id,
	});
	return client.send(command);
}
