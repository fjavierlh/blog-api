import { PostContentVO } from './post-content.vo';

describe('PostContentVO', () => {
	it('should create an PostContentVO object if post text is valid', () => {
		const validPostText = 'abcdefghij'.repeat(5);
		const postTitle = PostContentVO.create(validPostText);
		expect(postTitle.value.length).toBe(50);
	});

	it(`should throws an error if post text length is lower than ${PostContentVO.MIN_LENGTH}`, () => {
		const invalidPostText = 'Fu';
		expect(() => PostContentVO.create(invalidPostText))
			.toThrow(
				`El texto del post debe contener entre ${PostContentVO.MIN_LENGTH} y ${PostContentVO.MAX_LENGTH} caracteres, ${invalidPostText} tiene ${invalidPostText.length}`
			);
	});

	it(`should throws an error if post text length is higer than ${PostContentVO.MAX_LENGTH}`, () => {
		const invalidPostText = 'abcdefghij'.repeat(31);
		expect(() => PostContentVO.create(invalidPostText))
			.toThrow(
				`El texto del post debe contener entre ${PostContentVO.MIN_LENGTH} y ${PostContentVO.MAX_LENGTH} caracteres, ${invalidPostText} tiene ${invalidPostText.length}`
			);
	});
});