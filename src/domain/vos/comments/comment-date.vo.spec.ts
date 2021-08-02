import { CommentDateVO } from './comment-date.vo';
describe('CommentDateVO test suite', () => {
	it('should create a comment date if received params are valid', () => {
		const validDate = new Date(2020, 8, 20);
		const commentDateTest = CommentDateVO.create(validDate);
		expect(commentDateTest.value).toBe(validDate.getTime());
	});
});