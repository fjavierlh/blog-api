
import 'reflect-metadata';
import { connectToDB } from './infrastructure/config/mongo';
import express, { Application } from 'express';
import { json } from 'body-parser';
import { offensiveWordRouter } from './infrastructure/routes/offensive-word.route';
import Container from 'typedi';
import { OffensiveWordRepositoryMongo } from './infrastructure/repositories/offensive-word.repository.mongo';

Container.set('OffensiveWordRepository', new OffensiveWordRepositoryMongo);

connectToDB();

console.log('App running');

const app: Application = express();

app.use(json());
app.use(offensiveWordRouter);

app.listen(3000, () => {
	console.log('Server started on http://localhost:3000');
});