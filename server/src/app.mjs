import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import path, {dirname} from 'path';
import {fileURLToPath} from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url))

import {planetsRouter} from "./routes/planets/planets.router.mjs";
import {lauchesRouter} from './routes/launches/launches.router.mjs';


const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/planets', planetsRouter);
app.use('/launches', lauchesRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

export {
    app
};
