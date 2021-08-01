import 'reflect-metadata';
import express, { Application } from 'express';
import { json } from 'body-parser';
import { offensiveWordRouter } from './infrastructure/routes/offensive-word.route';
import Container from 'typedi';
import { OffensiveWordRepositoryMongo } from './infrastructure/repositories/offensive-word.repository.mongo';
import './infrastructure/config/postgres';
import { authRouter } from './infrastructure/routes/auth.route';
import { UserRepositoryPostgres } from './infrastructure/repositories/user.repository.pg';
import passport from 'passport';
import passportMiddelware from './infrastructure/middlewares/pasport';
import { connectToDB as connectToOffensiveWordsDB } from './infrastructure/config/mongo';
import { connectToUsersdDB } from './infrastructure/config/postgres';
import { populateDatabase as populateUsersDatabase } from './infrastructure/config/populate';

Container.set('OffensiveWordRepository', new OffensiveWordRepositoryMongo());
Container.set('UserRepository', new UserRepositoryPostgres());

(async () => {
	await connectToOffensiveWordsDB();
	await connectToUsersdDB();
	await populateUsersDatabase();
})();

console.log('App running');

const app: Application = express();

app.use(json());
app.use(offensiveWordRouter);
app.use(authRouter);
app.use(passport.initialize());
passport.use(passportMiddelware);

export default app;