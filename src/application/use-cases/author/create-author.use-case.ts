import { Service } from 'typedi';
import { Author, AuthorType } from '../../../domain/entities/author.entity';
import { AuthorService } from '../../../domain/services/author.service';
import { AuthorNameVO } from '../../../domain/vos/author/author-name.vo';
import { AuthorNicknameVO } from '../../../domain/vos/author/author-nickname.vo';
import { IdVO } from '../../../domain/vos/id.vo';
import { IdRequest } from '../types/id.request';
import { AuthorRequest } from './types/author.request';

@Service()
export class CreateAuthorUseCase {

	constructor(private authorService: AuthorService) { }

	async execute(id: IdRequest, author: AuthorRequest): Promise<void> {
		const authorToType: AuthorType = {
			id: IdVO.createWithUUID(id),
			name: AuthorNameVO.create(author.name),
			nickname: AuthorNicknameVO.create(author.nickname)
		};

		await this.authorService.persist(new Author(authorToType));
	}
}