import {downloadFileFromS3} from './download-file';

const knownImgId = 'c94f561b-302b-4163-9c20-e83c51cbc48d';
const unkownImgId = '1234';

describe('downloadFileFromS3 tests', () => {
	it('Should return a 200 response', async () => {
		const res = await downloadFileFromS3(knownImgId);
		expect(res.$metadata.httpStatusCode).toBe(200);
	});
	it('Should throw an error when using unknown image id', async () => {
		await expect(downloadFileFromS3(unkownImgId)).rejects.toThrow();
	});
});
