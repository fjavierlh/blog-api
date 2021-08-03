import 'reflect-metadata';
import Container from 'typedi';
import { UserRepositoryPostgres } from '../../../infrastructure/repositories/user.repository.pg';
import { SignUpUserUseCase } from './sign-up-user.use-case';
import { SignUpRequest } from './sign-up.request';
import { IdVO } from '../../../domain/vos/id.vo';

jest.mock('./../../../infrastructure/repositories/user.repository.pg');
const mockUserRepositoryMongo = UserRepositoryPostgres as jest. MockedClass<typeof UserRepositoryPostgres>;


describe('SignUpUserUseCase test suite', () => {
	let userRepository: UserRepositoryPostgres;
	
	beforeEach(() => {
		mockUserRepositoryMongo.mockClear();
		userRepository = new UserRepositoryPostgres();
		Container.set('UserRepository', userRepository);
	});

	it('should sign up an user and return a valid UUID', async () => {
		const signUpuseCase = Container.get(SignUpUserUseCase);
		const userTest: SignUpRequest = {
			email: 'hi@mymail.com',
			password: '@bCd3fGh1#'
		};

		const receivedUUID = await signUpuseCase.execute(userTest);
		expect(userRepository.saveUser).toBeCalled();
		expect(() => IdVO.createWithUUID(receivedUUID)).not.toThrow();
	});
	
});
