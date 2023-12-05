import {uploadFileToS3} from './upload-file';
import * as path from 'path';

describe('uploadFilesToS3 tests', () => {
	it('Should complete without errors', async () => {
		expect(async () => uploadFileToS3({
			filepath: path.resolve(__dirname, '../../test-image.png'),
			originalFilename: 'test-image.png',
		})).not.toThrow();
	});
});
