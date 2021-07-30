import { Inject, Service } from 'typedi';
import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import { User, UserType } from '../entities/user.entity';
import { PasswordVO } from '../vos/auth-user/password.vo';
import { EmailVO } from '../vos/auth-user/email.vo';
import { ExceptionWithCode } from '../exception-with-code';

@Service()
export class UserService {

	constructor(@Inject('UserRepository') private userRepository: UserRepository) {	}

	async isValidPassword(password: PasswordVO, user: User): Promise<boolean> {
		return bcrypt.compare(password.value, user.password.value);
	}

	async persist(user: User): Promise<void> {

		const hash = await bcrypt.hash(user.password.value, 10);
		const encryptedPassword = PasswordVO.create(hash);

		const newUser: UserType = {
			id: user.id,
			email: user.email,
			password: encryptedPassword
		};

		await this.userRepository.saveUser(new User(newUser));
	}

	async findByEmail(email: EmailVO): Promise<User|null> {
		return this.userRepository.getUserByEmail(email);
	}

	async updateByEmail(email: EmailVO, updatedUser: UserType): Promise<void|null> {
		await this.checkIfEmailExist(email);
		await this.userRepository.updateUserByEmail(email, new User(updatedUser)); 
	}

	private async checkIfEmailExist(email: EmailVO): Promise<void> {
		const user = await this.userRepository.getUserByEmail(email);
		if(!user) throw new ExceptionWithCode(404, `Doens't exist user with email ${email.value}`);
	}

}