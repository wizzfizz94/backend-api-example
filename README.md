# Authentication
Authentication was done using basic auth. In production I would move towards JWT or something more secure but the outline asked for the base minimum solution so I used basic auth.

# Image upload
Uses a direct file upload using multipart/form-data. Where the image data is attached to the `files` key.
This endpoint can also handle mulitple files being uploaded. The uploaded files are parsed by the koa server and then uploaded to a cloud S3 bucket.

