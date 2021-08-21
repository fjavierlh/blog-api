import 'reflect-metadata';
import Container from 'typedi';
import { IdVO } from '../../../domain/vos/id.vo';
import { PostRepositoryMongo } from '../../../infrastructure/repositories/post.repository.mongo';
import { IdRequest } from '../types/id.request';
import { CommentPostRequest } from './types/comment-post.request';
import { AddCommentToPostUseCase } from './add-comment-to-post.use-case';
import { OffensiveWordRepositoryMongo } from '../../../infrastructure/repositories/offensive-word.repository.mongo';
import { OffensiveWord } from '../../../domain/entities/offensive-word.entity';
import { LevelVO } from '../../../domain/vos/offensive-word/level.vo';
import { WordVO } from '../../../domain/vos/offensive-word/word.vo';

jest.mock('./../../../infrastructure/repositories/post.repository.mongo', () => {
	return {
		PostRepositoryMongo: jest.fn().mockImplementation(() => {
			return {
				saveCommentInPost: jest.fn(),
				checkIfPostExists: jest.fn().mockImplementation(() => true),
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

describe('AddCommentToPostUseCase', () => {

	it('should add a comment to existent post', async () => {
		const postRepository = new PostRepositoryMongo();
		const offensiveWordRepository = new OffensiveWordRepositoryMongo();
		Container.set('PostRepository', postRepository);
		Container.set('OffensiveWordRepository', offensiveWordRepository);

		const useCase = Container.get(AddCommentToPostUseCase);
		const validId: IdRequest = 'cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668';
		const comment: CommentPostRequest = {
			nickname: 'validNick',
			content: 'This is a valid comment',
		};
		await useCase.execute(validId, comment);
		expect(postRepository.saveCommentInPost).toHaveBeenCalled();
		expect(offensiveWordRepository.showAll).toHaveBeenCalled();
	});

	it('should throw an error if comment contains an offensive word', async () => {
		const postRepository = new PostRepositoryMongo();
		const offensiveWordRepository = new OffensiveWordRepositoryMongo();
		Container.set('PostRepository', postRepository);
		Container.set('OffensiveWordRepository', offensiveWordRepository);

		const useCase = Container.get(AddCommentToPostUseCase);
		const validId: IdRequest = 'cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668';
		const comment: CommentPostRequest = {
			nickname: 'validNick',
			content: 'This is a valid comment with offensive word: Test1, Test2, Test3, Test4, Test5',
		};

		await expect(useCase.execute(validId, comment))
			.rejects
			.toThrow('Found offensive words in comment: test1, test2, test3, test4, test5');
	});

});