export class EmailVO {
	constructor(private email:string) {}

	get value(): string {
		return this.email;
	}

	static create(email: string): EmailVO {
		return new EmailVO(email);
	}
}