export class AuthorVO {
	private constructor(private author: string) {}

	get value(): string {
		return this.author;
	}

	static create(author: string): AuthorVO {

		if (author.length < 5 || author.length > 30) {
			throw new Error(
				`El nombre del autor debe contener entre 5 y 30 caracteres, ${author} tiene ${author.length}`
			);
		}

		return new AuthorVO(author);
	}
}