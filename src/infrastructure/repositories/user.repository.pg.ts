import { User, UserType } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { EmailVO } from '../../domain/vos/auth-user/email.vo';
import { IdVO } from '../../domain/vos/id.vo';
import { PasswordVO } from '../../domain/vos/auth-user/password.vo';
import { UserModel } from './user.schema';
import { RoleVO } from '../../domain/vos/auth-user/role.vo';

export class UserRepositoryPostgres implements UserRepository {


	async deleteUser(email: EmailVO): Promise<void | null> {
		const rowsDeleted = await UserModel.destroy({
			where: {
				email: email.value
			}
		});

		if (!rowsDeleted) return null;
	}

	async updateUserByEmail(email: EmailVO, updatedUser: User): Promise<void | null> {
		const user: User | null = await this.getUserByEmail(email);

		if (!user) return null;

		const id = user.id.value;
		const updatedEmail = updatedUser.email.value;
		const updatedPassword = updatedUser.password.value;

		await UserModel.update({
			email: updatedEmail,
			password: updatedPassword,
		}, {
			where: {
				id: id,
			}
		});
	}

	async saveUser(user: User): Promise<void> {
		const id = user.id.value;
		const email = user.email.value;
		const password = user.password.value;
		const role = user.role.value;

		const userModel = UserModel.build({ id, email, password, role });
		await userModel.save();
	}

	async getUserByEmail(email: EmailVO): Promise<User | null> {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const user: any | null = await UserModel.findOne({ where: { email: email.value } });

		if (!user) return null;

		const userData: UserType = {
			id: IdVO.createWithUUID(user.id),
			email: EmailVO.create(user.email),
			password: PasswordVO.create(user.password),
			role: RoleVO.create(user.role)
		};

		return new User(userData);
	}

	async deleteAll(): Promise<void> {
		await UserModel.destroy({ where: {}, truncate: true });
	}

}