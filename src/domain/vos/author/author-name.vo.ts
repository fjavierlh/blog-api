export class AuthorNameVO {

	static get MIN_LENGTH(): number {
		return 5;
	}
	static get MAX_LENGTH(): number {
		return 30;
	}

	private constructor(private author: string) { }

	get value(): string {
		return this.author;
	}

	static create(author: string): AuthorNameVO {

		if (author.length < this.MIN_LENGTH || author.length > this.MAX_LENGTH) {
			throw new Error(
				`El nombre del autor debe contener entre ${this.MIN_LENGTH} y ${this.MAX_LENGTH} caracteres, ${author} tiene ${author.length}`
			);
		}

		return new AuthorNameVO(author);
	}
}