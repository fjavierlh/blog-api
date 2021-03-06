import { Service } from 'typedi';
import { OffensiveWord } from '../../../domain/entities/offensive-word.entity';
import { OffensiveWordService } from '../../../domain/services/offensive-word.service';
import { IdVO } from '../../../domain/vos/id.vo';
import { IdRequest } from '../types/id.request';
import { OffensiveWordResponse } from '../offensive-word/types/offensive-word.response';

@Service()
export class FindOffensiveWordById{

	constructor(private offensiveWordService: OffensiveWordService) {}

	async execute(idOffensiveWord: IdRequest): Promise<OffensiveWordResponse|null> {
		
		const id = IdVO.createWithUUID(idOffensiveWord);
		const searchedOffensiveWord: OffensiveWord|null = await this.offensiveWordService.showById(id);
		
		if (!searchedOffensiveWord) return null;
		
		const searchedOffensiveWordToResponse: OffensiveWordResponse = {
			id: id.value,
			word: searchedOffensiveWord.word.value,
			level: searchedOffensiveWord.level.value

		};

		return searchedOffensiveWordToResponse;
	}
}
