import { Service } from 'typedi';
import { CommentPost } from '../../../domain/entities/comment-post.entity';
import { PostService } from '../../../domain/services/post.service';
import { CommentContentVO } from '../../../domain/vos/comments/comment-content.vo';
import { CommentDateVO } from '../../../domain/vos/comments/comment-date.vo';
import { CommentNicknameVO } from '../../../domain/vos/comments/comment-nickname.vo';
import { IdVO } from '../../../domain/vos/id.vo';
import { IdRequest } from '../types/id.request';
import { CommentPostRequest } from './types/comment-post.request';

@Service()
export class UpdateCommentPostUseCase {

	constructor(private postService: PostService) { }

	async execute(idPost: IdRequest, idComment: IdRequest, updatedComment: CommentPostRequest): Promise<void|null> {		
		return this.postService.updateCommentPost(
			IdVO.createWithUUID(idPost),
			new CommentPost({
				id: IdVO.createWithUUID(idComment),
				nickname: CommentNicknameVO.create(updatedComment.nickname),
				content: CommentContentVO.create(updatedComment.content),
				date: CommentDateVO.create()
			})
		);
	}
}