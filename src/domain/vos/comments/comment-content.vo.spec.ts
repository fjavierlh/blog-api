import { CommentContentVO } from './comment-content.vo';
describe('CommentContent', () => {
	it('should create comment content if received param is valid', () => {
		const validContent = 'abcdefghijklmnopq';

		const commentContentTest = CommentContentVO.create(validContent);

		expect(commentContentTest.value).toBe(validContent);
	});

	it(`should throw an error if comment content length is lower than ${CommentContentVO.MIN_LENGTH}`, () => {
		const validContent = 'abcde';
		expect(() => CommentContentVO.create(validContent)).toThrow();
	});

	it(`should throw an error if comment content length is lower than ${CommentContentVO.MAX_LENGTH}`, () => {
		const validContent = 'abcdefghij'.repeat(21);
		expect(() => CommentContentVO.create(validContent)).toThrow();
	});
});