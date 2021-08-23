import 'reflect-metadata';
import Container from 'typedi';
import { PostRepositoryMongo } from '../../../infrastructure/repositories/post.repository.mongo';
import { RemoveCommentPostUseCase } from './remove-comment.use-case';
jest.mock('../../../infrastructure/repositories/post.repository.mongo', () => {
	return {
		PostRepositoryMongo: jest.fn().mockImplementation(() => {
			return {
				deleteCommentInPost: jest.fn(),
				checkIfPostExists: jest.fn().mockImplementation(() => true),
				checkIfCommentPostExists: jest.fn().mockImplementation(() => true),
			};
		})
	};
});

describe('RemoveCommentPostUseCase', () => {
	it('should remove a existent comment', async () => {
		const repository = new PostRepositoryMongo();
		Container.set('PostRepository', repository);
		const useCase = Container.get(RemoveCommentPostUseCase);
		const postId = '82b486d3-e592-4f04-8056-91956dfbc7f3';
		const commentId = 'a792b2ee-7424-4f78-9a9c-3402676e80e0';

		const result = await useCase.execute(postId, commentId);
		expect(repository.deleteCommentInPost).toBeCalled();
		expect(result).not.toBeNull();
	});

});