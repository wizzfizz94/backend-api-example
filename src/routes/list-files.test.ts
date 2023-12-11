import {listFilesFromS3} from './list-files';
import client from '../client';

jest.mock('../client');
const mockedClient = client as jest.Mocked<typeof client>
mockedClient.send.mockImplementation(() => Promise.resolve({Contents: [{Key: "fake-key"}]}))

describe('listFilesFromS3 tests', () => {
	it('Should return an array', async () => {
		const imageIds = await listFilesFromS3();
		expect(imageIds).toBeInstanceOf(Array);
	});
});
