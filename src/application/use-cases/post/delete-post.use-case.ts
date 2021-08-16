import { Service } from 'typedi';
import { PostService } from '../../../domain/services/post.service';
import { IdVO } from '../../../domain/vos/id.vo';
import { IdRequest } from '../types/id.request';

@Service()
export class DeletePostUseCase {

	constructor(private postService: PostService) { }

	async execute(id: IdRequest): Promise<void> {
		await this.postService.removePostById(IdVO.createWithUUID(id));
	}
}