import { Service } from 'typedi';
import { Author } from '../../../domain/entities/author.entity';
import { AuthorService } from '../../../domain/services/author.service';
import { IdVO } from '../../../domain/vos/id.vo';
import { IdRequest } from '../types/id.request';
import { AuthorResponse } from './types/author.response';

@Service()
export class FindAuthorByIDUseCase {

	constructor(private authorService: AuthorService) { }

	async execute(authorID: IdRequest): Promise<AuthorResponse> {

		const author: Author = await this.authorService.findAuthorByID(IdVO.createWithUUID(authorID));
        
		return {
			id: author.id.value,
			name: author.name.value,
			nickname: author.nickname.value
		};
        
	}

}