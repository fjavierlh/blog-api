import { Service } from 'typedi';
import { OffensiveWordType } from '../../domain/entities/offensive-word.entity';
import { OffensiveWordService } from '../../domain/services/offensive-word.service';
import { IdVO } from '../../domain/vos/id.vo';
import { LevelVO } from '../../domain/vos/level.vo';
import { WordVO } from '../../domain/vos/word.vo';
import { IdRequest } from './id.request';
import { OffensiveWordRequest } from './offensive-word.request';
import { OffensiveWordResponse } from './offensive-word.response';

@Service()
export class UpdateOffensiveWordById {

	constructor(private offensiveWordService: OffensiveWordService) { }

	async execute(idOffensiveWord: IdRequest, updatedOffensiveWord: OffensiveWordRequest): Promise<OffensiveWordResponse>{
			
		const updatedOffensiveWordData: OffensiveWordType = {
			id: IdVO.createWithUUID(idOffensiveWord),
			word: WordVO.create(updatedOffensiveWord.word),
			level: LevelVO.create(updatedOffensiveWord.level)   
		};
		//console.log('updatedOffensiveWordData', updatedOffensiveWordData);
		const updatedOffensiveWordType = await this.offensiveWordService.updateById(updatedOffensiveWordData.id, updatedOffensiveWordData);
		//console.log('updatedOffensiveWordType', updatedOffensiveWordType);

		const updatedOffensiveWordResponse: OffensiveWordResponse = {

			id: updatedOffensiveWordType.id.value,
			word: updatedOffensiveWordType.word.value,
			level: updatedOffensiveWordType.level.value
			
		};
		
		return updatedOffensiveWordResponse;
	}

}