import { Service } from 'typedi';
import { OffensiveWordType } from '../../domain/entities/offensive-word.entity';
import { OffensiveWordService } from '../../domain/services/offensive-word.service';
import { IdVO } from '../../domain/vos/id.vo';
import { LevelVO } from '../../domain/vos/level.vo';
import { WordVO } from '../../domain/vos/word.vo';
import { OffensiveWordRequest } from './offensive-word.request';

@Service()
export class CreateOffensiveWordUseCase {

	constructor(private offensiveWordService: OffensiveWordService) {}

	async execute(offensiveWordRequest: OffensiveWordRequest): Promise<void> {
        
		const offensiveWordData: OffensiveWordType = {
			id: IdVO.create(),
			word: WordVO.create(offensiveWordRequest.word),
			level: LevelVO.create(offensiveWordRequest.level)
		};
		
		await this.offensiveWordService.persist(offensiveWordData);
	}

}