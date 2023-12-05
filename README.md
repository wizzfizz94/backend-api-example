# Authentication
Authentication was done using basic auth. In production I would move towards JWT or something more secure but the outline asked for the base minimum solution so I used basic auth.

# Image upload
Uses a direct file upload using multipart/form-data. Where the image is attached to the `file` form key. Originally I built the endpoint to handle multiple files (see history) but I simplified it to only handle a single file as this was more concise.

The uploaded file is parsed by the koa-body middleware and then uploaded to a cloud S3 bucket. This functionality has been isolated to the `uploadFileToS3` function so other data storage solutions could be implemented in the future.

# Testing
Unit testing is done with ts-jest and jest.

The unit test for uploadFileToS3 passes aslong as an error is not thrown by the function. It uses a test image place at the project root. I ran `git update-index --assume-unchanged test-image.png` so git won't diff this image.

For functional testing I would have used supertest to test the API.

