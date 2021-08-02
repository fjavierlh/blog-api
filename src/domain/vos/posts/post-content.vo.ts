export class PostContentVO {

	static get MIN_LENGTH(): number {
		return 50;
	}
	static get MAX_LENGTH(): number {
		return 300;
	}

	private constructor(private postText: string) { }

	get value(): string {
		return this.postText;
	}

	static create(postText: string): PostContentVO {
		const inputLength = postText.length;
		if (inputLength < this.MIN_LENGTH || inputLength > this.MAX_LENGTH) {
			throw new Error(
				`El texto del post debe contener entre ${this.MIN_LENGTH} y ${this.MAX_LENGTH} caracteres, ${postText} tiene ${inputLength}`
			);
		}
		return new PostContentVO(postText);
	}
}