import { AnyObject } from 'mongoose';
import { CommentPost } from '../../domain/entities/comment-post.entity';
import { Post, PostType } from '../../domain/entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository';
import { AuthorNameVO } from '../../domain/vos/author/author-name.vo';
import { AuthorNicknameVO } from '../../domain/vos/author/author-nickname.vo';
import { IdVO } from '../../domain/vos/id.vo';
import { CommentsListVO } from '../../domain/vos/posts/comments-list.vo';
import { PostContentVO } from '../../domain/vos/posts/post-content.vo';
import { PostTitleVO } from '../../domain/vos/posts/post-title.vo';
import { PostModel } from './post.schema';

export class PostRepositoryMongo implements PostRepository {

	async getAllPosts(): Promise<Post[]> {
		const allPostsData = await PostModel.find().exec();
		return allPostsData.map((post: AnyObject) => {
			const postToType: PostType = {
				id: IdVO.createWithUUID(post.id),
				author: AuthorNameVO.create(post.author),
				nickname: AuthorNicknameVO.create(post.nickname),
				title: PostTitleVO.create(post.title),
				content: PostContentVO.create(post.content),
				comments: CommentsListVO.create(post.comments.comments)
			};
			console.log('postToType=', postToType);
			return new Post(postToType);
		});
	}

	async getPostByID(postId: IdVO): Promise<Post | null> {
		const searchedPost: AnyObject = await PostModel.findOne({ id: postId.value }).exec();
		if (!searchedPost) return null;

		const postType: PostType = {
			id: IdVO.createWithUUID(searchedPost.id),
			author: AuthorNameVO.create(searchedPost.author),
			nickname: AuthorNicknameVO.create(searchedPost.nickname),
			title: PostTitleVO.create(searchedPost.title),
			content: PostContentVO.create(searchedPost.content),
			comments: CommentsListVO.create(searchedPost.comments.comments)
		};

		return new Post(postType);
	}

	async persistPost(post: Post): Promise<void> {

		const newPost = {
			id: post.id.value,
			author: post.author.value,
			nickname: post.nickname.value,
			title: post.title.value,
			content: post.content.value,
			comments: post.comments
		};

		const postModel = new PostModel(newPost);

		await postModel.save();

	}
	async updatePost(postId: IdVO, updatedPost: Post): Promise<Post> {
		
		const updatedPostToType = {
			author: updatedPost.author,
			nickname: updatedPost.nickname,
			title: updatedPost.title,
			content: updatedPost.content,
			comments: updatedPost.comments
		};

		console.log('updatedPostToType', updatedPostToType);
		const returnedPost: AnyObject = await PostModel.findOneAndUpdate({ id: postId.value }, updatedPostToType);
		console.log('returnedPost:', returnedPost);

		const returnedPostToType: PostType = {
			id: returnedPost.id,
			author: returnedPost.author,
			nickname: returnedPost.nickname,
			title: returnedPost.title,
			content: returnedPost.content,
			comments: returnedPost.comments
		};

		return new Post(returnedPostToType);

	}

	deletePostById(postId: IdVO): Promise<void> {
		throw new Error('Method not implemented.');
	}

	saveCommentInPost(postId: IdVO, comment: CommentPost): Promise<void> {
		throw new Error('Method not implemented.');
	}

	updateCommentInPost(postId: IdVO, updatedComment: CommentPost): Promise<void> {
		throw new Error('Method not implemented.');
	}
	deleteCommentInPost(postId: IdVO, commentId: IdVO): Promise<void> {
		throw new Error('Method not implemented.');
	}

}