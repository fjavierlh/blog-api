import { Service } from 'typedi';
import { CommentPost } from '../../../domain/entities/comment-post.entity';
import { Post } from '../../../domain/entities/post.entity';
import { IdVO } from '../../../domain/vos/id.vo';
import { IdRequest } from '../types/id.request';
import { PostService } from './../../../domain/services/post.service';
import { SinglePostResponse } from './types/single-post.response';

@Service()
export class FindPostByIdUseCase {

	constructor(private postService: PostService) { }

	async execute(idPost: IdRequest): Promise<SinglePostResponse | null> {
		const expectedPost: Post | null = await this.postService.findPostById(IdVO.createWithUUID(idPost));
		if (!expectedPost)
			return null;
		return {
			id: expectedPost.id.value,
			author: expectedPost.author.value,
			nickname: expectedPost.nickname.value,
			title: expectedPost.title.value,
			content: expectedPost.content.value,
			comments: expectedPost.comments.value.map((c: CommentPost) => {
				return {
					id : c.id.value,
					nickname: c.nickname.value,
					content: c.content.value,
					date: c.date.value
				};
			})
		};
	}
}