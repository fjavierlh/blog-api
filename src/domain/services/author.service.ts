import { Inject, Service } from 'typedi';
import { Author } from '../entities/author.entity';
import { ExceptionWithCode } from '../exception-with-code';
import { AuthorRepository } from '../repositories/author.repository';
import { IdVO } from '../vos/id.vo';

@Service()
export class AuthorService {

	constructor(@Inject('AuthorRepository') private authorRepository: AuthorRepository) { }

	async persist(author: Author): Promise<void> {
		await this.authorRepository.createAuthor(author);
	}

	async findAuthorByID(authorID: IdVO): Promise<Author> {
		await this.checkIfAuthorExists(authorID);
		return this.authorRepository.findAuthorByID(authorID);
	}

	private async checkIfAuthorExists(authorID: IdVO): Promise<void> {
		const exists = await this.authorRepository.checkIfAuthorExists(authorID);
		if (!exists) throw new ExceptionWithCode(404, `Author with ID ${authorID.value} not found.`);
	}
}