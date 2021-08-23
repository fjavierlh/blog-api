import express, { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import passport from 'passport';
import Container from 'typedi';
import { AddCommentToPostUseCase } from '../../application/use-cases/post/add-comment-to-post.use-case';
import { CreatePostUseCase } from '../../application/use-cases/post/create-post.use-case';
import { DeletePostUseCase } from '../../application/use-cases/post/delete-post.use-case';
import { FindAllPostsUseCase } from '../../application/use-cases/post/find-all-posts.use-case';
import { FindPostByIdUseCase } from '../../application/use-cases/post/find-post-by-id.use-case';
import { RemoveCommentPostUseCase } from '../../application/use-cases/post/remove-comment.use-case';
import { PostRequest } from '../../application/use-cases/post/types/post.request';
import { UpdateCommentPostUseCase } from '../../application/use-cases/post/update-comment-post.use-case';
import { UpdatePostUseCase } from '../../application/use-cases/post/update-post.use-case';
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
			res.status(201).json({ msg: 'Post created!', post: { ...newPost } });

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			res.status(401).json({ errors: { msg: error.message } });
		}
	}
);

router.get('/api/posts', async (req: Request, res: Response) => {

	try {
		const useCase = Container.get(FindAllPostsUseCase);
		const allPosts = await useCase.execute();
		res.status(200).json(allPosts);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		res.status(401).json({ errors: { msg: error.message } });
	}

});

router.get('/api/posts/:id',
	param('id').notEmpty().isUUID(),
	async (req: Request, res: Response) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
			const { id } = req.params;

			const useCase = Container.get(FindPostByIdUseCase);
			const allPosts = await useCase.execute(id);
			res.status(200).json(allPosts);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			res.status(401).json({ errors: { msg: error.message } });
		}

	}
);

router.put('/api/posts/:id',
	param('id').notEmpty().isUUID(),
	body('author').isString().notEmpty(),
	body('nickname').isString().notEmpty(),
	body('title').isString().notEmpty(),
	body('content').isString().notEmpty(),
	async (req: Request, res: Response) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
			const { id } = req.params;
			const { author, nickname, title, content } = req.body;
			const updatedPost = { author, nickname, title, content };
			const useCase = Container.get(UpdatePostUseCase);
			await useCase.execute(id, updatedPost);
			res.status(200).json({ statusCode: 200, message: 'Updated post success!' });
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			res.status(401).json({ errors: { msg: error.message } });
		}

	}
);

router.delete('/api/posts/:id',
	param('id').notEmpty().isUUID(),
	async (req: Request, res: Response) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
			const { id } = req.params;
			const useCase = Container.get(DeletePostUseCase);
			await useCase.execute(id);
			res.status(200).json({ statusCode: 200, message: 'Post deleted success!' });
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			res.status(401).json({ errors: { msg: error.message } });
		}
	}
);

router.post('/api/posts/:id/comments',
	param('id').isUUID().notEmpty(),
	body('nickname').isString().notEmpty(),
	body('content').isString().notEmpty(),
	async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
			const { id } = req.params;
			const { nickname, content } = req.body;
			const newComment = { nickname, content };
			const useCase = Container.get(AddCommentToPostUseCase);
			await useCase.execute(id, newComment);
			res.status(200).json({ statusCode: 200, message: 'Comment add success!' });

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			res.status(401).json({ errors: { msg: error.message } });

		}
	});

router.put('/api/posts/:postID/comments/:commentID',
	param('postID').isUUID().notEmpty(),
	param('commentID').isUUID().notEmpty(),
	async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
			const { postID, commentID } = req.params;
			const { nickname, content } = req.body;
			const updatedComment = { nickname, content };
			const useCase = Container.get(UpdateCommentPostUseCase);
			await useCase.execute(postID, commentID, updatedComment);
			res.status(200).json({ statusCode: 200, message: 'Comment update success!' });

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			res.status(401).json({ errors: { msg: error.message } });

		}
	});

router.delete('/api/posts/:postID/comments/:commentID',
	param('postID').isUUID().notEmpty(),
	param('commentID').isUUID().notEmpty(),
	async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
			const { postID, commentID } = req.params;
		
			const useCase = Container.get(RemoveCommentPostUseCase);
			await useCase.execute(postID, commentID);
			res.status(200).json({ statusCode: 200, message: 'Comment deleted success!' });

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			res.status(401).json({ errors: { msg: error.message } });

		}
	});

export { router as postsRouter };