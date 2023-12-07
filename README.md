# Prerequisites
`docker`
`docker-compose`

# Run Server
`docker-compose up`

# Run Tests
`docker-compose run web npm test`

Note: Running tests and server using docker-compose done to ensure environment is always constant. 

# Authentication
Authentication was done using basic auth. In production I would move towards JWT or something more secure but the outline asked for the base minimum solution so I used basic auth.

Username and password are stored in the `.env` file which git ignores. In production these would be stored in a database such as mysql with passwords hashed for security.

S3 access ID and key are also stored in the `.env` file. I created a user and a IAM policy that only allows Put and Get commands on the s3 bucket. The bucket name is also defined here. 

# Image Upload
POST request to the `/images` endpoint. Uses a direct file upload using multipart/form-data. Where the image is attached to the `file` form key. Originally I built the endpoint to handle multiple files (see history) but I simplified it to only handle a single file as this was more concise error handling.

The uploaded file is parsed by the koa-body middleware and then uploaded to a cloud S3 bucket. This functionality has been isolated to the `uploadFileToS3` function so other data storage solutions could be implemented in the future.

Images are stored as objects with the key being a UUID, allowing the solution to store and index any image. The image name is stored in the metadata feild so it can be recovered when a request to download the image is made.

Error handling handles when the database is unreachable. The route responds with an internal server error in this situation. In the future I would expand on this depending on the context.

# Image Download
GET request to the `/images/:id` endpoint. Where the id is the UUID of the image.

The id in the request params is parsed to the `downloadFileFromS3` function which makes a request to the S3 bucket for the image with this UUID. The response in sent as an attachment using the orignal filename. This isolated function also allows the solution to be modified for differrent storage solutions.

Error handling handles when the database is unreachable or when the image cannot be found. When the image is not found in the S3 a 404 not found resposne is sent. Otherwise a 500 internal server error is returns. This could be expanded on depending on the context of the solution.

# Testing
Unit testing is done with ts-jest and jest.

The unit test for uploadFileToS3 passes as long as an error is not thrown by the function. It uses a test image place at the project root. I ran `git update-index --assume-unchanged test-image.png` so git won't diff this image.

For functional testing I would have used [supertest](https://github.com/ladjs/supertest) and ts-jest to test the API and placed the test cases in `src/index.test.ts`.

