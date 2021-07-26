jest.mock('./../../infrastructure/repositories/offensive-word.repository.mongo');

import 'reflect-metadata';
import Container from 'typedi';

import { OffensiveWordRepositoryMongo } from '../../infrastructure/repositories/offensive-word.repository.mongo';
import { DeleteOffensiveUseCase } from './delete-offensive-word.use-case';
import { IdRequest } from './id.request';

describe('DeleteOffensiveUseCase Test Suite', () => {
	it('should delete an offensive word', () => {
		const repository = new OffensiveWordRepositoryMongo();
		Container.set('OffensiveWordRepository', repository);

		const useCase = Container.get(DeleteOffensiveUseCase);

		const idOW: IdRequest =  'cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668';

		useCase.execute(idOW);
		expect(repository.delete).toBeCalled();
	});
});