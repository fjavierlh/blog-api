import supertest from 'supertest';

import 'reflect-metadata';
import Container from 'typedi';
import { User, UserType } from '../src/domain/entities/user.entity';
import { UserRepository } from '../src/domain/repositories/user.repository';
import { UserService } from '../src/domain/services/user.service';
import { EmailVO } from '../src/domain/vos/auth-user/email.vo';
import { PasswordVO } from '../src/domain/vos/auth-user/password.vo';
import { Role, RoleVO } from '../src/domain/vos/auth-user/role.vo';
import { IdVO } from '../src/domain/vos/id.vo';
import sequelize from '../src/infrastructure/config/postgres';
import { OffensiveWordRepositoryMongo } from '../src/infrastructure/repositories/offensive-word.repository.mongo';
import app from './../src/app';
import {connectToDB, disconnectDB} from './../src/infrastructure/config/mongo';

describe('Offensive word', () => {
	const server = supertest(app);
	let adminToken: string;

	beforeAll(async () => {
		await connectToDB();
		await sequelize.authenticate();

		const userService: UserService = Container.get(UserService);

		const emailAdmin = 'mi@mail.com';
		const passwordAdmin = 'password';

		const userData: UserType = {
			id: IdVO.create(),
			email: EmailVO.create(emailAdmin),
			password: PasswordVO.create(passwordAdmin),
			role: RoleVO.create(Role.ADMIN)
		};

		await userService.persist(new User(userData));

		const responseLogin = await server.post('/api/login')
			.type('application/json')
			.send({ email: emailAdmin, password: passwordAdmin});
		adminToken = responseLogin.body.token;
	});

	it('should create an offensive word', async () => {
		jest.setTimeout(5000);
		const newOW = {
			'word': 'metienesfrito',
			'level': 1
		};

		await server.post('/api/offensive-word')
			.type('application/json')
			.set('Authorization', `Bearer ${adminToken}`)
			.send(newOW)
			.expect(201);
	});

	afterAll(async () => {
		await disconnectDB();
		const repositoryUser: UserRepository = Container.get('UserRepository');
		await repositoryUser.deleteAll();
		await sequelize.close();
	});

	afterEach(async () => {
		const repositoryOW: OffensiveWordRepositoryMongo = Container.get('OffensiveWordRepository');
		await repositoryOW.deleteAll();
	});

});