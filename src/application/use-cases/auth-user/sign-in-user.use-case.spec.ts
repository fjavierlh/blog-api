import 'reflect-metadata';
import Container from 'typedi';
import { User } from '../../../domain/entities/user.entity';
import { EmailVO } from '../../../domain/vos/auth-user/email.vo';
import { PasswordVO } from '../../../domain/vos/auth-user/password.vo';
import { IdVO } from '../../../domain/vos/id.vo';
import { UserRepositoryPostgres } from '../../../infrastructure/repositories/user.repository.pg';
import { SignInUserUseCase } from './sign-in-user.use-case';
import { SignInRequest } from './sign-in.request';

jest.mock('./../../../infrastructure/repositories/user.repository.pg', () => {
	return {
		UserRepositoryPostgres: jest.fn().mockImplementation(() => {
			return {
				getUserByEmail: jest.fn().mockImplementation(() => {
					return new User({
						id: IdVO.createWithUUID('f2dd593e-af8e-4754-bed3-b42d2cfce636'),
						email: EmailVO.create('hi@mymail.com'),
						password: PasswordVO.create('$2b$10$Evl2ukNLSMrqpUB4vjZNCOEkAG3LAdXzOwWhHKtw.KRvW5Grn0NlW')});
				})
			};
		})
	};
});

describe('SignInUserUseCase test suite', () => {
	let repository: UserRepositoryPostgres;

	beforeEach(() => {
		jest.clearAllMocks();
		repository = new UserRepositoryPostgres();
		Container.set('UserRepository', repository);
	});

	it('should sign in an user with valid credentials', async () => {
		

		const useCase = Container.get(SignInUserUseCase);

		const userTest: SignInRequest = {
			email: 'hi@mymail.com',
			password: '@bCd3FgH1!'
		};

		const returnedToken = await useCase.execute(userTest);
		console.log(returnedToken);
		expect(repository.getUserByEmail).toBeCalled();
		expect(typeof returnedToken).toBe('string');
	});

	it('should return null if enter invalid credentials', async () => {
		
		const useCase = Container.get(SignInUserUseCase);

		const userTest: SignInRequest = {
			email: 'hi@mymail.com',
			password: '12345'
		};

		const returnedToken = await useCase.execute(userTest);
		console.log(returnedToken);
		// expect(repository.getUserByEmail).toBeCalled();
		expect(returnedToken).toBeNull();
	});

});