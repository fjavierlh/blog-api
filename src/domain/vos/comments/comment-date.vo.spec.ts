import { CommentDateVO } from './comment-date.vo';
describe('CommentDateVO test suite', () => {
	it('should create a comment date if received params are valid', () => {
		const commentDateTest = CommentDateVO.create();
		expect(typeof commentDateTest.value).toBe('string');
		expect(+commentDateTest.value).not.toBeNaN();
	});
});