import { TitleVO } from './title.vo';

describe('TitleVO', () => {
	it('should create an TitleVO object if post title is valid', () => {
		const validPostTitle = 'My post title';
		const postTitle = TitleVO.create(validPostTitle);
		expect(postTitle.value.length).toBe(13);
	});

	it(`should throws an error if post title length is lower than ${TitleVO.MIN_LENGTH}`, () => {
		const invalidPostTitle = 'Fu';
		expect(() => TitleVO.create(invalidPostTitle))
			.toThrow(
				`El título del post debe contener entre ${TitleVO.MIN_LENGTH} y ${TitleVO.MAX_LENGTH} caracteres, ${invalidPostTitle} tiene ${invalidPostTitle.length}`
			);
	});

	it(`should throws an error if post title length is higer than ${TitleVO.MAX_LENGTH}`, () => {
		const invalidPostTitle = 'abcde'.repeat(7);
		expect(() => TitleVO.create(invalidPostTitle))
			.toThrow(
				`El título del post debe contener entre ${TitleVO.MIN_LENGTH} y ${TitleVO.MAX_LENGTH} caracteres, ${invalidPostTitle} tiene ${invalidPostTitle.length}`
			);
	});
});