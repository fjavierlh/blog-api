import { Service } from 'typedi';

import { CommentPost } from '../../../domain/entities/comment-post.entity';
import { Post, PostType } from '../../../domain/entities/post.entity';
import { PostService } from '../../../domain/services/post.service';
import { AuthorNameVO } from '../../../domain/vos/author/author-name.vo';
import { AuthorNicknameVO } from '../../../domain/vos/author/author-nickname.vo';
import { IdVO } from '../../../domain/vos/id.vo';
import { CommentsListVO } from '../../../domain/vos/posts/comments-list.vo';
import { PostContentVO } from '../../../domain/vos/posts/post-content.vo';
import { PostTitleVO } from '../../../domain/vos/posts/post-title.vo';
import { IdRequest } from '../types/id.request';
import { CommentPostResponse } from './types/comment-post.response';
import { PostRequest } from './types/post.request';
import { SinglePostResponse } from './types/single-post.response';

@Service()
export class UpdatePostUseCase {

	constructor(private postService: PostService) { }

	async execute(receivedId: IdRequest, receivedPost: PostRequest): Promise<SinglePostResponse | null> {

		const idToVO = IdVO.createWithUUID(receivedId);

		const updatedPostToType: PostType = {
			id: idToVO,
			author: AuthorNameVO.create(receivedPost.author),
			nickname: AuthorNicknameVO.create(receivedPost.nickname),
			title: PostTitleVO.create(receivedPost.title),
			content: PostContentVO.create(receivedPost.content),
			comments: CommentsListVO.create([])
		};

		const updatedPost: Post = await this.postService.updatePostByID(idToVO, new Post(updatedPostToType));

		const updatedPostToResponse: SinglePostResponse = {
			id: updatedPost.id.value,
			author: updatedPost.author.value,
			nickname: updatedPost.nickname.value,
			title: updatedPost.title.value,
			content: updatedPost.content.value,
			comments: updatedPost.comments.value.map((comment: CommentPost): CommentPostResponse => {
				return {
					id: comment.id.value,
					nickname: comment.nickname.value,
					content: comment.content.value,
					date: comment.date.value
				};
			})
		};

		return updatedPostToResponse;
	}

}