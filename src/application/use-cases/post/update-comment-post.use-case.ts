import { Service } from 'typedi';
import { CommentPost } from '../../../domain/entities/comment-post.entity';
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
export class UpdateCommentPostUseCase {

	constructor(private postService: PostService, private offensiveWordService: OffensiveWordService) { }

	async execute(postID: IdRequest, commentID: IdRequest, updatedComment: CommentPostRequest): Promise<void> {		
		await this.offensiveWordService.chekWordsInComment(
			CommentContentVO.create(updatedComment.content),
			LevelVO.create(parseEnvVariableToNumber(process.env.OFFENSIVE_WORD_LEVEL ?? '5'))
		);
		
		
		return this.postService.updateCommentPost(
			IdVO.createWithUUID(postID),
			new CommentPost({
				id: IdVO.createWithUUID(commentID),
				nickname: CommentNicknameVO.create(updatedComment.nickname),
				content: CommentContentVO.create(updatedComment.content),
				date: CommentDateVO.create()
			})
		);
	}
}