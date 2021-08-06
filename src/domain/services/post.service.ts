import { Inject, Service } from 'typedi';
import { CommentPost } from '../entities/comment-post.entity';
import { Post } from '../entities/post.entity';
import { PostRepository } from '../repositories/post.repository';
import { IdVO } from '../vos/id.vo';

@Service()
export class PostService {

	constructor(@Inject('PostRepository') private postRepository: PostRepository) { }

	async findAllPosts(): Promise<Post[]> {
		return this.postRepository.getAllPosts();
	}

	async findPostById(postId: IdVO): Promise<Post|null> {
		const post = this.postRepository.getPostByID(postId);
		return post;
	}

	async savePost(post: Post): Promise<void> {
		await this.postRepository.persistPost(post);
	}

	async updatePostById(idPost: IdVO, post: Post): Promise<void> {
		await this.postRepository.updatePost(idPost, post);
	}

	async removePostById(idPost: IdVO): Promise<void> {
		await this.postRepository.deletePostById(idPost);
	}

	async commentPost(idPost: IdVO, comment: CommentPost): Promise<void> {
		await this.postRepository.saveCommentInPost(idPost, comment);
	}

	async updateCommentPost(idPost: IdVO, updatedComment: CommentPost): Promise<void> {
		await this.postRepository.saveCommentInPost(idPost, updatedComment);
	}

	async removeCommentPost(idPost: IdVO, updatedComment: CommentPost): Promise<void> {
		await this.postRepository.saveCommentInPost(idPost, updatedComment);
	}

}