export class CommentDateVO {

	private constructor(private commentDate: Date) {}

	get value(): string {
		return this.commentDate.getTime().toString();
	}

	static create(): CommentDateVO {
		return new CommentDateVO(new Date());
	}

	static createWithDate(date: string): CommentDateVO {
		return new CommentDateVO(new Date(+date));
	}

}