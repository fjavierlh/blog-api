import 'reflect-metadata';
import Container from 'typedi';
import { OffensiveWordRepositoryMongo } from '../../infrastructure/repositories/offensive-word.repository.mongo';
import { UpdateOffensiveWordById } from './update-offensive-word-by-id.use-case';

jest.mock('./../../infrastructure/repositories/offensive-word.repository.mongo', () => {
	return {
		OffensiveWordRepositoryMongo: jest.fn().mockImplementation(() => {
			return {
				update: jest.fn().mockImplementation(() => [
					{ id: 'cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668', word: 'Test1', level: 1 },
					{ id: 'f2dd593e-af8e-4754-bed3-b42d2cfce636', word: 'Test2', level: 2 },
					{ id: '72cc472f-a06b-44aa-a1cc-8ca5d353e095', word: 'Test3', level: 3 },
					{ id: 'e86c4e2b-c26f-49f2-ac92-5c7e32784719', word: 'Test4', level: 4 },
					{ id: '50ff8d46-9ab4-4610-84b8-969e9d95bd17', word: 'Test5', level: 5 },
				])
			};
		})
	};
});

describe('FindOffensiveWordById Test Suite', () => {
	it('should return a offensive word by id', async () => {

		const repository = new OffensiveWordRepositoryMongo();
		Container.set('OffensiveWordRepository', repository);
        
		const useCase: UpdateOffensiveWordById = Container.get(UpdateOffensiveWordById);
		const testId = 'f2dd593e-af8e-4754-bed3-b42d2cfce636';
		const updatedOF = { word: 'Tested', level: 1};

		const offensiveWord = await useCase.execute(testId, updatedOF);

		expect(offensiveWord.id).toEqual(testId);
		expect(offensiveWord.word).toEqual('Tested');
		expect(offensiveWord.level).toEqual(1);

	});
});