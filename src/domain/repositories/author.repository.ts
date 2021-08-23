import { Author } from '../entities/author.entity';
import { IdVO } from '../vos/id.vo';

export interface AuthorRepository {

    createAuthor(author: Author): Promise<void>;

    findAuthorByID(authorID: IdVO): Promise<Author>;

    checkIfAuthorExists(authorID: IdVO): Promise<boolean>;
    
}