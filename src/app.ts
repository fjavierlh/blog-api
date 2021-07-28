
import 'reflect-metadata';
import { connectToDB } from './infrastructure/config/mongo';
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

Container.set('OffensiveWordRepository', new OffensiveWordRepositoryMongo());
Container.set('UserRepository', new UserRepositoryPostgres());

connectToDB();

console.log('App running');

const app: Application = express();

app.use(json());
app.use(offensiveWordRouter);
app.use(authRouter);
app.use(passport.initialize());
passport.use(passportMiddelware);


export default app;