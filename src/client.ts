import {S3Client} from '@aws-sdk/client-s3';
import config from './config';

const client = new S3Client(config.s3Config);

export default client;
