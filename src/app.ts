
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
import { AddCommentToPostUseCase } from './application/use-cases/post/add-comment-to-post.use-case';
import { CreatePostUseCase } from './application/use-cases/post/create-post.use-case';
import { FindAllPostsUseCase } from './application/use-cases/post/find-all-posts.use-case';
import { FindPostByIdUseCase } from './application/use-cases/post/find-post-by-id.use-case';
import { CommentDateVO } from './domain/vos/comments/comment-date.vo';
import { UpdateCommentPostUseCase } from './application/use-cases/post/update-comment-post.use-case';
import { RemoveCommentPostUseCase } from './application/use-cases/post/remove-comment.use-case';
import { postsRouter } from './infrastructure/routes/post.route';

Container.set('OffensiveWordRepository', new OffensiveWordRepositoryMongo());
Container.set('UserRepository', new UserRepositoryPostgres());
Container.set('AuthorRepository', new AuthorRepositoryMongo());
Container.set('PostRepository', new PostRepositoryMongo());

// Some manual test cases
/*
const createPostUseCase = Container.get(CreatePostUseCase);
createPostUseCase.execute({
	author: 'Anónimo',
	nickname: 'anonymus',
	title: 'An anonymus post',
	content: 'loremimpsum'.repeat(6)
});

const findAllPostsUseCase = Container.get(FindAllPostsUseCase);
(async () => findAllPostsUseCase.execute())().then((allPosts) => console.log('allPosts=', allPosts));

const findPostByIdUseCase = Container.get(FindPostByIdUseCase);
(async () => {
	return findPostByIdUseCase.execute('82b486d3-e592-4f04-8056-91956dfbc7f3');
})().then((post) => console.log('findPostByIdUseCase=', post));

const addCommentUseCase = Container.get(AddCommentToPostUseCase);
(async () => {
	return addCommentUseCase.execute(
		'a981b156-d8b5-4c61-9a5f-f47907aa3721',
		{
			nickname: 'paco1985',
			content: 'This is a test comment',
		});
})();

(async () => {
	const updateCommentUseCase = Container.get(UpdateCommentPostUseCase);
	const postId = 'a981b156-d8b5-4c61-9a5f-f47907aa3721';
	const commentId = 'c6b06820-1717-4004-b722-b1195a1f3c39';
	const updatedComment = {
		nickname: 'pepejuan',
		content: 'This is a updated comment'
	};
	return updateCommentUseCase.execute(postId, commentId, updatedComment);
})().then((a) => console.log('updateCommentUseCase', a));

(async () => {
	const removeCommentPost = Container.get(RemoveCommentPostUseCase);
	const postId = 'a981b156-d8b5-4c61-9a5f-f47907aa3721';
	const commentId = '9374d5dd-dde2-4620-a153-493cabe1d909';
	await removeCommentPost.execute(postId, commentId);
})();
*/

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