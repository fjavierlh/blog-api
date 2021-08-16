import { Service } from 'typedi';
import { OffensiveWordService } from '../../../domain/services/offensive-word.service';
import { IdVO } from '../../../domain/vos/id.vo';
import { IdRequest } from '../types/id.request';

@Service()
export class DeleteOffensiveUseCase {

	constructor(private offensiveWordService: OffensiveWordService) { }

	async execute(idOffensiveWord: IdRequest): Promise<void> {
		const id = IdVO.createWithUUID(idOffensiveWord);
		await this.offensiveWordService.remove(id);
	}
}
