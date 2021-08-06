import { OffensiveWordModel } from './offensive-word.schema';

import { OffensiveWordRepository } from '../../domain/repositories/offensive-word.repository';
import { OffensiveWord, OffensiveWordType } from '../../domain/entities/offensive-word.entity';
import { IdVO } from '../../domain/vos/id.vo';
import { WordVO } from '../../domain/vos/offensive-word/word.vo';
import { LevelVO } from '../../domain/vos/offensive-word/level.vo';
import { AnyObject } from 'mongoose';

export class OffensiveWordRepositoryMongo implements OffensiveWordRepository {
	
	/**
	 * 
	 * @param offensiveWord OffensiveWord object with valid arguments
	 * @returns a promise with void return
	 */
	async save(offensiveWord: OffensiveWord): Promise<void> {

		const newOffensiveWord = {
			id: offensiveWord.id.value,
			word: offensiveWord.word.value,
			level: offensiveWord.level.value
		};

		const offensiveWordModel = new OffensiveWordModel(newOffensiveWord);

		return await offensiveWordModel.save();
	}

	/**
	 * 
	 * @param idOffensiveWord 
	 * @returns 
	 */
	async delete(idOffensiveWord: IdVO): Promise<void> {
		OffensiveWordModel.deleteOne({ id: idOffensiveWord.value }).exec();
	}

	/**
	 * 
	 * @returns 
	 */
	async showAll(): Promise<OffensiveWord[]> {
		
		const allOWData = await OffensiveWordModel.find().exec();

		return allOWData.map((ow: AnyObject) => {

			const offensiveWordToModel: OffensiveWordType = {
				id: IdVO.createWithUUID(ow.id),
				word: WordVO.create(ow.word),
				level: LevelVO.create(ow.level)
			};

			return new OffensiveWord(offensiveWordToModel);
		});
	}

	/**
	 * 
	 * @param idOffensiveWord 
	 * @returns 
	 */
	async findById(idOffensiveWord: IdVO): Promise<OffensiveWord|null> {
		
		const searchedOffensiveWord: AnyObject = await OffensiveWordModel.findOne({ id: idOffensiveWord.value }).exec();
		
		if(!searchedOffensiveWord) return null;
		
		const offensiveWordModel: OffensiveWordType = {

			id: IdVO.createWithUUID(searchedOffensiveWord.id),
			word: WordVO.create(searchedOffensiveWord.word),
			level: LevelVO.create(searchedOffensiveWord.level)

		};

		return new OffensiveWord(offensiveWordModel);

	}

	/**
	 * 
	 * @param idOffensiveWord 
	 * @param offensiveWord 
	 * @returns 
	 */
	async update(idOffensiveWord: IdVO, offensiveWord: OffensiveWord): Promise<OffensiveWord> {
				
		const updatedOFType = {
			word: offensiveWord.word.value,
			level: offensiveWord.level.value,
		};

		const updatedOF: AnyObject = await OffensiveWordModel.findOneAndUpdate({ id: idOffensiveWord.value }, updatedOFType);

		const updatedOffensiveWordData: OffensiveWordType = {

			id: updatedOF.id,
			word: WordVO.create(updatedOFType.word) ?? updatedOF.word,
			level: LevelVO.create(updatedOFType.level) ?? updatedOF.level

		};

		return new OffensiveWord(updatedOffensiveWordData);
	}

	async deleteAll(): Promise<void> {
		await OffensiveWordModel.deleteMany();
	}

}