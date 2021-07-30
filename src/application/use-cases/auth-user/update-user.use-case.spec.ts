import 'reflect-metadata';
import Container from 'typedi';
import { User } from '../../../domain/entities/user.entity';
import { EmailVO } from '../../../domain/vos/auth-user/email.vo';
import { PasswordVO } from '../../../domain/vos/auth-user/password.vo';
import { IdVO } from '../../../domain/vos/id.vo';
import { UserRepositoryPostgres } from '../../../infrastructure/repositories/user.repository.pg';
import { EmailRequest } from './email.request';
import { UpdateUserUseCase } from './update-user.use-case';

jest.mock('./../../../infrastructure/repositories/user.repository.pg', () => {
	return {
		UserRepositoryPostgres: jest.fn().mockImplementation(() => {
			return {
				updateUserByEmail: jest.fn(),
				getUserByEmail: jest.fn().mockImplementation(() => {
					return new User({
						id: IdVO.createWithUUID('f2dd593e-af8e-4754-bed3-b42d2cfce636'),
						email: EmailVO.create('hi@mymail.com'),
						password: PasswordVO.create('$2b$10$Evl2ukNLSMrqpUB4vjZNCOEkAG3LAdXzOwWhHKtw.KRvW5Grn0NlW')
					});
				})
			};
		})
	};
});

describe('UpdateUserUseCase test suite',  () => {
	let repository: UserRepositoryPostgres;
	beforeEach(() => {
		repository = new UserRepositoryPostgres();
		Container.set('UserRepository', repository);
	});
	it('should update user email and password ', async () => {
		const searchedEmail: EmailRequest = 'hi@mymail.com';
		const updatedUser = {
			email: 'bye@mymail.com',
			password: '12345'
		};

		const useCase = Container.get(UpdateUserUseCase); 
		await useCase.execute(searchedEmail, updatedUser);
		expect(repository.getUserByEmail).toBeCalled();
		expect(repository.updateUserByEmail).toBeCalled();
	});

});