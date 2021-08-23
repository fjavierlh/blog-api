import 'reflect-metadata';
import Container from 'typedi';
import { PostRepositoryMongo } from '../../../infrastructure/repositories/post.repository.mongo';
import { DeletePostUseCase } from './delete-post.use-case';

jest.mock('./../../../infrastructure/repositories/post.repository.mongo', () => {
	return {
		PostRepositoryMongo: jest.fn().mockImplementation(() => {
			return {
				deletePostByID: jest.fn(),
				checkIfPostExists: jest.fn().mockImplementation(() => true),
			};
		})
	};
});

describe('DeletePostUseCase test suite', () => {

	it('should delete an post by ID', async () => {
		const repository = new PostRepositoryMongo();
		Container.set('PostRepository', repository);

		const useCase = Container.get(DeletePostUseCase);
		const validId = 'cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668';

		await useCase.execute(validId);

		expect(repository.deletePostByID).toHaveBeenCalled();

	});

});