import { TextVO } from './text.vo';

describe('TextVO', () => {
	it('should create an TextVO object if post text is valid', () => {
		const validPostText = 'abcdefghij'.repeat(5);
		const postTitle = TextVO.create(validPostText);
		expect(postTitle.value.length).toBe(50);
	});

	it(`should throws an error if post text length is lower than ${TextVO.MIN_LENGTH}`, () => {
		const invalidPostText = 'Fu';
		expect(() => TextVO.create(invalidPostText))
			.toThrow(
				`El texto del post debe contener entre ${TextVO.MIN_LENGTH} y ${TextVO.MAX_LENGTH} caracteres, ${invalidPostText} tiene ${invalidPostText.length}`
			);
	});

	it(`should throws an error if post text length is higer than ${TextVO.MAX_LENGTH}`, () => {
		const invalidPostText = 'abcdefghij'.repeat(31);
		expect(() => TextVO.create(invalidPostText))
			.toThrow(
				`El texto del post debe contener entre ${TextVO.MIN_LENGTH} y ${TextVO.MAX_LENGTH} caracteres, ${invalidPostText} tiene ${invalidPostText.length}`
			);
	});
});