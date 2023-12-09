import {type Context, type Middleware} from 'koa';
import {ListObjectsV2Command} from '@aws-sdk/client-s3';
import client from '../client';
import config from '../config';
import {InternalServerError} from 'http-errors';

export const listFiles: Middleware
= async (ctx: Context) => {
	const imageIds = await listFilesFromS3();
	return ctx.body = imageIds;
};

export async function listFilesFromS3(): Promise<string[]> {
	const command = new ListObjectsV2Command({
		Bucket: config.bucketName,
	});

	const imageIds: string[] = [];

	try {
		let isTruncated = true;
		while (isTruncated) {
			const {Contents, IsTruncated, NextContinuationToken} = await client.send(command);
			Contents?.forEach(x => imageIds.push(x.Key ?? ''));
			isTruncated = Boolean(IsTruncated);
			command.input.ContinuationToken = NextContinuationToken;
		}
	} catch (err) {
		console.error(err);
		throw new InternalServerError();
	}

	return imageIds;
}
