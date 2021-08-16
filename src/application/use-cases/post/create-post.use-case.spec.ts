jest.mock('./../../../infrastructure/repositories/post.repository.mongo');

import 'reflect-metadata';
import Container from 'typedi';
import { PostRepositoryMongo } from './../../../infrastructure/repositories/post.repository.mongo';
import { CreatePostUseCase } from './create-post.use-case';
import { PostRequest } from './types/post.request';
describe('CreatePostUseCase test suite', () => {

	it('should create a post', async () => {
		const repository = new PostRepositoryMongo();
		Container.set('PostRepository', repository);

		const useCase = Container.get(CreatePostUseCase);

		const postRequest: PostRequest = {
			author: 'Anónimo',
			nickname: 'anonymus',
			title: 'An anonymus post',
			content: 'loremimpsum'.repeat(6),
		};

		await useCase.execute(postRequest);
		expect(repository.persistPost).toBeCalled();
	});

});