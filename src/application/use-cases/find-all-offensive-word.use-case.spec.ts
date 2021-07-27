jest.mock('./../../infrastructure/repositories/offensive-word.repository.mongo', () => {
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

import 'reflect-metadata';
import Container from 'typedi';

import { OffensiveWordRepositoryMongo } from '../../infrastructure/repositories/offensive-word.repository.mongo';
import { FindAllOffensiveWordsUseCase } from './find-all-offensive-word.use-case';

import { IdVO } from '../../domain/vos/id.vo';
import { WordVO } from '../../domain/vos/word.vo';
import { LevelVO } from '../../domain/vos/level.vo';
import { OffensiveWord } from '../../domain/entities/offensive-word.entity';

describe('FindAllOffensiveWordsUseCase Test Suite', () => {
	
	it('should return all offensive words persisted in repository', async () => {
		const repository = new OffensiveWordRepositoryMongo();
		Container.set('OffensiveWordRepository', repository);

		const useCase: FindAllOffensiveWordsUseCase = Container.get(FindAllOffensiveWordsUseCase);

		const offensiveWords = await useCase.execute();

		expect(offensiveWords.length).toBe(5);
		expect(offensiveWords[4].level).toEqual(5);
		expect(offensiveWords[4].word).toEqual('Test5');
	});
    
});