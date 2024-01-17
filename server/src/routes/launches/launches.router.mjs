import express from "express";
import {httpGetAllLaunches, httpPostNewLaunch, httpDeleteLaunch} from "./lauches.controller.mjs";

const lauchesRouter = express.Router();

lauchesRouter.get('/', httpGetAllLaunches);
lauchesRouter.post('/', httpPostNewLaunch);
lauchesRouter.delete('/:id', httpDeleteLaunch);

export {
    lauchesRouter
}
