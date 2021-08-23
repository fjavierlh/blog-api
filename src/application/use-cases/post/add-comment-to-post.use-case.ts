import { Service } from 'typedi';
import { CommentPost, CommentPostType } from '../../../domain/entities/comment-post.entity';
import { OffensiveWordService } from '../../../domain/services/offensive-word.service';
import { PostService } from '../../../domain/services/post.service';
import { CommentContentVO } from '../../../domain/vos/comments/comment-content.vo';
import { CommentDateVO } from '../../../domain/vos/comments/comment-date.vo';
import { CommentNicknameVO } from '../../../domain/vos/comments/comment-nickname.vo';
import { IdVO } from '../../../domain/vos/id.vo';
import { LevelVO } from '../../../domain/vos/offensive-word/level.vo';
import { parseEnvVariableToNumber } from '../../../utils/parse-env-variable-to-number.util';
import { IdRequest } from '../types/id.request';
import { CommentPostRequest } from './types/comment-post.request';

@Service()
export class AddCommentToPostUseCase {

	constructor(private postService: PostService, private offensiveWordService: OffensiveWordService) { }

	async execute(postID: IdRequest, comment: CommentPostRequest): Promise<IdRequest> {
		
		await this.offensiveWordService.chekWordsInComment(
			CommentContentVO.create(comment.content),
			LevelVO.create(parseEnvVariableToNumber(process.env.OFFENSIVE_WORD_LEVEL ?? '5'))
		);
        
		const commentToType: CommentPostType = {
			id: IdVO.create(),
			nickname: CommentNicknameVO.create(comment.nickname),
			content: CommentContentVO.create(comment.content),
			date: CommentDateVO.create()
		};

		await this.postService.commentPost(IdVO.createWithUUID(postID), new CommentPost(commentToType));
		return commentToType.id.value;
	}
}