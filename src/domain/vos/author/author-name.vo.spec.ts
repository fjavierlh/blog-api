import { AuthorNameVO } from './author-name.vo';

describe('AuthorVO', () => {
	it('should create an AuthorVO object if author is valid', () => {
		const validAuthor = 'Cervantes';
		const author = AuthorNameVO.create(validAuthor);
		expect(author.value.length).toBe(9);
	});

	it(`should throws an error if author length is lower than ${AuthorNameVO.MIN_LENGTH}`, () => {
		const invalidAuthor = 'Loki';
		expect(() => AuthorNameVO.create(invalidAuthor))
			.toThrow(
				`El nombre del autor debe contener entre 5 y 30 caracteres, ${invalidAuthor} tiene ${invalidAuthor.length}`
			);
	});

	it(`should throws an error if author length is higer than ${AuthorNameVO.MAX_LENGTH}`, () => {
		const invalidAuthor = 'abcde'.repeat(7);
		expect(() => AuthorNameVO.create(invalidAuthor))
			.toThrow(
				`El nombre del autor debe contener entre 5 y 30 caracteres, ${invalidAuthor} tiene ${invalidAuthor.length}`
			);
	});
});