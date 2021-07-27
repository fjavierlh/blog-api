import { Inject, Service } from 'typedi';
import { OffensiveWord, OffensiveWordType } from '../entities/offensive-word.entity';
import { ExceptionWithCode } from '../exception-with-code';
import { OffensiveWordRepository } from '../repositories/offensive-word.repository';
import { IdVO } from '../vos/id.vo';

@Service()
export class OffensiveWordService {

	constructor(@Inject('OffensiveWordRepository') private offensiveWordRepository: OffensiveWordRepository) { }

	async persist(offensiveWord: OffensiveWordType): Promise<void> {
		const offensiveWordEntity = new OffensiveWord(offensiveWord);
		await this.offensiveWordRepository.save(offensiveWordEntity);
	}

	async remove(idOffensiveWord: IdVO): Promise<void> {
		this.offensiveWordRepository.delete(idOffensiveWord);
	}

	async showAll(): Promise<OffensiveWord[]> {
		return this.offensiveWordRepository.showAll();
	}

	async showById(idOffensiveWord: IdVO): Promise<OffensiveWord> {
		return this.offensiveWordRepository.showById(idOffensiveWord);
	}

	async updateById(idOffensiveWord: IdVO, offensiveWord: OffensiveWordType): Promise<OffensiveWord> {
		return this.offensiveWordRepository.update(idOffensiveWord, new OffensiveWord(offensiveWord));
	}

	private async checksIfIDExists(id: IdVO): Promise<void> {
		const offensiveWord = await this.showById(id);
		if (!offensiveWord) throw new ExceptionWithCode(404, `ID ${id} not found`);
	}

}