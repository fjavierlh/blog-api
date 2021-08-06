import { Service } from 'typedi';
import { Post } from '../../../domain/entities/post.entity';
import { PostService } from './../../../domain/services/post.service';
import { AllPostResponse } from './all-post.response';

@Service()
export class FindAllPostsUseCase {

	constructor(private postService: PostService) { }

	async execute(): Promise<AllPostResponse[]> {
		const allPosts: Post[] = await this.postService.findAllPosts();

		const allPostsToResponse: AllPostResponse[] = allPosts.map((post: Post) => {
			return {
				id: post.id.value,
				author: post.author.value,
				nickname: post.nickname.value,
				title: post.title.value,
				content: post.content.value
			};	
		});
		return allPostsToResponse;
	}
}