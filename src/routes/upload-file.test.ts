import {uploadFileToS3} from './upload-file';
import * as path from 'path';
import client from '../client';

jest.mock('../client');
const mockedClient = client as jest.Mocked<typeof client>
mockedClient.send.mockImplementation(() => Promise.resolve({$metadata: {httpStatusCode: 200}}))

describe('uploadFilesToS3 tests', () => {
	it('Should complete without errors', async () => {
		const res = await uploadFileToS3({
			filepath: path.resolve(__dirname, '../../test-image.png'),
			originalFilename: 'test-image.png',
		});
		expect(res.$metadata.httpStatusCode).toBe(200);
	});
	it('Should throw error when using unknown file path', async () => {
		await expect(uploadFileToS3({
			filepath: path.resolve(__dirname, '../../unknown/file/path'),
			originalFilename: 'test-image.png',
		})).rejects.toThrow();
	});
});
