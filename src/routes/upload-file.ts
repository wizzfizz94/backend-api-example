import { Context, Middleware } from "koa";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { File } from "formidable"

const fs = require("fs");
const client = new S3Client({});

export const uploadFile: Middleware =
  async (ctx: Context) => {
    if (ctx.request.files && ctx.request.files.files) {
      const files: File[] = Array.isArray(ctx.request.files.files) ?
        ctx.request.files.files :
        [ctx.request.files.files]

      for (const file of files) {
        const body = fs.createReadStream(file.filepath);

        const command = new PutObjectCommand({
          Bucket: "backend-challenge-image-uploads",
          Key: `${Date.now().toString()}-${file.originalFilename}`,
          Body: body
        });
      
        try {
          const res = await client.send(command);
          console.log(res);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }