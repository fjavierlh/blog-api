import 'reflect-metadata';
import Container from 'typedi';
import { OffensiveWord } from '../../../domain/entities/offensive-word.entity';
import { IdVO } from '../../../domain/vos/id.vo';
import { LevelVO } from '../../../domain/vos/offensive-word/level.vo';
import { WordVO } from '../../../domain/vos/offensive-word/word.vo';
import { OffensiveWordRepositoryMongo } from '../../../infrastructure/repositories/offensive-word.repository.mongo';
import { PostRepositoryMongo } from '../../../infrastructure/repositories/post.repository.mongo';
import { CommentPostRequest } from './types/comment-post.request';
import { UpdateCommentPostUseCase } from './update-comment-post.use-case';
jest.mock('./../../../infrastructure/repositories/post.repository.mongo', () => {
	return {
		PostRepositoryMongo: jest.fn().mockImplementation(() => {
			return {
				updateCommentInPost: jest.fn(),
				checkIfPostExists: jest.fn().mockImplementation(() => true),
				checkIfCommentPostExists: jest.fn().mockImplementation(() => true),
			};
		})
	};
});

jest.mock('./../../../infrastructure/repositories/offensive-word.repository.mongo', () => {
	return {
		OffensiveWordRepositoryMongo: jest.fn().mockImplementation(() => {
			return {
				showAll: jest.fn().mockImplementation(() => [
					new OffensiveWord({ id: IdVO.create(), word: WordVO.create('Test1'), level: LevelVO.create(1) }),
					new OffensiveWord({ id: IdVO.create(), word: WordVO.create('Test2'), level: LevelVO.create(2) }),
					new OffensiveWord({ id: IdVO.create(), word: WordVO.create('Test3'), level: LevelVO.create(3) }),
					new OffensiveWord({ id: IdVO.create(), word: WordVO.create('Test4'), level: LevelVO.create(4) }),
					new OffensiveWord({ id: IdVO.create(), word: WordVO.create('Test5'), level: LevelVO.create(5) }),
				])
			};
		})
	};
});

describe('UpdateCommentPostUseCase test suite', () => {

	it('should update an comment post', async () => {

		const repository = new PostRepositoryMongo();
		const offensiveWordRepository = new OffensiveWordRepositoryMongo();
		Container.set('PostRepository', repository);
		Container.set('OffensiveWordRepository', offensiveWordRepository);

		const useCase = Container.get(UpdateCommentPostUseCase);
		const validPostId = 'cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668';
		const validCommentId = 'f2dd593e-af8e-4754-bed3-b42d2cfce636';
		const updatedComment: CommentPostRequest = {
			nickname: 'paquito86',
			content: 'An updated comment',
		};

		await useCase.execute(validPostId, validCommentId, updatedComment);
		expect(repository.updateCommentInPost).toBeCalled();
	});

	it('should update an comment post', async () => {

		const postRepository = new PostRepositoryMongo();
		const offensiveWordRepository = new OffensiveWordRepositoryMongo();
		Container.set('PostRepository', postRepository);
		Container.set('OffensiveWordRepository', offensiveWordRepository);

		const useCase = Container.get(UpdateCommentPostUseCase);
		const validPostId = 'cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668';
		const validCommentId = 'f2dd593e-af8e-4754-bed3-b42d2cfce636';
		const updatedComment: CommentPostRequest = {
			nickname: 'paquito86',
			content: 'An updated comment with offensive words:  Test1, Test2, Test3, Test4, Test5',
		};

		await expect(useCase.execute(validPostId, validCommentId, updatedComment))
			.rejects
			.toThrow();
	});
});