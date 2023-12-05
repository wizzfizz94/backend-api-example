import {type Context, type Middleware} from 'koa';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {type File} from 'formidable';
import {createReadStream} from 'fs';
import {NotFound} from 'http-errors';

const client = new S3Client({});

export const uploadFile: Middleware
= async (ctx: Context) => {
	if (ctx.request.files?.file) {
		const file: File = Array.isArray(ctx.request.files.file)
			? ctx.request.files.file[0]
			: ctx.request.files.file;

		await uploadFileToS3({
			filepath: file.filepath,
			originalFilename: file.originalFilename ? file.originalFilename : 'unkown',
		});

		return ctx.body = 'Image uploaded successfully';
	}

	throw new NotFound('File not found');
};

export async function uploadFileToS3(file: {filepath: string; originalFilename: string}) {
	const body = createReadStream(file.filepath);

	const command = new PutObjectCommand({
		Bucket: 'backend-challenge-image-uploads',
		Key: `${Date.now().toString()}-${file.originalFilename}`,
		Body: body,
	});

	await client.send(command);
}
