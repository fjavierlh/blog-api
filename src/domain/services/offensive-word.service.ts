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
		await this.checksIfIDExists(idOffensiveWord);
		await this.offensiveWordRepository.delete(idOffensiveWord);
	}

	async showAll(): Promise<OffensiveWord[]> {
		return this.offensiveWordRepository.showAll();
	}

	async showById(idOffensiveWord: IdVO): Promise<OffensiveWord|null> {
		return this.offensiveWordRepository.findById(idOffensiveWord);
	}

	async updateById(idOffensiveWord: IdVO, offensiveWord: OffensiveWordType): Promise<OffensiveWord> {
		await this.checksIfIDExists(idOffensiveWord);
		return this.offensiveWordRepository.update(idOffensiveWord, new OffensiveWord(offensiveWord));
	}

	private async checksIfIDExists(id: IdVO): Promise<void> {
		const offensiveWord: OffensiveWord|null = await this.showById(id);
		if (!offensiveWord) throw new ExceptionWithCode(404, `ID '${id.value}' not found`);
	}

}