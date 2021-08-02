import { CommentContent } from './comment-content.vo';
describe('CommentContent', () => {
	it('should create comment content if received param is valid', () => {
		const validContent = 'abcdefghijklmnopq';

		const commentContentTest = CommentContent.create(validContent);

		expect(commentContentTest.value).toBe(validContent);
	});

	it(`should throw an error if comment content length is lower than ${CommentContent.MIN_LENGTH}`, () => {
		const validContent = 'abcde';
		expect(() => CommentContent.create(validContent)).toThrow();
	});

	it(`should throw an error if comment content length is lower than ${CommentContent.MAX_LENGTH}`, () => {
		const validContent = 'abcdefghij'.repeat(21);
		expect(() => CommentContent.create(validContent)).toThrow();
	});
});