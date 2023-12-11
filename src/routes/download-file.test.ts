import {expect, jest, test} from '@jest/globals';
import {downloadFileFromS3} from './download-file';
import client from '../client';

const knownImgId = 'c94f561b-302b-4163-9c20-e83c51cbc48d';
const unknownImgId = '1234';

jest.mock('../client');
const mockedClient = client as jest.Mocked<typeof client>

describe('downloadFileFromS3 tests', () => {
	test('Should return a 200 response', async () => {
		mockedClient.send.mockImplementation(() => Promise.resolve({$metadata: {httpStatusCode: 200}}))
		const res = await downloadFileFromS3(knownImgId);
		expect(res.$metadata.httpStatusCode).toBe(200);
	});
	test('Should throw an error when using unknown image id', async () => {
		mockedClient.send.mockImplementation(() => Promise.reject(new Error('Not found')))
		await expect(downloadFileFromS3(unknownImgId)).rejects.toThrow();
	});
});
