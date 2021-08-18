import { Service } from 'typedi';
import { PostService } from '../../../domain/services/post.service';
import { IdVO } from '../../../domain/vos/id.vo';
import { IdRequest } from '../types/id.request';

@Service()
export class RemoveCommentPostUseCase {

	constructor(private postService: PostService) { }

	async execute(postId: IdRequest, commentId: IdRequest): Promise<void> {
		await this.postService.removeCommentPost(
			IdVO.createWithUUID(postId),
			IdVO.createWithUUID(commentId)
		);
	}
}