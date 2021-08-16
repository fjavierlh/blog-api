import 'reflect-metadata';
import Container from 'typedi';
import { OffensiveWord } from '../../../domain/entities/offensive-word.entity';
import { IdVO } from '../../../domain/vos/id.vo';
import { LevelVO } from '../../../domain/vos/offensive-word/level.vo';
import { WordVO } from '../../../domain/vos/offensive-word/word.vo';
import { OffensiveWordRepositoryMongo } from '../../../infrastructure/repositories/offensive-word.repository.mongo';
import { UpdateOffensiveWordByIdUseCase } from './update-offensive-word-by-id.use-case';

jest.mock('./../../../infrastructure/repositories/offensive-word.repository.mongo', () => {
	return {
		OffensiveWordRepositoryMongo: jest.fn().mockImplementation(() => {
			return {
				update: jest.fn().mockImplementation(() => 
					new OffensiveWord({ id: IdVO.createWithUUID('f2dd593e-af8e-4754-bed3-b42d2cfce636'), word: WordVO.create('Tested'), level: LevelVO.create(1) })
				),
				findById: jest.fn().mockImplementation(() => 
					new OffensiveWord({ id: IdVO.createWithUUID('f2dd593e-af8e-4754-bed3-b42d2cfce636'), word: WordVO.create('Test'), level: LevelVO.create(1) })
				)
			};
		})
	};
});

describe('FindOffensiveWordById Test Suite', () => {
	it('should return a offensive word by id', async () => {

		const repository = new OffensiveWordRepositoryMongo();
		Container.set('OffensiveWordRepository', repository);
        
		const useCase: UpdateOffensiveWordByIdUseCase = Container.get(UpdateOffensiveWordByIdUseCase);
		const testId = 'f2dd593e-af8e-4754-bed3-b42d2cfce636';
		const updatedOF = { word: 'Tested', level: 1};

		const offensiveWord = await useCase.execute(testId, updatedOF);

		expect(offensiveWord.id).toEqual(testId);
		expect(offensiveWord.word).toEqual('Tested');
		expect(offensiveWord.level).toEqual(1);

	});
});