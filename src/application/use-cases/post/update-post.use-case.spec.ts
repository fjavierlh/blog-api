import 'reflect-metadata';
import Container from 'typedi';

import { Post } from '../../../domain/entities/post.entity';
import { AuthorNameVO } from '../../../domain/vos/author/author-name.vo';
import { AuthorNicknameVO } from '../../../domain/vos/author/author-nickname.vo';
import { IdVO } from '../../../domain/vos/id.vo';
import { CommentsListVO } from '../../../domain/vos/posts/comments-list.vo';
import { PostContentVO } from '../../../domain/vos/posts/post-content.vo';
import { PostTitleVO } from '../../../domain/vos/posts/post-title.vo';
import { PostRepositoryMongo } from '../../../infrastructure/repositories/post.repository.mongo';
import { IdRequest } from '../types/id.request';
import { PostRequest } from './types/post.request';
import { SinglePostResponse } from './types/single-post.response';
import { UpdatePostUseCase } from './update-post.use-case';

jest.mock('./../../../infrastructure/repositories/post.repository.mongo', () => {
	return {
		PostRepositoryMongo: jest.fn().mockImplementation(() => {
			return {
				updatePost: jest.fn().mockImplementation(() =>
					new Post({
						id: IdVO.createWithUUID('cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668'),
						author: AuthorNameVO.create('Conocido'),
						nickname: AuthorNicknameVO.create('conocido'),
						title: PostTitleVO.create('An updated post'),
						content: PostContentVO.create('ipsumlorem'.repeat(6)),
						comments: CommentsListVO.create([])
					})
				),
				getPostByID: jest.fn().mockImplementation(() =>
					new Post({
						id: IdVO.createWithUUID('cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668'),
						author: AuthorNameVO.create('Anónimo'),
						nickname: AuthorNicknameVO.create('anonymus'),
						title: PostTitleVO.create('An anonymus post'),
						content: PostContentVO.create('loremimpsum'.repeat(6)),
						comments: CommentsListVO.create([])
					})
				)
			};
		})
	};
});

describe('UpdatePostUseCase test suite', () => {

	it('should update a post', async () => {
		const repository = new PostRepositoryMongo();
		Container.set('PostRepository', repository);

		const useCase: UpdatePostUseCase = Container.get(UpdatePostUseCase);
		const validId: IdRequest = 'cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668';
		const updatedPost: PostRequest = {
			author: 'Conocido',
			nickname: 'conocido',
			title: 'An updated post',
			content: 'ipsumlorem'.repeat(6),
		};

		const expectedUpdatedPost: SinglePostResponse | null = await useCase.execute(validId, updatedPost);
		
		if (expectedUpdatedPost) {
			console.log('expectedUpdatedPost:', expectedUpdatedPost);
			expect(expectedUpdatedPost).not.toBeNull();
			expect(expectedUpdatedPost.id).toBe(validId);
			expect(expectedUpdatedPost.author).toBe(updatedPost.author);
			expect(expectedUpdatedPost.nickname).toBe(updatedPost.nickname);
			expect(expectedUpdatedPost.title).toBe(updatedPost.title);
			expect(expectedUpdatedPost.content).toBe(updatedPost.content);
		}

	});

});