import 'reflect-metadata';
import Container from 'typedi';
import { Author } from '../../../domain/entities/author.entity';
import { AuthorNameVO } from '../../../domain/vos/author/author-name.vo';
import { AuthorNicknameVO } from '../../../domain/vos/author/author-nickname.vo';
import { IdVO } from '../../../domain/vos/id.vo';
import { AuthorRepositoryMongo } from '../../../infrastructure/repositories/author.repository.mongo';
import { FindAuthorByIDUseCase } from './find-author-by-id.use-case';

jest.mock('../../../infrastructure/repositories/author.repository.mongo', () => {
	return {
		AuthorRepositoryMongo: jest.fn().mockImplementation(() => {
			return {
				checkIfAuthorExists: jest.fn().mockImplementation(() => true),
				findAuthorByID: jest.fn().mockImplementation(() => {
					return new Author({
						id: IdVO.createWithUUID('54cc213e-478c-46b0-99bb-d6036567f25d'),
						name: AuthorNameVO.create('Test Author'),
						nickname: AuthorNicknameVO.create('testauthor')
					});
				})
			};
		})
	};
});

describe('FindAuthorByIDUseCase test suite', () => {

	it('should return an author if exists', async () => {
		const repository = new AuthorRepositoryMongo();
		Container.set('AuthorRepository', repository);

		const useCase = Container.get(FindAuthorByIDUseCase);
		const validAuthorID = '54cc213e-478c-46b0-99bb-d6036567f25d';
		const expectedAuthor = await useCase.execute(validAuthorID);
		console.log('expectedAuthor', expectedAuthor);
		expect(repository.checkIfAuthorExists).toBeCalled();
		expect(repository.findAuthorByID).toBeCalled();
		expect(expectedAuthor.id).toBe('54cc213e-478c-46b0-99bb-d6036567f25d');
		expect(expectedAuthor.name).toBe('Test Author');
		expect(expectedAuthor.nickname).toBe('testauthor');


	});

});