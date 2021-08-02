import { PostTitleVO } from './post-title.vo';

describe('PostTitleVO', () => {
	it('should create an PostTitleVO object if post title is valid', () => {
		const validPostTitle = 'My post title';
		const postTitle = PostTitleVO.create(validPostTitle);
		expect(postTitle.value.length).toBe(13);
	});

	it(`should throws an error if post title length is lower than ${PostTitleVO.MIN_LENGTH}`, () => {
		const invalidPostTitle = 'Fu';
		expect(() => PostTitleVO.create(invalidPostTitle))
			.toThrow(
				`El título del post debe contener entre ${PostTitleVO.MIN_LENGTH} y ${PostTitleVO.MAX_LENGTH} caracteres, ${invalidPostTitle} tiene ${invalidPostTitle.length}`
			);
	});

	it(`should throws an error if post title length is higer than ${PostTitleVO.MAX_LENGTH}`, () => {
		const invalidPostTitle = 'abcde'.repeat(7);
		expect(() => PostTitleVO.create(invalidPostTitle))
			.toThrow(
				`El título del post debe contener entre ${PostTitleVO.MIN_LENGTH} y ${PostTitleVO.MAX_LENGTH} caracteres, ${invalidPostTitle} tiene ${invalidPostTitle.length}`
			);
	});
});