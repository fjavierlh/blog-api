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

	async getPostByID(postID: IdVO): Promise<Post> {
		const searchedPost: AnyObject = await this.getPostModel(postID);
		const postType: PostType = this.castPostSchemaToType(searchedPost);
		return new Post(postType);
	}

	async persistPost(post: Post): Promise<void> {
		const newPost: AnyObject = post.toAnyType();
		const postModel = new PostModel(newPost);
		await postModel.save();
	}

	async updatePost(postID: IdVO, post: Post): Promise<Post> {
		const { id, author, nickname, title, content }: AnyObject = post.toAnyType();
		const updatedPost = { id, author, nickname, title, content };
		const returnedPost: AnyObject = await PostModel.findOneAndUpdate({ id: postID.value }, updatedPost);
		const returnedPostToType: PostType = this.castPostSchemaToType(returnedPost);
		return new Post(returnedPostToType);
	}

	async deletePostByID(postID: IdVO): Promise<void> {
		await PostModel.deleteOne({ id: postID.value }).exec();
	}

	async saveCommentInPost(postID: IdVO, comment: CommentPost): Promise<void> {
		const searchedPost: AnyObject = await this.getPostModel(postID);
		const newComment = {
			id: comment.id.value,
			nickname: comment.nickname.value,
			content: comment.content.value,
			date: comment.date.value
		};
		await searchedPost.comments.push(newComment);
		await searchedPost.save();
	}

	async updateCommentInPost(postID: IdVO, updatedComment: CommentPost): Promise<void> {
		const query = { id: postID.value, 'comments.id': updatedComment.id.value };
		const updatedDocument = {
			$set: {
				'comments.$.nickname': updatedComment.nickname.value,
				'comments.$.content': updatedComment.content.value,
				'comments.$.date': updatedComment.date.value
			}
		};
		await PostModel.updateOne(query, updatedDocument);
	}

	async deleteCommentInPost(postID: IdVO, commentID: IdVO): Promise<void> {
		await PostModel.updateOne(
			{ id: postID.value },
			{
				$pull: {
					comments: { id: commentID.value }
				}
			}
		);
	}

	async checkIfPostExists(id: IdVO): Promise<boolean> {
		return PostModel.exists({ id: id.value });
	}

	async checkIfCommentPostExists(postID: IdVO, commentID: IdVO): Promise<boolean> {
		return PostModel.exists({ id: postID.value, 'comments.id': commentID.value });
	}

	// Class utils
	private async getPostModel(postID: IdVO): Promise<AnyObject> {
		return PostModel.findOne({ id: postID.value }).exec();
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