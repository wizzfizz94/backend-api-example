import { Context, Middleware } from "koa";

export const uploadFile: Middleware =
  async (ctx: Context) => {
    if (ctx.request.files) {
      console.log(ctx.request.files.file);
      // upload file to s3
    }
  }