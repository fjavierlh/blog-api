import Container from 'typedi';
import { User, UserType } from '../../domain/entities/user.entity';
import { UserService } from '../../domain/services/user.service';
import { EmailVO } from '../../domain/vos/auth-user/email.vo';
import { PasswordVO } from '../../domain/vos/auth-user/password.vo';
import { Role, RoleVO } from '../../domain/vos/auth-user/role.vo';
import { IdVO } from '../../domain/vos/id.vo';

const populate = async (): Promise<void> => {

	const userService = Container.get(UserService);
	const userData: UserType = {
		id: IdVO.create(),
		email: EmailVO.create('admin@hi.com'),
		password: PasswordVO.create('12345'),
		role: RoleVO.create(Role.ADMIN)

	};
	await userService.persist(new User(userData));
};

export { populate as populateDatabase };