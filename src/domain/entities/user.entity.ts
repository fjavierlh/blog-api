import { EmailVO } from '../vos/auth-user/email.vo';
import { IdVO } from '../vos/id.vo';
import { PasswordVO } from '../vos/auth-user/password.vo';
import { RoleVO } from '../vos/auth-user/role.vo';

export type UserType = {
    id: IdVO,
    email: EmailVO,
    password: PasswordVO,
	role: RoleVO
}

export class User {

	constructor(private user: UserType) { }

	get id(): IdVO {
		return this.user.id;
	}

	get email(): EmailVO {
		return this.user.email;
	}

	get password(): PasswordVO {
		return this.user.password;
	}

	get role(): RoleVO {
		return this.user.role;
	}

}