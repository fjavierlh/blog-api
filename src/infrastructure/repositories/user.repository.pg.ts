import { User, UserType } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { EmailVO } from '../../domain/vos/auth-user/email.vo';
import { IdVO } from '../../domain/vos/id.vo';
import { PasswordVO } from '../../domain/vos/auth-user/password.vo';
import { UserModel } from './user.schema';

export class UserRepositoryPostgres implements UserRepository {

	async saveUser(user: User): Promise<void> {
		const id = user.id.value;
		const email = user.email.value;
		const password = user.password.value;

		const userModel = UserModel.build({id, email, password});
		await userModel.save();
	}

	async getUserByEmail(email: EmailVO): Promise<User|null> {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const user: any|null = await UserModel.findOne({where: {email: email.value}});

		if(!user) return null;

		const userData: UserType = {
			id: IdVO.createWithUUID(user.id),
			email: EmailVO.create(user.email),
			password: PasswordVO.create(user.password)
		};

		return new User(userData);
	}

}