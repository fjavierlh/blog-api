import { AuthorNameVO } from '../vos/author/author-name.vo';
import { Author, AuthorType } from './author.entity';
import { IdVO } from '../vos/id.vo';
import { AuthorNicknameVO } from '../vos/author/author-nickname.vo';

describe('Author Entity Test Suite', () => {
	it('should create a author', () => {
		const authorType: AuthorType = {
			id: IdVO.createWithUUID('e2a4ff7d-60cc-48b1-8e9f-c7b83a60ce7b'),
			name: AuthorNameVO.create('Test'),
			nickname: AuthorNicknameVO.create('test')
		};

		const author = new Author(authorType);

		expect(author.id.value).toBe('e2a4ff7d-60cc-48b1-8e9f-c7b83a60ce7b');
		expect(author.name.value).toBe('Test');
		expect(author.nickname.value).toBe('test');
	});

	it('should throw error if create a author with invalid arguments', () => {

		expect(() => {
			new Author({
				id: IdVO.createWithUUID('e2a4ff7d-60cc-48b1-8e9f-c7b83a60ce7x'),
				name: AuthorNameVO.create('A'),
				nickname: AuthorNicknameVO.create('A')
			});
		}).toThrow();

	});

});