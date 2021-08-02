export class CommentNicknameVO {

	static get MIN_LEGTH(): number {
		return 10;
	}

	get value(): string {
		return this.nickname;
	}

	private constructor(private nickname: string) {}

	static create(nickname: string): CommentNicknameVO {

		if (nickname.length < this.MIN_LEGTH) {
			throw new Error(
				`El nickname debe contener al menos ${this.MIN_LEGTH} caracteres, actualmente tiene ${nickname.length}`
			);
		}
		return new CommentNicknameVO(nickname);        
	}

}