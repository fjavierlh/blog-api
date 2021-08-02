export class PostTitleVO {

	static get MIN_LENGTH(): number {
		return 5;
	}
	static get MAX_LENGTH(): number {
		return 30;
	}

	private constructor(private postTitle: string) { }

	get value(): string {
		return this.postTitle;
	}

	static create(postTitle: string): PostTitleVO {
		const inputLength = postTitle.length;
		if (inputLength < this.MIN_LENGTH || inputLength > this.MAX_LENGTH) {
			throw new Error(
				`El título del post debe contener entre ${this.MIN_LENGTH} y ${this.MAX_LENGTH} caracteres, ${postTitle} tiene ${inputLength}`
			);
		}
		return new PostTitleVO(postTitle);
	}
}