import {downloadFileFromS3} from './download-file';

const knownImgId = 'c94f561b-302b-4163-9c20-e83c51cbc48d';
const unkownImgId = '1234';

describe('downloadFileFromS3 tests', () => {
	it('Should complete without errors', async () => {
		const res = await downloadFileFromS3(knownImgId);
		expect(res.$metadata.httpStatusCode).toBe(200);
	});
	it('Should complete without errors', async () => {
		await expect(downloadFileFromS3(unkownImgId)).rejects.toThrow();
	});
});