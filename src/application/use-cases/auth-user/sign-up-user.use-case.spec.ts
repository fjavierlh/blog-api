import 'reflect-metadata';
import Container from 'typedi';
import { UserRepositoryPostgres } from '../../../infrastructure/repositories/user.repository.pg';
import { SignUpUserUseCase } from './sign-up-user.use-case';
import { SignUpRequest } from './sign-up.request';

//jest.mock('./../../../infrastructure/repositories/user.repository.pg');

jest.mock('./../../../infrastructure/repositories/user.repository.pg', () => {
	return {
		UserRepositoryPostgres: jest.fn().mockImplementation(() => {
			return { saveUser: jest.fn() };
		})
	};
});

describe('SignUpUserUseCase test suite', () => {
	it('should sign up an user', async () => {

		const repository = new UserRepositoryPostgres();

		Container.set('UserRepository', repository);

		const useCase = Container.get(SignUpUserUseCase);

		const userTest: SignUpRequest = {
			email: 'hi@mymail.com',
			password: '@bCd3fGh1#'
		};

		await useCase.execute(userTest);
		expect(repository.saveUser).toBeCalled();

	});
});
