import { Inject, Service } from 'typedi';
import { OffensiveWord, OffensiveWordType } from '../entities/offensive-word.entity';
import { ExceptionWithCode } from '../exception-with-code';
import { OffensiveWordRepository } from '../repositories/offensive-word.repository';
import { CommentContentVO } from '../vos/comments/comment-content.vo';
import { IdVO } from '../vos/id.vo';
import { LevelVO } from '../vos/offensive-word/level.vo';

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

	async chekWordsInComment(content: CommentContentVO, level: LevelVO): Promise<void> {
		const offensiveWords: OffensiveWord[] = await this.showAll();
		const offensiveWordsList = offensiveWords.map((ow) => {
			if(ow.level.value <= level.value)
				return ow.word.value.toLowerCase();
		} );

		const cleanedContent = content.value.toLowerCase().replace(/[^\u00C0-\u00FF\w]/g, ' ').replace(/\s+/g, ' ');
		const foundWords = cleanedContent.split(' ').filter(word => offensiveWordsList.includes(word));		
		if(foundWords.length) throw new ExceptionWithCode(201, `Found offensive words in comment: ${foundWords.join(', ')}`);
	}

	private async checksIfIDExists(id: IdVO): Promise<void> {
		const offensiveWord: OffensiveWord|null = await this.showById(id);
		if (!offensiveWord) throw new ExceptionWithCode(404, `ID '${id.value}' not found`);
	}
}