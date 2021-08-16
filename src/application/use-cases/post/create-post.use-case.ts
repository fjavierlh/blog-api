import { Service } from 'typedi';
import { Post, PostType } from '../../../domain/entities/post.entity';
import { PostService } from '../../../domain/services/post.service';
import { AuthorNameVO } from '../../../domain/vos/author/author-name.vo';
import { AuthorNicknameVO } from '../../../domain/vos/author/author-nickname.vo';
import { IdVO } from '../../../domain/vos/id.vo';
import { CommentsListVO } from '../../../domain/vos/posts/comments-list.vo';
import { PostContentVO } from '../../../domain/vos/posts/post-content.vo';
import { PostTitleVO } from '../../../domain/vos/posts/post-title.vo';
import { PostRequest } from './types/post.request';

@Service()
export class CreatePostUseCase {
	constructor(private postService: PostService) { }

	async execute(newPost: PostRequest): Promise<void> {
        
		const postToType: PostType = {
			id: IdVO.create(),
			author: AuthorNameVO.create(newPost.author),
			nickname: AuthorNicknameVO.create(newPost.nickname),
			title: PostTitleVO.create(newPost.title),
			content: PostContentVO.create(newPost.content),
			comments: CommentsListVO.create([])
		};


		this.postService.savePost(new Post(postToType));

	}
}