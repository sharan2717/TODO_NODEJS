import express,{Application,Request,Response} from 'express'
import apiRouter from './routes/routes';
import bodyParser from 'body-parser';
const serverless = require('serverless-http');

const app:Application =express();
const port:number=3010;

app.use(bodyParser.json());

app.use("/api/todo",apiRouter)

module.exports.handler = serverless(app);