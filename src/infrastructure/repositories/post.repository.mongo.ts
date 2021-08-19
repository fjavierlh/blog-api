import { AnyObject } from 'mongoose';
import { CommentPost } from '../../domain/entities/comment-post.entity';
import { Post, PostType } from '../../domain/entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository';
import { AuthorNameVO } from '../../domain/vos/author/author-name.vo';
import { AuthorNicknameVO } from '../../domain/vos/author/author-nickname.vo';
import { CommentContentVO } from '../../domain/vos/comments/comment-content.vo';
import { CommentDateVO } from '../../domain/vos/comments/comment-date.vo';
import { CommentNicknameVO } from '../../domain/vos/comments/comment-nickname.vo';
import { IdVO } from '../../domain/vos/id.vo';
import { CommentsListVO } from '../../domain/vos/posts/comments-list.vo';
import { PostContentVO } from '../../domain/vos/posts/post-content.vo';
import { PostTitleVO } from '../../domain/vos/posts/post-title.vo';
import { PostModel } from './post.schema';

export class PostRepositoryMongo implements PostRepository {

	async getAllPosts(): Promise<Post[]> {
		const allPostsData = await PostModel.find().exec();

		return allPostsData.map((post: AnyObject) => {
			const postToType: PostType = this.castPostSchemaToType(post);
			return new Post(postToType);
		});
	}

	async getPostByID(postId: IdVO): Promise<Post | null> {

		const searchedPost: AnyObject = await this.getPostModel(postId);
		if (!searchedPost) return null;

		const postType: PostType = this.castPostSchemaToType(searchedPost);
		return new Post(postType);
	}

	async persistPost(post: Post): Promise<void> {
		const newPost = this.castPostEntityToAnyObject(post);
		const postModel = new PostModel(newPost);
		await postModel.save();
	}

	async updatePost(postId: IdVO, post: Post): Promise<Post | null> {
		const updatedPost = this.castPostEntityToAnyObject(post);
		const returnedPost: AnyObject = await PostModel.findOneAndUpdate({ id: postId.value }, updatedPost);

		if (!returnedPost)
			return null;

		const returnedPostToType: PostType = this.castPostSchemaToType(returnedPost);
		return new Post(returnedPostToType);
	}

	async deletePostById(postId: IdVO): Promise<void> {
		await PostModel.deleteOne({ id: postId.value }).exec();
	}

	async saveCommentInPost(postId: IdVO, comment: CommentPost): Promise<void | null> {
		const searchedPost: AnyObject = await this.getPostModel(postId);

		if (!searchedPost)
			return null;

		const newComment = {
			id: comment.id.value,
			nickname: comment.nickname.value,
			content: comment.content.value,
			date: comment.date.value
		};

		await searchedPost.comments.push(newComment);
		await searchedPost.save();
	}

	async updateCommentInPost(postId: IdVO, updatedComment: CommentPost): Promise<void | null> {
		const query = { id: postId.value, 'comments.id': updatedComment.id.value };
		const updatedDocument = {
			$set: {
				'comments.$.nickname': updatedComment.nickname.value,
				'comments.$.content': updatedComment.content.value,
				'comments.$.date': updatedComment.date.value
			}
		};

		const { nModified: updateResult }: AnyObject = await PostModel.updateOne(query, updatedDocument);

		if (!updateResult) return null;
	}

	async deleteCommentInPost(postId: IdVO, commentId: IdVO): Promise<void | null> {
		const { nModified: deleteResult }: AnyObject = await PostModel.updateOne(
			{ id: postId.value },
			{ $pull: {
				comments: { id: commentId.value }
			}}
		);
		if (!deleteResult) return null;
	}

	// Class utils
	private async getPostModel(postId: IdVO): Promise<AnyObject> {
		return PostModel.findOne({ id: postId.value }).exec();
	}

	private castPostEntityToAnyObject(post: Post): AnyObject {
		return {
			id: post.id.value,
			author: post.author.value,
			nickname: post.nickname.value,
			title: post.title.value,
			content: post.content.value,
			comments: post.comments.value.map((c) => {
				return {
					id: c.id.value,
					nickname: c.nickname.value,
					content: c.content.value,
					date: c.date.value
				};
			})
		};
	}

	private castPostSchemaToType(post: AnyObject): PostType {
		return {
			id: IdVO.createWithUUID(post.id),
			author: AuthorNameVO.create(post.author),
			nickname: AuthorNicknameVO.create(post.nickname),
			title: PostTitleVO.create(post.title),
			content: PostContentVO.create(post.content),
			comments: CommentsListVO.create(post.comments.map((c: AnyObject) => {
				return new CommentPost({
					id: IdVO.createWithUUID(c.id),
					nickname: CommentNicknameVO.create(c.nickname),
					content: CommentContentVO.create(c.content),
					date: CommentDateVO.createWithDate(c.date)
				});
			}))
		};
	}

}