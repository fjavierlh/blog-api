import { Author } from '../../domain/entities/author.entity';
import { AuthorRepository } from '../../domain/repositories/author.repository';
import { AuthorModel } from './author.schema';

export class AuthorRepositoryMongo implements AuthorRepository {
    
	async createAuthor(author: Author): Promise<void> {

		const authorData = {
			id: author.id.value,
			name: author.name.value,
			nickname: author.nickname.value
		};
        
		const newAuthor = new AuthorModel(authorData);

		return await newAuthor.save();
	}

}