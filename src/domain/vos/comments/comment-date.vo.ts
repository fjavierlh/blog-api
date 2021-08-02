export class CommentDate {

	private constructor(private commentDate: Date) { }

	get value(): number {
		return this.commentDate.getTime();
	}

	static create(commentDate: Date): CommentDate {
		return new CommentDate(commentDate);
	}

}