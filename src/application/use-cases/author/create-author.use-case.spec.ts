import 'reflect-metadata';
import Container from 'typedi';
import { AuthorRepositoryMongo } from '../../../infrastructure/repositories/author.repository.mongo';
import { AuthorRequest } from './types/author.request';
import { CreateAuthorUseCase } from './create-author.use-case';

jest.mock('./../../../infrastructure/repositories/author.repository.mongo');
const mockAuthorRepositoryPostgres = AuthorRepositoryMongo as jest.MockedClass<typeof AuthorRepositoryMongo>;

describe('CreateAuthorUseCase test suite', () => {
	let authorRepository: AuthorRepositoryMongo;

	beforeEach(() => {
		mockAuthorRepositoryPostgres.mockClear();
	});

	it('should create an author', async () => {
		
		authorRepository = new AuthorRepositoryMongo();
		Container.set('AuthorRepository', authorRepository);

		const validUUID = 'f2dd593e-af8e-4754-bed3-b42d2cfce636';
		const validAuthor: AuthorRequest = {
			name: 'My Test Author',
			nickname: 't-nickname'
		};

		const createAuthorUseCase = Container.get(CreateAuthorUseCase);
		await createAuthorUseCase.execute(validUUID, validAuthor);

		expect(authorRepository.createAuthor).toBeCalled();

	});


});