import { Author } from '../entities/author.entity';

export interface AuthorRepository {

    createAuthor(author: Author): Promise<void>;
    
}