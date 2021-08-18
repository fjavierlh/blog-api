import { Service } from 'typedi';
import { CommentPost, CommentPostType } from '../../../domain/entities/comment-post.entity';
import { PostService } from '../../../domain/services/post.service';
import { CommentContentVO } from '../../../domain/vos/comments/comment-content.vo';
import { CommentDateVO } from '../../../domain/vos/comments/comment-date.vo';
import { CommentNicknameVO } from '../../../domain/vos/comments/comment-nickname.vo';
import { IdVO } from '../../../domain/vos/id.vo';
import { IdRequest } from '../types/id.request';
import { CommentPostRequest } from './types/comment-post.request';

@Service()
export class AddCommentToPostUseCase {

	constructor(private postService: PostService) { }

	async execute(postID: IdRequest, comment: CommentPostRequest): Promise<void> {
        
		const commentToType: CommentPostType = {
			id: IdVO.create(),
			nickname: CommentNicknameVO.create(comment.nickname),
			content: CommentContentVO.create(comment.content),
			date: CommentDateVO.create()
		};

		await this.postService.commentPost(IdVO.createWithUUID(postID), new CommentPost(commentToType));
	}
}