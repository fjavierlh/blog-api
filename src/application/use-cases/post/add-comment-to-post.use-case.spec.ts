import 'reflect-metadata';
import Container from 'typedi';
import { CommentPost } from '../../../domain/entities/comment-post.entity';
import { Post } from '../../../domain/entities/post.entity';
import { AuthorNameVO } from '../../../domain/vos/author/author-name.vo';
import { AuthorNicknameVO } from '../../../domain/vos/author/author-nickname.vo';
import { CommentContentVO } from '../../../domain/vos/comments/comment-content.vo';
import { CommentDateVO } from '../../../domain/vos/comments/comment-date.vo';
import { CommentNicknameVO } from '../../../domain/vos/comments/comment-nickname.vo';
import { IdVO } from '../../../domain/vos/id.vo';
import { CommentsListVO } from '../../../domain/vos/posts/comments-list.vo';
import { PostContentVO } from '../../../domain/vos/posts/post-content.vo';
import { PostTitleVO } from '../../../domain/vos/posts/post-title.vo';
import { PostRepositoryMongo } from '../../../infrastructure/repositories/post.repository.mongo';
import { IdRequest } from '../types/id.request';
import { CommentPostRequest } from './types/comment-post.request';
import { AddCommentToPostUseCase } from './add-comment-to-post.use-case';

jest.mock('./../../../infrastructure/repositories/post.repository.mongo', () => {
	return {
		PostRepositoryMongo: jest.fn().mockImplementation(() => {
			return {
				saveCommentInPost: jest.fn(),
				getPostByID: jest.fn().mockImplementation(() =>
					new Post({
						id: IdVO.createWithUUID('cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668'),
						author: AuthorNameVO.create('Anónimo'),
						nickname: AuthorNicknameVO.create('anonymus'),
						title: PostTitleVO.create('An anonymus post'),
						content: PostContentVO.create('loremimpsum'.repeat(6)),
						comments: CommentsListVO.create([
							new CommentPost({
								id: IdVO.create(),
								nickname: CommentNicknameVO.create('paquito85'),
								content: CommentContentVO.create('Un comentario cualquiera'),
								date: CommentDateVO.create()
							})
						])
					})
				)
			};
		})
	};
});

describe('AddCommentToPostUseCase', () => {

	it('should add a comment to existent post', async () => {
		const repository = new PostRepositoryMongo();
		Container.set('PostRepository', repository);

		const useCase = Container.get(AddCommentToPostUseCase);
		const validId: IdRequest = 'cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668';
		const comment: CommentPostRequest = {
			nickname: 'validNick',
			content: 'This is a valid comment',
		};
		await useCase.execute(validId, comment);
		expect(repository.saveCommentInPost).toHaveBeenCalled();
	});

});