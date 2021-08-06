export class CommentNicknameVO {

	static get MIN_LENGTH(): number {
		return 3;
	}
	static get MAX_LENGTH(): number {
		return 10;
	}

	get value(): string {
		return this.nickname;
	}

	private constructor(private nickname: string) {}

	static create(nickname: string): CommentNicknameVO {

		if (nickname.length < this.MIN_LENGTH || nickname.length > this.MAX_LENGTH) {
			throw new Error(
				`El nick del autor debe contener entre ${this.MIN_LENGTH} y ${this.MAX_LENGTH} caracteres, ${nickname} tiene ${nickname.length}`
			);
		}
		return new CommentNicknameVO(nickname);        
	}

}