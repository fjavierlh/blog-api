import express, { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import passport from 'passport';
import Container from 'typedi';
import { CreatePostUseCase } from '../../application/use-cases/post/create-post.use-case';
import { PostRequest } from '../../application/use-cases/post/types/post.request';
import { Role } from '../../domain/vos/auth-user/role.vo';
import { hasRole } from '../middlewares/roles.middleware';


const router = express.Router();

router.post('/api/posts',
	body('author').isString().notEmpty(),
	body('nickname').isString().notEmpty(),
	body('title').isString().notEmpty(),
	body('content').isString().notEmpty(),
	passport.authenticate('jwt', { session: false }),
	hasRole([Role.ADMIN, Role.PUBLISHER]),
	async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

			const { author, nickname, title, content } = req.body;
			const newPost: PostRequest = { author, nickname, title, content };
			const useCase = Container.get(CreatePostUseCase);
			await useCase.execute(newPost);
			res.status(201).json({ msg: 'Post created!', post: {...newPost } });

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			res.status(401).json({ errors: { msg: error.message } });
		}
	}
);

export { router as postsRouter };