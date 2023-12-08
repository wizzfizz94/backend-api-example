import {type Context, type Middleware} from 'koa';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {type File} from 'formidable';
import {createReadStream, type ReadStream} from 'fs';
import {NotFound, InternalServerError} from 'http-errors';
import {randomUUID} from 'crypto';
import config from '../config';

const client = new S3Client(config.s3Config);

export const uploadFile: Middleware
= async (ctx: Context) => {
	if (ctx.request.files?.file) {
		const file: File = Array.isArray(ctx.request.files.file)
			? ctx.request.files.file[0]
			: ctx.request.files.file;

		try {
			await uploadFileToS3({
				filepath: file.filepath,
				originalFilename: file.originalFilename ? file.originalFilename : 'unknown',
			});
		} catch (error) {
			console.error(error);
			throw new InternalServerError('Could not connect to database');
		}

		return ctx.body = 'Image uploaded successfully';
	}

	throw new NotFound('File not found');
};

export async function uploadFileToS3(file: {filepath: string; originalFilename: string}) {
	const body: ReadStream = await new Promise((f, r) => {
		const fileStream = createReadStream(file.filepath);
		fileStream.on('error', e => {
			r(e);
		});
		fileStream.on('ready', () => {
			f(fileStream);
		});
	});

	const command = new PutObjectCommand({
		Bucket: config.bucketName,
		Key: randomUUID(),
		Body: body,
		Metadata: {
			Name: `${Date.now().toString()}-${file.originalFilename}`,
		},
	});

	return client.send(command);
}
