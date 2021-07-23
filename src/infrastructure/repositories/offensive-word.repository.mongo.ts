import { OffensiveWordModel } from './offensive-word.schema';

import { OffensiveWordRepository } from '../../domain/repositories/offensive-word.repository';
import { OffensiveWord } from '../../domain/entities/offensive-word.entity';
import { IdVO } from '../../domain/vos/id.vo';

export class OffensiveWordRepositoryMongo implements OffensiveWordRepository {
	
	save(offensiveWord: OffensiveWord): void {
		
		const newOffensiveWord = {
			id: offensiveWord.id.value,
			word: offensiveWord.word.value,
			level: offensiveWord.level.value
		};

		const offensiveWordModel = new OffensiveWordModel(newOffensiveWord);

		offensiveWordModel.save();
	}

	async delete(idOffensiveWord: IdVO): Promise<void> {
		const deleteResult = await OffensiveWordModel.deleteOne({ id: idOffensiveWord.value });
		console.log('Deleted documents: ', deleteResult.deletedCount);
	}

	async showAll(): Promise<OffensiveWord[]> {
		const allOffensiveWords: OffensiveWord[] = OffensiveWordModel.find({});
		return allOffensiveWords;
	}

	/*
	async update(idOffensiveWord: string, offensiveWord: OffensiveWordRequest): Promise<OffensiveWordResponse> {
		return await OffensiveWordModel.findOneAndUpdate({ id: idOffensiveWord }, { ...offensiveWord, id: idOffensiveWord });
	}

	async showById(idOffensiveWord: IdRequest): Promise<OffensiveWordResponse> {

		const searchedOffensiveWord = await OffensiveWordModel.find({ id: idOffensiveWord })[0];
			
		if(!searchedOffensiveWord) throw Error('Offensive word not found');
	
		const searchedOffensiveWordToResponse = {
	
			id: searchedOffensiveWord.id,
			word: searchedOffensiveWord.word,
			level: searchedOffensiveWord.level
	
		};
	
		return searchedOffensiveWordToResponse;

	}

*/
	

}