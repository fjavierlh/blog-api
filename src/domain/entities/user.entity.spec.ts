import { EmailVO } from '../vos/auth-user/email.vo';
import { PasswordVO } from '../vos/auth-user/password.vo';
import { IdVO } from '../vos/id.vo';
import { User, UserType } from './user.entity';
describe('User test suite', () => {
	it('should create a user', () => {
		const validUUID = '3b37664b-7292-48ba-a986-55480402d683';
		const validEmail = 'hi@mymail.com';
		const validPassword = '@Bcd3fgh1#';

		const userData: UserType = {
			id: IdVO.createWithUUID(validUUID),
			email: EmailVO.create(validEmail),
			password: PasswordVO.create(validPassword)
		};

		const expectedUserEntity = new User(userData);

		expect(expectedUserEntity.id.value).toBe(validUUID);
		expect(expectedUserEntity.email.value).toBe(validEmail);
		expect(expectedUserEntity.password.value).toBe(validPassword);
        
	});
});