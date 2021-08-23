import 'reflect-metadata';
import Container from 'typedi';
import { NextFunction, Request, Response } from 'express';
import { User } from '../../domain/entities/user.entity';
import { Role } from '../../domain/vos/auth-user/role.vo';
import { PostRepositoryMongo } from '../repositories/post.repository.mongo';
import { IdVO } from '../../domain/vos/id.vo';
import { AuthorRepositoryMongo } from '../repositories/author.repository.mongo';
import { Author } from '../../domain/entities/author.entity';
import { CommentPost } from '../../domain/entities/comment-post.entity';
import { Post } from '../../domain/entities/post.entity';

export const isOwner = () => {
	return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		console.log('isOwner entra');
		const { postID, commentID } = req.params;
		const user = req.user as User;
		const { id: userId, role } = user;

		if (role.value === Role.ADMIN) next();
		const authorRepository: AuthorRepositoryMongo = Container.get('AuthorRepository');
		const expectedAuthor: Author = await authorRepository.findAuthorByID(userId);

		if (postID && commentID) {
			const postRespository: PostRepositoryMongo = Container.get('PostRepository');
			const expectedComment: CommentPost = await postRespository.getCommentPostByID( IdVO.createWithUUID(postID), IdVO.createWithUUID(commentID));
			if (expectedAuthor.nickname.value === expectedComment.nickname.value) {
				next();
				return;
			}
		}

		if (postID) {
			const postRespository: PostRepositoryMongo = Container.get('PostRepository');
			const expectedPost: Post = await postRespository.getPostByID(IdVO.createWithUUID(postID));
			if (expectedAuthor.nickname.value === expectedPost.nickname.value){
				next();
				return;
			}

		}

		return res.status(403).json({ status: 'Not allowed' });
	};
};