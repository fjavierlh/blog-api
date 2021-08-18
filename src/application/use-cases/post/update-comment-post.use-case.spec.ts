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
import { CommentPostRequest } from './types/comment-post.request';
import { UpdateCommentPostUseCase } from './update-comment-post.use-case';
jest.mock('./../../../infrastructure/repositories/post.repository.mongo');

describe('UpdateCommentPostUseCase test suite', () => {

	it('should update an comment post', async () => {

		const repository = new PostRepositoryMongo();
		Container.set('PostRepository', repository);

		const useCase = Container.get(UpdateCommentPostUseCase);
		const validPostId = 'cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668';
		const validCommentId = 'f2dd593e-af8e-4754-bed3-b42d2cfce636';
		const updatedComment: CommentPostRequest = {
			nickname: 'paquito86',
			content: 'An updated comment',
		};

		await useCase.execute(validPostId, validCommentId, updatedComment);
		expect(repository.updateCommentInPost).toBeCalled();
	});
});