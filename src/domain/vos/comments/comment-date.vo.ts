export class CommentDateVO {

	private constructor(private commentDate: Date) { }

	get value(): string {
		return this.commentDate.getTime().toString();
	}

	static create(commentDate: Date): CommentDateVO {
		return new CommentDateVO(commentDate);
	}

}