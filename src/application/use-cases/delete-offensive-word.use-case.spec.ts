//jest.mock('./../../infrastructure/repositories/offensive-word.repository.mongo');

jest.mock('./../../infrastructure/repositories/offensive-word.repository.mongo', () => {
	return {
		OffensiveWordRepositoryMongo: jest.fn().mockImplementation(() => {
			return {
				delete: jest.fn(),
				findById: jest.fn().mockImplementation(() =>
					new OffensiveWord({ id: IdVO.createWithUUID('cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668'), word: WordVO.create('Test1'), level: LevelVO.create(1) })
				)
			};
		})
	};
});


import 'reflect-metadata';
import Container from 'typedi';
import { OffensiveWord } from '../../domain/entities/offensive-word.entity';
import { IdVO } from '../../domain/vos/id.vo';
import { LevelVO } from '../../domain/vos/level.vo';
import { WordVO } from '../../domain/vos/word.vo';

import { OffensiveWordRepositoryMongo } from '../../infrastructure/repositories/offensive-word.repository.mongo';
import { DeleteOffensiveUseCase } from './delete-offensive-word.use-case';
import { IdRequest } from './id.request';

describe('DeleteOffensiveUseCase Test Suite', () => {
	it('should delete an offensive word', async () => {
		const repository = new OffensiveWordRepositoryMongo();
		Container.set('OffensiveWordRepository', repository);

		const useCase = Container.get(DeleteOffensiveUseCase);

		const idOW: IdRequest =  'cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668';

		await useCase.execute(idOW);
		expect(repository.delete).toHaveBeenCalled();
	});
});