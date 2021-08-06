import { CommentNicknameVO } from './comment-nickname.vo';
describe('CommentNickname test suite', () => {
	it('should create comment nickname if nickname is valid', () => {

		const validNickname = 'mynickname';
		const commentNickname = CommentNicknameVO.create(validNickname);

		expect(commentNickname.value).toBe(validNickname);

	});
	it(`should throw error if comment nickname length is lower than ${CommentNicknameVO.MIN_LENGTH}`, () => {
		const invalidNickname = 'my';
		expect(() => CommentNicknameVO.create(invalidNickname)).toThrow()    ;
	});
});