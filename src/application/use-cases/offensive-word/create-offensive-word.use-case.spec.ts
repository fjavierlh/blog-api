jest.mock('./../../../infrastructure/repositories/offensive-word.repository.mongo');

import 'reflect-metadata';
import Container from 'typedi';

import {CreateOffensiveWordUseCase} from './create-offensive-word.use-case';
import { OffensiveWordRequest} from './types/offensive-word.request';
import { OffensiveWordRepositoryMongo } from '../../../infrastructure/repositories/offensive-word.repository.mongo';

describe('CreateOffensiveWordUseCase', () => {
	it('should create an offensive word and persit it', async () => {
		const repository = new OffensiveWordRepositoryMongo();

		Container.set('OffensiveWordRepository', repository);
        
		const useCase = Container.get(CreateOffensiveWordUseCase);
		const offensiveWordRequest: OffensiveWordRequest = {
			word: 'Test',
			level: 1
		};

		await useCase.execute(offensiveWordRequest);
		expect(repository.save).toBeCalled();

	});
});
