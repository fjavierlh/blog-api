import { AuthorNameVO } from '../vos/author/author-name.vo';
import { AuthorNicknameVO } from '../vos/author/author-nickname.vo';
import { IdVO } from '../vos/id.vo';
import { PostContentVO } from '../vos/posts/post-content.vo';
import { PostTitleVO } from '../vos/posts/post-title.vo';
import { CommentPost } from './comment-post.entity';
import { PostType, Post } from './post.entity';

describe('Post entity test suite', () => {
    
	it('should create a post entity with valid arguments', () => {

		const validUUID = '3b37664b-7292-48ba-a986-55480402d683';
		const validAuthorName = 'Don pimpón';
		const validNickname = 'donpimpon';
		const validTitle = 'Hello world!';
		const validContent = 'loremipsum'.repeat(5);
		const validCommentsList: CommentPost[] = [];

		const postType: PostType = {
			id: IdVO.createWithUUID(validUUID),
			author: AuthorNameVO.create(validAuthorName),
			nickname: AuthorNicknameVO.create(validNickname),
			title: PostTitleVO.create(validTitle),
			content: PostContentVO.create(validContent),
			comments:validCommentsList
		};

		const postTest = new Post(postType);

		expect(postTest.id.value).toBe(validUUID);
		expect(postTest.author.value).toBe(validAuthorName);
		expect(postTest.nickname.value).toBe(validNickname);
		expect(postTest.title.value).toBe(validTitle);
		expect(postTest.content.value).toBe(validContent);
		expect(postTest.comments.length).toBe(0);

	});

	it('should throw an error if create an post with invalid arguments', () => {

		const invalidUUID = '3b37664b-7292-48ba-a986-55480402d68?';
		const validAuthorName = 'Don pimpón';
		const validNickname = 'donpimpon';
		const validTitle = 'Hello world!';
		const validContent = 'loremipsum'.repeat(5);
		const validCommentsList: CommentPost[] = [];

		expect(() => {
			new Post({
				id: IdVO.createWithUUID(invalidUUID),
				author: AuthorNameVO.create(validAuthorName),
				nickname: AuthorNicknameVO.create(validNickname),
				title: PostTitleVO.create(validTitle),
				content: PostContentVO.create(validContent),
				comments: validCommentsList
			});
		}).toThrow();
	});

});