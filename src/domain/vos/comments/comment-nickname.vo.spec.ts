import { CommentNickname } from './comment-nickname.vo';
describe('CommentNickname test suite', () => {
	it('should create comment nickname if nickname is valid', () => {

		const validNickname = 'mynickname';
		const commentNickname = CommentNickname.create(validNickname);

		expect(commentNickname.value).toBe(validNickname);

	});
	it(`should throw error if comment nickname length is lower than ${CommentNickname.MIN_LEGTH}`, () => {
		const invalidNickname = 'my';
		expect(() => CommentNickname.create(invalidNickname)).toThrow()    ;
	});
});