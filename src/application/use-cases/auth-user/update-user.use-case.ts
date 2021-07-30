import { Service } from 'typedi';
import { User, UserType } from '../../../domain/entities/user.entity';
import { ExceptionWithCode } from '../../../domain/exception-with-code';
import { UserService } from '../../../domain/services/user.service';
import { EmailVO } from '../../../domain/vos/auth-user/email.vo';
import { PasswordVO } from '../../../domain/vos/auth-user/password.vo';
import { EmailRequest } from './email.request';
import { UpdateUserRequest } from './update-user.request';
import bcrypt from 'bcrypt';
import { REAL } from 'sequelize';
import { Role, RoleVO } from '../../../domain/vos/auth-user/role.vo';

@Service()
export class UpdateUserUseCase {

	constructor(private userService: UserService) { }

	async execute(email: EmailRequest, updatedUser: UpdateUserRequest): Promise<void> {

		const emailToVO = EmailVO.create(email);
		const user: User | null = await this.userService.findByEmail(emailToVO);

		if (!user) throw new ExceptionWithCode(404, `User with email ${email} not found`);

		const { email: updatedEmail, password: updatedPassword } = updatedUser;
		
		let newPaswordHashed = null;
        
		if (updatedPassword) {
			newPaswordHashed = await bcrypt.hash(updatedPassword, 10);
		}

		const updatedUserType: UserType = {
			id: user.id,
			email: EmailVO.create(updatedEmail ?? user.email.value),
			password: PasswordVO.create(newPaswordHashed ?? user.password.value),
			role: RoleVO.create(Role.USER)
		};

		await this.userService.updateByEmail(emailToVO, new User(updatedUserType));
	}

}