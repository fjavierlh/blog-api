import { CommentContentVO } from '../vos/comments/comment-content.vo';
import { CommentDateVO } from '../vos/comments/comment-date.vo';
import { CommentNicknameVO } from '../vos/comments/comment-nickname.vo';
import { IdVO } from '../vos/id.vo';

export type CommentPostType = {
    id: IdVO;
	nickname: CommentNicknameVO;
	content: CommentContentVO;
	date: CommentDateVO;
}

export class CommentPost {
	constructor(private comment: CommentPostType) {}

	get id(): IdVO {
		return this.comment.id;
	}

	get nickname(): CommentNicknameVO {
		return this.comment.nickname;
	}

	get content(): CommentContentVO {
		return this.comment.content;
	}

	get date(): CommentDateVO {
		return this.comment.date;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	toAnyType(): any {
		return {
			id: this.comment.id.value,
			nickname: this.comment.nickname.value,
			content: this.comment.content.value,
			date: this.comment.date.value
		};
	}
}