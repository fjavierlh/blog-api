import { Inject, Service } from 'typedi';
import { Author } from '../entities/author.entity';
import { AuthorRepository } from '../repositories/author.repository';

@Service()
export class AuthorService {

	constructor(@Inject('AuthorRepository') private authorRepository: AuthorRepository) { }

	async persist(author: Author): Promise<void> {
		await this.authorRepository.createAuthor(author);
	}
}