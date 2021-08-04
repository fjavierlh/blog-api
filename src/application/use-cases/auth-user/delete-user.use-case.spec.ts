import Container from 'typedi';
import { User } from '../../../domain/entities/user.entity';
import { EmailVO } from '../../../domain/vos/auth-user/email.vo';
import { PasswordVO } from '../../../domain/vos/auth-user/password.vo';
import { Role, RoleVO } from '../../../domain/vos/auth-user/role.vo';
import { IdVO } from '../../../domain/vos/id.vo';
import { UserRepositoryPostgres } from '../../../infrastructure/repositories/user.repository.pg';

jest.mock('./../../../infrastructure/repositories/user.repository.pg', () => {
	return {
		UserRepositoryPostgres: jest.fn().mockImplementation(() => {
			return {
				getUserByEmail: jest.fn().mockImplementation(() => {
					return new User({
						id: IdVO.createWithUUID('f2dd593e-af8e-4754-bed3-b42d2cfce636'),
						email: EmailVO.create('hi@mymail.com'),
						password: PasswordVO.create('$2b$10$Evl2ukNLSMrqpUB4vjZNCOEkAG3LAdXzOwWhHKtw.KRvW5Grn0NlW'),
						role: RoleVO.create(Role.PUBLISHER)
					});
				})
			};
		})
	};
});

describe('DeleteUserUseCase', () => {
	let repository: UserRepositoryPostgres;

	beforeEach(() => {
		repository = new UserRepositoryPostgres();
		Container.set('UserRepository', repository);
	});

	it('should delete indicated user', async () => {
		/*
		const useCase = Container.get(DeleteUserUseCase);
		await useCase.execute();
		expect(repository.deleteUser).toBeCalled();
		*/
	});
});