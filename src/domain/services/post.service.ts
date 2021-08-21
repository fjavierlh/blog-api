import { Inject, Service } from 'typedi';
import { CommentPost } from '../entities/comment-post.entity';
import { Post } from '../entities/post.entity';
import { ExceptionWithCode } from '../exception-with-code';
import { PostRepository } from '../repositories/post.repository';
import { IdVO } from '../vos/id.vo';

@Service()
export class PostService {

	constructor(@Inject('PostRepository') private postRepository: PostRepository) { }

	async findAllPosts(): Promise<Post[]> {
		return this.postRepository.getAllPosts();
	}

	async findPostById(postID: IdVO): Promise<Post> {
		this.checkIfPostExist(postID);
		return this.postRepository.getPostByID(postID);
	}

	async savePost(newPost: Post): Promise<void> {
		await this.postRepository.persistPost(newPost);
	}

	async updatePostByID(idPost: IdVO, post: Post): Promise<Post> {
		await this.checkIfPostExist(idPost);
		return this.postRepository.updatePost(idPost, post);
	}

	async removePostById(postID: IdVO): Promise<void> {
		await this.checkIfPostExist(postID);
		await this.postRepository.deletePostByID(postID);
	}

	async commentPost(postID: IdVO, newComment: CommentPost): Promise<void> {
		await this.checkIfPostExist(postID);
		await this.postRepository.saveCommentInPost(postID, newComment);
	}

	async updateCommentPost(postID: IdVO, updatedComment: CommentPost): Promise<void> {
		await this.checkIfPostExist(postID);
		await this.postRepository.updateCommentInPost(postID, updatedComment);
	}

	async removeCommentPost(postID: IdVO, commentID: IdVO): Promise<void> {
		await this.checkIfPostExist(postID);
		await this.postRepository.deleteCommentInPost(postID, commentID);
	}

	private async checkIfPostExist(postID: IdVO): Promise<void> {
		const exist = await this.postRepository.checkIfPostExists(postID);
		if(!exist) throw new ExceptionWithCode(404, `Post with ID ${postID.value} not found`);
	}

}