import { User } from '../../../domain/entities/user.entity';
import { ExceptionWithCode } from '../../../domain/exception-with-code';
import { UserService } from '../../../domain/services/user.service';
import { EmailVO } from '../../../domain/vos/auth-user/email.vo';
import { PasswordVO } from '../../../domain/vos/auth-user/password.vo';
import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { SignInRequest } from './sign-in.request';

@Service()
export class SignInUserUseCase {

	constructor(private userService: UserService) { }

	async execute(request: SignInRequest): Promise<string|null > {
		const user: User | null = await this.userService.findByEmail(EmailVO.create(request.email));

		if(!user) throw new ExceptionWithCode(404, 'User not found');

		const plainPass = PasswordVO.create(request.password);
		const isValid = await this.userService.isValidPassword(plainPass, user);

		if(!isValid) {
			return jwt.sign({
				email: user.email.value,
			},
			'my-secret',
			{
				expiresIn: 86400 //24 horas
			});
		}
        
		return null;

	}

}

