import { AuthorNameVO } from '../vos/author/author-name.vo';
import { AuthorNicknameVO } from '../vos/author/author-nickname.vo';
import { IdVO } from '../vos/id.vo';


export type AuthorType = {
    id: IdVO,
    name: AuthorNameVO,
    nickname: AuthorNicknameVO
}

export class Author {

	constructor(private author: AuthorType) { }

	get id(): IdVO {
		return this.author.id;
	}

	get name(): AuthorNameVO {
		return this.author.name;
	}

	get nickname(): AuthorNicknameVO {
		return this.author.nickname;
	}

}