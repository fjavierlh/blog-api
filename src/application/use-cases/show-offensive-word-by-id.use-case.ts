import { Service } from 'typedi';
import { OffensiveWordService } from '../../domain/services/offensive-word.service';
import { IdVO } from '../../domain/vos/id.vo';
import { IdRequest } from './id.request';
import { OffensiveWordResponse } from './offensive-word.response';

@Service()
export class ShowOffensiveWordById{

	constructor(private offensiveWordService: OffensiveWordService) {}

	async execute(idOffensiveWord: IdRequest): Promise<OffensiveWordResponse> {
		
		const id = IdVO.createWithUUID(idOffensiveWord);
		const searchedOffensiveWord = await this.offensiveWordService.showById(id);

		const searchedOffensiveWordToResponse: OffensiveWordResponse = {
			id: id.value,
			word: searchedOffensiveWord.word.value,
			level: searchedOffensiveWord.level.value

		};

		return searchedOffensiveWordToResponse;
	}
}
