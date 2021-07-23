export class AuthorNicknameVO {

	static get MIN_LENGTH(): number {
		return 3;
	}
	static get MAX_LENGTH(): number {
		return 10;
	}

	private constructor(private authorNickname: string) { }

	get value(): string {
		return this.authorNickname;
	}

	static create(authorNickname: string): AuthorNicknameVO {
		const inputLength = authorNickname.length;
		if (inputLength < this.MIN_LENGTH || inputLength > this.MAX_LENGTH) {
			throw new Error(
				`El nick del autor debe contener entre ${this.MIN_LENGTH} y ${this.MAX_LENGTH} caracteres, ${authorNickname} tiene ${inputLength}`
			);
		}
		return new AuthorNicknameVO(authorNickname);
	}
}