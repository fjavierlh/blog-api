import 'reflect-metadata';
import Container from 'typedi';
import { Post } from '../../../domain/entities/post.entity';
import { AuthorNameVO } from '../../../domain/vos/author/author-name.vo';
import { AuthorNicknameVO } from '../../../domain/vos/author/author-nickname.vo';
import { IdVO } from '../../../domain/vos/id.vo';
import { PostContentVO } from '../../../domain/vos/posts/post-content.vo';
import { PostTitleVO } from '../../../domain/vos/posts/post-title.vo';
import { PostRepositoryMongo } from '../../../infrastructure/repositories/post.repository.mongo';
import { SinglePostResponse } from './types/single-post.response';
import { IdRequest } from '../types/id.request';
import { FindPostByIdUseCase } from './find-post-by-id.use-case';
import { CommentsListVO } from '../../../domain/vos/posts/comments-list.vo';
import { CommentPost } from '../../../domain/entities/comment-post.entity';
import { CommentContentVO } from '../../../domain/vos/comments/comment-content.vo';
import { CommentDateVO } from '../../../domain/vos/comments/comment-date.vo';
import { CommentNicknameVO } from '../../../domain/vos/comments/comment-nickname.vo';

jest.mock('./../../../infrastructure/repositories/post.repository.mongo', () => {
	return {
		PostRepositoryMongo: jest.fn().mockImplementation(() => {
			return {
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

describe('FindPostByIdUseCase test suite', () => {

	it('should return searched post', async () => {
		const repository = new PostRepositoryMongo();
		Container.set('PostRepository', repository);

		const useCase: FindPostByIdUseCase = Container.get(FindPostByIdUseCase);

		const idRequest: IdRequest = 'cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668';

		const expectedPost: SinglePostResponse|null = await useCase.execute(idRequest);
		console.log('expectedPost', expectedPost);

		if(expectedPost !== null) {
			expect(repository.getPostByID).toBeCalled();
			expect(expectedPost.id).toBe(idRequest);
			expect(expectedPost.author).toBe('Anónimo');
			expect(expectedPost.nickname).toBe('anonymus');
			expect(expectedPost.title).toBe('An anonymus post');
			expect(expectedPost.content).toBe('loremimpsum'.repeat(6));
			expect(expectedPost.comments.length).toBe(1);
		}
		
	});

});