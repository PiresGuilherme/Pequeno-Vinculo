
import express, {json}  from "express";

const server = express();
server.use(json());

export default server;