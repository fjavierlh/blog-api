jest.mock('./../../../infrastructure/repositories/post.repository.mongo', () => {
	return {
		PostRepositoryMongo: jest.fn().mockImplementation(() => {
			return {
				getAllPosts: jest.fn().mockImplementation(() => [
					new Post({
						id: IdVO.createWithUUID('cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668'),
						author: AuthorNameVO.create('Anónimo'),
						nickname: AuthorNicknameVO.create('anonymus'),
						title: PostTitleVO.create('An anonymus post'),
						content: PostContentVO.create('loremimpsum'.repeat(6)),
						comments: CommentsListVO.create([])
					})
				])
			};
		})
	};
});

import 'reflect-metadata';
import Container from 'typedi';
import { PostRepositoryMongo } from './../../../infrastructure/repositories/post.repository.mongo';
import { Post } from '../../../domain/entities/post.entity';
import { AuthorNameVO } from '../../../domain/vos/author/author-name.vo';
import { AuthorNicknameVO } from '../../../domain/vos/author/author-nickname.vo';
import { IdVO } from '../../../domain/vos/id.vo';
import { PostContentVO } from '../../../domain/vos/posts/post-content.vo';
import { PostTitleVO } from '../../../domain/vos/posts/post-title.vo';
import { FindAllPostsUseCase } from './find-all-posts.use-case';
import { CommentsListVO } from '../../../domain/vos/posts/comments-list.vo';
describe('FindAllPostsUseCase test suite', () => {

	it('should return all posts', async () => {
		const repository = new PostRepositoryMongo();
		Container.set('PostRepository', repository);

		const useCase = Container.get(FindAllPostsUseCase);

		const allPosts = await useCase.execute();
		expect(repository.getAllPosts).toBeCalled();
		expect(allPosts.length).toBe(1);
		expect(allPosts[0].id).toBe('cf1e0d44-7b6a-4a0e-843c-cbc0e0b4a668');
		expect(allPosts[0].author).toBe('Anónimo');
		expect(allPosts[0].nickname).toBe('anonymus');
		expect(allPosts[0].title).toBe('An anonymus post');
		expect(allPosts[0].content).toBe('loremimpsum'.repeat(6));
		expect(Object.keys(allPosts[0]).includes('comments')).toBe(false);

	});

});