jest.mock('./../../infrastructure/repositories/offensive-word.repository.mongo', () => {
	return {
		OffensiveWordRepositoryMongo: jest.fn().mockImplementation(() => {
			return {
				showAll: jest.fn().mockImplementation(() => [
					{ id: IdVO.create().value, word: 'Test1', level: 1 },
					{ id: IdVO.create().value, word: 'Test2', level: 2 },
					{ id: IdVO.create().value, word: 'Test3', level: 3 },
					{ id: IdVO.create().value, word: 'Test4', level: 4 },
					{ id: IdVO.create().value, word: 'Test5', level: 5 },
				])
			};
		})
	};
});

import 'reflect-metadata';
import Container from 'typedi';

import { OffensiveWordRepositoryMongo } from '../../infrastructure/repositories/offensive-word.repository.mongo';
import { FindAllOffensiveWordsUseCase } from './find-all-offensive-word.use-case';

import { IdVO } from '../../domain/vos/id.vo';

describe('FindAllOffensiveWordsUseCase Test Suite', () => {
	it('should return all offensive words persisted in repository', async () => {
		const repository = new OffensiveWordRepositoryMongo();
		Container.set('OffensiveWordRepository', repository);

		const useCase: FindAllOffensiveWordsUseCase = Container.get(FindAllOffensiveWordsUseCase);

		const offensiveWords = await useCase.execute();

		expect(offensiveWords.length).toBe(5);
		expect(offensiveWords[0].level).toEqual(1);
		expect(offensiveWords[0].word).toEqual('Test1');
	});
    
});