import { Service } from 'typedi';
import { OffensiveWordService } from '../../domain/services/offensive-word.service';
import { IdVO } from '../../domain/vos/id.vo';
import { IdRequest } from './id.request';

@Service()
export class DeleteOffensiveUseCase {

	constructor(private offensiveWordService: OffensiveWordService) { }

	execute(idOffensiveWord: IdRequest): void {
		const id = IdVO.createWithUUID(idOffensiveWord);
		this.offensiveWordService.remove(id);
	}
}
