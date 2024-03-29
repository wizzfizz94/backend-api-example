import 'dotenv/config';

const config = {
	jwtSecret: process.env.JWT_SECRET ?? '',
	bucketName: process.env.BUCKET_NAME,
	s3Config: {
		region: process.env.AWS_REGION,
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
		},
	},
};

export default config;
