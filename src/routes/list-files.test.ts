import {listFilesFromS3} from './list-files';

describe('listFilesFromS3 tests', () => {
	it('Should return an array', async () => {
		const imageIds = await listFilesFromS3();
		expect(imageIds).toBeInstanceOf(Array);
	});
});
