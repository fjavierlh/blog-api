import { CommentPost } from '../../entities/comment-post.entity';


export class CommentsListVO {
	static get MIN_LEGTH(): number {
		return 0;
	}

	static get MAX_LEGTH(): number {
		return 10;
	}

	private constructor(private comments: CommentPost[]) { }

	get value(): CommentPost[] {
		return this.comments;
	}

	static create(comments: CommentPost[]): CommentsListVO {

		if (comments.length < this.MIN_LEGTH || comments.length > this.MAX_LEGTH) {
			throw new Error(
				`La lista de comentarios debe contener entre ${this.MIN_LEGTH} y ${this.MAX_LEGTH}, actualmente contiene ${comments.length}`
			);
		}

		return new CommentsListVO(comments);
	}
}