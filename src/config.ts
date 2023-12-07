import 'dotenv/config';

const config = {
	username: process.env.USERNAME,
	password: process.env.PASSWORD,
	bucketName: process.env.BUCKET_NAME,
	s3Config: {
		region: 'ap-southeast-2',
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
		},
	},
};

export default config;
