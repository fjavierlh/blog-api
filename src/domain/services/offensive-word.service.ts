import { AnyObject } from 'mongoose';
import { Inject, Service } from 'typedi';
//import { OffensiveWordResponse } from '../../application/use-cases/offensive-word.response';
import { OffensiveWord, OffensiveWordType } from '../entities/offensive-word.entity';
import { OffensiveWordRepository } from '../repositories/offensive-word.repository';
import { IdVO } from '../vos/id.vo';
import { LevelVO } from '../vos/level.vo';
import { WordVO } from '../vos/word.vo';
//import { IdVO } from '../vos/id.vo';
//import { LevelVO } from '../vos/level.vo';
//import { WordVO } from '../vos/word.vo';

@Service()
export class OffensiveWordService {

	constructor(@Inject('OffensiveWordRepository') private offensiveWordRepository: OffensiveWordRepository) { }

	persist(offensiveWord: OffensiveWordType): void {
		const offensiveWordEntity = new OffensiveWord(offensiveWord);
		this.offensiveWordRepository.save(offensiveWordEntity);
	}

	remove(idOffensiveWord: IdVO): void {
		this.offensiveWordRepository.delete(idOffensiveWord);
	}

	async showAll(): Promise<OffensiveWord[]> {
		const allOffensiveWordsData = await this.offensiveWordRepository.showAll();

		const allOffensiveWordsModel = allOffensiveWordsData.map((ow: AnyObject)=> {
			const offensiveWordToModel: OffensiveWordType = {
				id: IdVO.createWithUUID(ow.id),
				word: WordVO.create(ow.word),
				level: LevelVO.create(ow.level)
			};
			return new OffensiveWord(offensiveWordToModel);
		});

		return allOffensiveWordsModel;
	}

	async showById(idOffensiveWord: IdVO): Promise<OffensiveWord> {
		
		const searchedOffensiveWord: AnyObject = await this.offensiveWordRepository.showById(idOffensiveWord);
		
		const offensiveWordModel: OffensiveWordType = {

			id: IdVO.createWithUUID(searchedOffensiveWord.id),
			word: WordVO.create(searchedOffensiveWord.word),
			level: LevelVO.create(searchedOffensiveWord.level)

		};

		return new OffensiveWord(offensiveWordModel);
		
	}

	/*
	async updateById(idOffensiveWord: IdVO, offensiveWord: OffensiveWordType): Promise<OffensiveWordType> {

		const offensiveWordToRequest: OffensiveWordResponse = {
			id: offensiveWord.id.value,
			word: offensiveWord.word.value,
			level: offensiveWord.level.value
		};

		const updatedOffensiveWord = await this.offensiveWordRepository.update(idOffensiveWord.value, offensiveWordToRequest);
		const offensiveWordCastedToType = {

			id: IdVO.createWithUUID(updatedOffensiveWord.id),
			word: WordVO.create(updatedOffensiveWord.word),
			level: LevelVO.create(updatedOffensiveWord.level)

		};

		return offensiveWordCastedToType;
	}
	*/

}