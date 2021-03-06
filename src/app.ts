
import { config } from 'dotenv';
config();

import 'reflect-metadata';
import Container from 'typedi';
import express, { Application } from 'express';
import { json } from 'body-parser';
import passport from 'passport';

import './infrastructure/config/postgres';
import { offensiveWordRouter } from './infrastructure/routes/offensive-word.route';
import { OffensiveWordRepositoryMongo } from './infrastructure/repositories/offensive-word.repository.mongo';
import { authRouter } from './infrastructure/routes/auth.route';
import { UserRepositoryPostgres } from './infrastructure/repositories/user.repository.pg';
import { AuthorRepositoryMongo } from './infrastructure/repositories/author.repository.mongo';
import passportMiddelware from './infrastructure/middlewares/pasport';
import expressPinoLogger from 'express-pino-logger';
import { logger } from './infrastructure/config/logger';
import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import { PostRepositoryMongo } from './infrastructure/repositories/post.repository.mongo';
import { postsRouter } from './infrastructure/routes/post.route';

Container.set('OffensiveWordRepository', new OffensiveWordRepositoryMongo());
Container.set('UserRepository', new UserRepositoryPostgres());
Container.set('AuthorRepository', new AuthorRepositoryMongo());
Container.set('PostRepository', new PostRepositoryMongo());

console.log('App running');

const app: Application = express();

app.use(json());
app.use(expressPinoLogger(logger));
app.use(offensiveWordRouter);
app.use(authRouter);
app.use(postsRouter);
app.use(passport.initialize());
passport.use(passportMiddelware);

export const TRANSFER_PROTOCOL = process.env.TRANSFER_PROTOCOL;
export const SERVER_PORT = process.env.SERVER_PORT;
export const HOSTNAME = process.env.HOST;

const options: Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Blog API Rest',
			version: '1.0.0',
			description: 'A simple blog API '
		},
		servers: [
			{
				url: `${TRANSFER_PROTOCOL}://${SERVER_PORT}:${HOSTNAME}/api`
			}
		]
	},
	apis: ['./src/infrastructure/routes/*.ts']
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

export default app;