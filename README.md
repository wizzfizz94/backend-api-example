# Prerequisites
`docker`
`docker-compose`
`aws account`

# Setup
1. create a S3 bucket using AWS console
2. create a AWS IAM policy for the bucket, assign Get Put and List permissions for the bucket *and* its contents made in step 1 (see `sample-iam-policy.json` for exact config, replace `bucket-name` with your buckets name)
3. create a AWS user and assign the IAM policy in step 2 to them.
4. Generate access keys for the user and place the access key id, access key, bucket name and aws region in the `.env` file of the project. `sample.env` shows the naming convention needed for these variables
5. Generate a JWT secret and place it in the .env file (see `sample.env` for naming convention)

# Build and Run Server
`docker-compose up`

# Run Tests
`docker-compose run web npm test`

Note: Running tests and server using docker-compose done to ensure system environment is always constant.

# Data Storage
For data storage I decided to use AWS S3 as a NoSQL database. I wanted to create a solution using serverless technology. S3 provided a simple data storage solution for image downloading and uploading.

# Authentication
Authentication originally done using basic auth and then changed to JWT for increased security.

The jwt secret is stored in the `.env` file which git ignores.

S3 access ID and key are also stored in the `.env` file. I created a user and a IAM policy that only allows Put List and Get commands on the s3 bucket. The bucket name is also defined there. 

# Image Upload
POST request to the `/images` endpoint. Uses a direct file upload using multipart/form-data. Where the image is attached to the `file` form key. Originally I built the endpoint to handle multiple files (see history) but I simplified it to only handle a single file as this was more concise error handling.

The uploaded file is parsed by the koa-body middleware and then uploaded to a cloud S3 bucket. This functionality has been isolated to the `uploadFileToS3` function so other data storage solutions could be implemented in the future.

Images are stored as objects with the key being a UUID, allowing the solution to store and index any image. The image name is stored in the metadata feild so it can be recovered when a request to download the image is made.

Error handling handles when the database is unreachable. The route responds with an internal server error in this situation. In the future I would expand on this depending on the context.

# Image Download
GET request to the `/images/:id` endpoint. Where the id is the UUID of the image.

The id in the request params is parsed to the `downloadFileFromS3` function which makes a request to the S3 bucket for the image with this UUID. The response in sent as an attachment using the orignal filename. This isolated function also allows the solution to be modified for differrent storage solutions.

Error handling handles when the database is unreachable or when the image cannot be found. When the image is not found in the S3 a 404 not found resposne is sent. Otherwise a 500 internal server error is returns. This could be expanded on depending on the context of the solution.

# List Files
GET request to `/images` endpoint will return a list of image id's. This can be used by a client to select an image to download by id.

`listFilesFromS3` returns an array of uuids that are sent in the response. Again, isolated to a separate fucntion so alternative storage solutions can be added.

A 500 error is passed to the client when an issue with s3 connection occurs.

# Testing
Unit testing is done with ts-jest and jest.

The unit test for uploadFileToS3 passes as long as an error is not thrown by the function. It uses a test image place at the project root. I ran `git update-index --assume-unchanged test-image.png` so git won't diff this image.

For functional testing I would have used [supertest](https://github.com/ladjs/supertest) and ts-jest to test the API and placed the test cases in `src/index.test.ts`.