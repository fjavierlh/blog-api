import { IdVO } from '../vos/id.vo';

export type CommentType = {
    id: IdVO;
    nickname: string;
    content: string;
    date: number;
}

export class CommentPost {
	private constructor(private comment: CommentType) {}

	get id(): string {
		return this.id;
	}

	get nickname(): string {
		return this.nickname;
	}

	get content(): string {
		return this.content;
	}

	get date(): number {
		return this.date;
	}
}