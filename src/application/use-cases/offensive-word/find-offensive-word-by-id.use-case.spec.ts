import 'reflect-metadata';
import Container from 'typedi';
import { OffensiveWord } from '../../../domain/entities/offensive-word.entity';
import { IdVO } from '../../../domain/vos/id.vo';
import { LevelVO } from '../../../domain/vos/offensive-word/level.vo';
import { WordVO } from '../../../domain/vos/offensive-word/word.vo';
import { OffensiveWordRepositoryMongo } from '../../../infrastructure/repositories/offensive-word.repository.mongo';
import { IdRequest } from '../id.request';
import { FindOffensiveWordById } from './find-offensive-word-by-id.use-case';

jest.mock('./../../../infrastructure/repositories/offensive-word.repository.mongo', () => {
	return {
		OffensiveWordRepositoryMongo: jest.fn().mockImplementation(() => {
			return {
				findById: jest.fn().mockImplementation(() => 
					new OffensiveWord({ 
						id: IdVO.createWithUUID('f2dd593e-af8e-4754-bed3-b42d2cfce636'),
						word: WordVO.create('Test1'),
						level: LevelVO.create(1)
					})
				)
			};
		})
	};
});

describe('FindOffensiveWordById Test Suite', () => {
	it('should return a offensive word by id', async () => {
		const repository = new OffensiveWordRepositoryMongo();
		Container.set('OffensiveWordRepository', repository);
		const useCase: FindOffensiveWordById = Container.get(FindOffensiveWordById);
		const testId: IdRequest = 'f2dd593e-af8e-4754-bed3-b42d2cfce636';
        
		const offensiveWord = await useCase.execute(testId);
		console.log(offensiveWord);
		if(offensiveWord !== null) {
			expect(offensiveWord.id).toEqual(testId);
			expect(offensiveWord.word).toEqual('Test1');
			expect(offensiveWord.level).toEqual(1);
		}
        
	});
});
