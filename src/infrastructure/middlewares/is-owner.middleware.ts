import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';
import { User } from '../../domain/entities/user.entity';
import { Role } from '../../domain/vos/auth-user/role.vo';

export const isOwner = () => {
	return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		const { id: postId } = req.params;
		const user = req.user as User;
		const { id: userId, role } = user;

		if (role.value === Role.ADMIN) next();

		if (postId) {
			//const postRespository: PostRepositoryMongo = Container.get('PostRepository');
			//const expectedPost = postRespository.getPostByID(postId);
			//expectedPost.author.id === userId ?
			next();
		}

		return res.status(403).json({ status: 'Not allowed' });

	};
};