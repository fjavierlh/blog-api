import { Service } from 'typedi';
import { OffensiveWord } from '../../../domain/entities/offensive-word.entity';
import { OffensiveWordService } from '../../../domain/services/offensive-word.service';
import { OffensiveWordResponse } from '../offensive-word/types/offensive-word.response';

@Service()
export class FindAllOffensiveWordsUseCase {

	constructor(private offensiveWordService: OffensiveWordService) { }

	async execute(): Promise<OffensiveWordResponse[]> {

		const allOffensiveWords: OffensiveWord[] = await this.offensiveWordService.showAll();
		
		const allOffensiveWordsResponse: OffensiveWordResponse[] = allOffensiveWords.map((ow: OffensiveWord) => {
			return { id: ow.id.value, word: ow.word.value, level: ow.level.value };
		});

		return allOffensiveWordsResponse;
	}
}
