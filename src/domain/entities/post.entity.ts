import { AuthorNameVO } from '../vos/author/author-name.vo';
import { AuthorNicknameVO } from '../vos/author/author-nickname.vo';
import { IdVO } from '../vos/id.vo';
import { CommentsListVO } from '../vos/posts/comments-list.vo';
import { PostContentVO } from '../vos/posts/post-content.vo';
import { PostTitleVO } from '../vos/posts/post-title.vo';

export type PostType = {
    id: IdVO,
    author: AuthorNameVO,
    nickname: AuthorNicknameVO,
    title: PostTitleVO,
    content: PostContentVO,
    comments: CommentsListVO
}

export class Post {

	constructor(private post: PostType) { }

	get id(): IdVO {
		return this.post.id;
	}

	get author(): AuthorNameVO {
		return this.post.author;
	}

	get nickname(): AuthorNicknameVO {
		return this.post.nickname;
	}

	get title(): PostTitleVO {
		return this.post.title;
	}

	get content(): PostContentVO {
		return this.post.content;
	}

	get comments(): CommentsListVO {
		return this.post.comments;
	} 

}