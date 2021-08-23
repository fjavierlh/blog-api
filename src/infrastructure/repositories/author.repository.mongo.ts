import { AnyObject } from 'mongoose';
import { Author } from '../../domain/entities/author.entity';
import { AuthorRepository } from '../../domain/repositories/author.repository';
import { AuthorNameVO } from '../../domain/vos/author/author-name.vo';
import { AuthorNicknameVO } from '../../domain/vos/author/author-nickname.vo';
import { IdVO } from '../../domain/vos/id.vo';
import { AuthorModel } from './author.schema';

export class AuthorRepositoryMongo implements AuthorRepository {

	async createAuthor(author: Author): Promise<void> {

		const authorData = {
			id: author.id.value,
			name: author.name.value,
			nickname: author.nickname.value
		};

		const newAuthor = await new AuthorModel(authorData);
		await newAuthor.save();
	}

	async findAuthorByID(authorID: IdVO): Promise<Author> {
		const author: AnyObject = await AuthorModel.findOne({ id: authorID.value });

		const authorType = {
			id: IdVO.createWithUUID(author.id),
			name: AuthorNameVO.create(author.name),
			nickname: AuthorNicknameVO.create(author.nickname)
		};

		return new Author(authorType);
	}

	async checkIfAuthorExists(authorID: IdVO): Promise<boolean> {
		return AuthorModel.exists({ id: authorID.value });
	}

}