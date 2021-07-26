import { OffensiveWordModel } from './offensive-word.schema';

import { OffensiveWordRepository } from '../../domain/repositories/offensive-word.repository';
import { OffensiveWord } from '../../domain/entities/offensive-word.entity';
import { IdVO } from '../../domain/vos/id.vo';

export class OffensiveWordRepositoryMongo implements OffensiveWordRepository {
	
	/**
	 * 
	 * @param offensiveWord 
	 */
	save(offensiveWord: OffensiveWord): void {

		const newOffensiveWord = {
			id: offensiveWord.id.value,
			word: offensiveWord.word.value,
			level: offensiveWord.level.value
		};

		const offensiveWordModel = new OffensiveWordModel(newOffensiveWord);

		offensiveWordModel.save();
	}

	/**
	 * 
	 * @param idOffensiveWord 
	 * @returns 
	 */
	async delete(idOffensiveWord: IdVO): Promise<void> {
		return OffensiveWordModel.deleteOne({ id: idOffensiveWord.value }).exec();
	}

	/**
	 * 
	 * @returns 
	 */
	async showAll(): Promise<OffensiveWord[]> {
		return OffensiveWordModel.find().exec();
	}

	/**
	 * 
	 * @param idOffensiveWord 
	 * @returns 
	 */
	async showById(idOffensiveWord: IdVO): Promise<OffensiveWord> {
		const offensiveWord: OffensiveWord[] = await OffensiveWordModel.find({ id: idOffensiveWord.value }).exec();
		return offensiveWord[0];
	}

	/**
	 * 
	 * @param idOffensiveWord 
	 * @param offensiveWord 
	 * @returns 
	 */
	async update(idOffensiveWord: IdVO, offensiveWord: OffensiveWord): Promise<OffensiveWord> {
		
		const updatedOF = {
			id: offensiveWord.id.value,
			word: offensiveWord.word.value,
			level: offensiveWord.level.value,
		};

		return OffensiveWordModel.findOneAndUpdate({ id: idOffensiveWord.value }, updatedOF);
	}

}