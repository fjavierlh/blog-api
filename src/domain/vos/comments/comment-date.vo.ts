export class CommentDateVO {

	private constructor(private commentDate: Date) { }

	get value(): number {
		return this.commentDate.getTime();
	}

	static create(commentDate: Date): CommentDateVO {
		return new CommentDateVO(commentDate);
	}

}