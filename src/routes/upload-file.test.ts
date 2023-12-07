import {uploadFileToS3} from './upload-file';
import * as path from 'path';

describe('uploadFilesToS3 tests', () => {
	it('Should complete without errors', async () => {
		const res = await uploadFileToS3({
			filepath: path.resolve(__dirname, '../../test-image.png'),
			originalFilename: 'test-image.png',
		});
		expect(res.$metadata.httpStatusCode).toBe(200);
	});
	it('Should throw error when using unkown file path', async () => {
		await expect(uploadFileToS3({
			filepath: path.resolve(__dirname, '../../unknow/file/path'),
			originalFilename: 'test-image.png',
		})).rejects.toThrow();
	});
});
