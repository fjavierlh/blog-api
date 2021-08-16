import { Service } from 'typedi';
import { OffensiveWord, OffensiveWordType } from '../../../domain/entities/offensive-word.entity';
import { OffensiveWordService } from '../../../domain/services/offensive-word.service';
import { IdVO } from '../../../domain/vos/id.vo';
import { LevelVO } from '../../../domain/vos/offensive-word/level.vo';
import { WordVO } from '../../../domain/vos/offensive-word/word.vo';
import { IdRequest } from '../types/id.request';
import { OffensiveWordRequest } from './types/offensive-word.request';
import { OffensiveWordResponse } from './types/offensive-word.response';

@Service()
export class UpdateOffensiveWordByIdUseCase {

	constructor(private offensiveWordService: OffensiveWordService) { }

	async execute(idOffensiveWord: IdRequest, updatedOffensiveWord: OffensiveWordRequest): Promise<OffensiveWordResponse>{
			
		const updatedOffensiveWordData: OffensiveWordType = {
			id: IdVO.createWithUUID(idOffensiveWord),
			word: WordVO.create(updatedOffensiveWord.word),
			level: LevelVO.create(updatedOffensiveWord.level)   
		};

		const updatedOffensiveWordType: OffensiveWord = await this.offensiveWordService.updateById(updatedOffensiveWordData.id, updatedOffensiveWordData);

		const updatedOffensiveWordResponse: OffensiveWordResponse = {

			id: updatedOffensiveWordType.id.value,
			word: updatedOffensiveWordType.word.value,
			level: updatedOffensiveWordType.level.value
			
		};
		
		return updatedOffensiveWordResponse;
	}

}