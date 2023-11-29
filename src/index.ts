import * as Koa from "koa";
import * as Router from "@koa/router";
import {uploadFile} from "./routes/upload-file";
import {auth} from "./middleware/auth";

const PORT = 3000;

const app = new Koa();

const imageRouter = new Router();

// Put other routes here
imageRouter
    .prefix("/images")
    .post("/", uploadFile)


app
    .use(auth)
    .use(imageRouter.routes())
    .listen(PORT, () => console.info(`Listing on port ${PORT}`))