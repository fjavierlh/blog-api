import express, { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import passport from 'passport';
import Container from 'typedi';

import { FindAuthorByIDUseCase } from '../../application/use-cases/author/find-author-by-id.use-case';
import { AddCommentToPostUseCase } from '../../application/use-cases/post/add-comment-to-post.use-case';
import { CreatePostUseCase } from '../../application/use-cases/post/create-post.use-case';
import { DeletePostUseCase } from '../../application/use-cases/post/delete-post.use-case';
import { FindAllPostsUseCase } from '../../application/use-cases/post/find-all-posts.use-case';
import { FindPostByIdUseCase } from '../../application/use-cases/post/find-post-by-id.use-case';
import { RemoveCommentPostUseCase } from '../../application/use-cases/post/remove-comment.use-case';
import { PostRequest } from '../../application/use-cases/post/types/post.request';
import { UpdateCommentPostUseCase } from '../../application/use-cases/post/update-comment-post.use-case';
import { UpdatePostUseCase } from '../../application/use-cases/post/update-post.use-case';

import { User } from '../../domain/entities/user.entity';
import { Role } from '../../domain/vos/auth-user/role.vo';
import { IdVO } from '../../domain/vos/id.vo';

import { isOwner } from '../middlewares/is-owner.middleware';
import { hasRole } from '../middlewares/roles.middleware';

const router = express.Router();

router.post('/api/posts',
	body('title').isString().notEmpty(),
	body('content').isString().notEmpty(),
	passport.authenticate('jwt', { session: false }),
	hasRole([Role.ADMIN, Role.PUBLISHER]),
	async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

			const user = req.user as User;
			const { title, content } = req.body;

			const { name: author, nickname } = await getAuthor(user.id);

			const newPost: PostRequest = { author, nickname, title, content };

			const createPostUseCase = Container.get(CreatePostUseCase);
			const postID = await createPostUseCase.execute(newPost);

			res.status(201).json({
				statusCode: 200,
				message: `Save post with ID ${postID} success`,
				post: newPost
			});

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			res.status(401).json({ errors: { msg: error.message } });
		}
	}
);

router.get('/api/posts',
	async (req: Request, res: Response) => {

		try {
			const useCase = Container.get(FindAllPostsUseCase);
			const allPosts = await useCase.execute();
			res.status(200).json({
				statusCode: 200,
				message: `Showing ${allPosts.length} posts`,
				post: allPosts
			});

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			res.status(401).json({ errors: { msg: error.message } });
		}

	});

router.get('/api/posts/:postID',
	param('postID').notEmpty().isUUID(),
	async (req: Request, res: Response) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

			const { postID } = req.params;
			const useCase = Container.get(FindPostByIdUseCase);
			const post = await useCase.execute(postID);

			res.status(200).json({
				statusCode: 200,
				message: `Post with ID ${postID} found`,
				post: post
			});

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			res.status(401).json({ errors: { msg: error.message } });
		}
	}
);

router.put('/api/posts/:postID',
	param('postID').notEmpty().isUUID(),
	body('title').isString().notEmpty(),
	body('content').isString().notEmpty(),
	passport.authenticate('jwt', { session: false }),
	hasRole([Role.ADMIN, Role.PUBLISHER]),
	isOwner(),
	async (req: Request, res: Response) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

			const { postID } = req.params;
			const user = req.user as User;
			const { name: author, nickname } = await getAuthor(user.id);
			const { title, content } = req.body;

			const updatedPost = { author, nickname, title, content };
			const useCase = Container.get(UpdatePostUseCase);
			await useCase.execute(postID, updatedPost);

			res.status(200).json({
				statusCode: 200,
				message: `Updated post with ID '${postID}' success`
			});

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			res.status(401).json({ errors: { msg: error.message } });
		}
	}
);

router.delete('/api/posts/:postID',
	param('postID').notEmpty().isUUID(),
	passport.authenticate('jwt', { session: false }),
	hasRole([Role.ADMIN, Role.PUBLISHER]),
	isOwner(),
	async (req: Request, res: Response) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

			const { postID } = req.params;
			const useCase = Container.get(DeletePostUseCase);
			await useCase.execute(postID);

			res.status(200).json({ 
				statusCode: 200,
				message: `Deleted post with ID '${postID}' success`
			});
			
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			res.status(401).json({ errors: { msg: error.message } });
		}
	}
);

router.post('/api/posts/:postID/comments',
	param('postID').isUUID().notEmpty(),
	body('nickname').isString().notEmpty(),
	body('content').isString().notEmpty(),
	passport.authenticate('jwt', { session: false }),
	hasRole([Role.ADMIN, Role.PUBLISHER]),
	async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

			const { postID } = req.params;
			const { content } = req.body;
			const user = req.user as User;

			const findAuthorUseCase = Container.get(FindAuthorByIDUseCase);
			const { name: nickname } = await findAuthorUseCase.execute(user.id.value);

			const newComment = { nickname, content };
			const useCase = Container.get(AddCommentToPostUseCase);
			const commentID = await useCase.execute(postID, newComment);

			res.status(200).json({
				statusCode: 200,
				message: `Save comment with ID '${commentID}' on post '${postID}' success`,
				newComment: newComment
			});

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			res.status(401).json({ errors: { msg: error.message } });
		}
	}
);

router.put('/api/posts/:postID/comments/:commentID',
	param('postID').isUUID().notEmpty(),
	param('commentID').isUUID().notEmpty(),
	passport.authenticate('jwt', { session: false }),
	hasRole([Role.ADMIN, Role.PUBLISHER]),
	isOwner(),
	async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

			const { postID, commentID } = req.params;
			const { nickname, content } = req.body;
			const updatedComment = { nickname, content };

			const useCase = Container.get(UpdateCommentPostUseCase);
			await useCase.execute(postID, commentID, updatedComment);

			res.status(200).json({
				statusCode: 200,
				message: `Updated comment with ID '${commentID}' on post '${postID}' success`,
				updatedComment: updatedComment 
			});

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			res.status(401).json({ errors: { msg: error.message } });
		}
	}
);

router.delete('/api/posts/:postID/comments/:commentID',
	param('postID').isUUID().notEmpty(),
	param('commentID').isUUID().notEmpty(),
	passport.authenticate('jwt', { session: false }),
	hasRole([Role.ADMIN, Role.PUBLISHER]),
	isOwner(),
	async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

			const { postID, commentID } = req.params;

			const useCase = Container.get(RemoveCommentPostUseCase);
			await useCase.execute(postID, commentID);

			res.status(200).json({ statusCode: 200, message: `Deleted comment with ID '${commentID}' on post '${postID}' success` });

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			res.status(401).json({ errors: { msg: error.message } });
		}
	}
);

// post.route module utils
const getAuthor = async (authorID: IdVO) => {
	const findAuthorUseCase = Container.get(FindAuthorByIDUseCase);
	return findAuthorUseCase.execute(authorID.value);
};

export { router as postsRouter };