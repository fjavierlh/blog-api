export class PasswordVO {
	constructor(private password: string) {}

	get value(): string {
		return this.password;
	}

	static create(password: string): PasswordVO {
		return new PasswordVO(password);
	}
}