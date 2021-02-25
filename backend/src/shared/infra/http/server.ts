import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';
import 'express-async-errors';

import '@shared/infra/typeorm'; // DB config
import '@shared/container'; // DI config

import routes from './routes'; // Routes
import errors from '../../errors'; // Error interceptor

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
