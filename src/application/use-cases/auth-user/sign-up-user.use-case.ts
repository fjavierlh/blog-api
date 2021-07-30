import { Service } from 'typedi';
import { User, UserType } from '../../../domain/entities/user.entity';
import { UserService } from '../../../domain/services/user.service';
import { EmailVO } from '../../../domain/vos/auth-user/email.vo';
import { IdVO } from '../../../domain/vos/id.vo';
import { PasswordVO } from '../../../domain/vos/auth-user/password.vo';
import { SignUpRequest } from './sign-up.request';
import { Role, RoleVO } from '../../../domain/vos/auth-user/role.vo';

@Service()
export class SignUpUserUseCase {

	constructor(private userService: UserService) {}

	async execute(request: SignUpRequest): Promise<void> {

		const user: UserType = {
			id: IdVO.create(),
			email: EmailVO.create(request.email),
			password: PasswordVO.create(request.password),
			role: RoleVO.create(Role.USER)
		};

		await this.userService.persist(new User(user));
	}

}
