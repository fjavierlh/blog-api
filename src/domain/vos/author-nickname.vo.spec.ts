import { AuthorNicknameVO } from './author-nickname.vo';

describe('AuthorNicknameVO', () => {
	it('should create an AuthorNicknameVO object if nick author is valid', () => {
		const validAuthorNickname = 'cerva1954';
		const author = AuthorNicknameVO.create(validAuthorNickname);
		expect(author.value.length).toBe(9);
	});

	it(`should throws an error if nick author length is lower than ${AuthorNicknameVO.MIN_LENGTH}`, () => {
		const invalidNickname = 'Fu';
		expect(() => AuthorNicknameVO.create(invalidNickname))
			.toThrow(
				`El nick del autor debe contener entre ${AuthorNicknameVO.MIN_LENGTH} y ${AuthorNicknameVO.MAX_LENGTH} caracteres, ${invalidNickname} tiene ${invalidNickname.length}`
			);
	});

	it(`should throws an error if nick author length is higer than ${AuthorNicknameVO.MAX_LENGTH}`, () => {
		const invalidNickname = 'abcde'.repeat(7);
		expect(() => AuthorNicknameVO.create(invalidNickname))
			.toThrow(
				`El nick del autor debe contener entre ${AuthorNicknameVO.MIN_LENGTH} y ${AuthorNicknameVO.MAX_LENGTH} caracteres, ${invalidNickname} tiene ${invalidNickname.length}`
			);
	});
});