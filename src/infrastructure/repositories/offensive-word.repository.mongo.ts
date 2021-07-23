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


	async showById(idOffensiveWord: IdVO): Promise<OffensiveWord> {
		const offensiveWord: OffensiveWord[] = await OffensiveWordModel.find({ id: idOffensiveWord.value });
		return offensiveWord[0];
	}

	/*
	async update(idOffensiveWord: string, offensiveWord: OffensiveWordRequest): Promise<OffensiveWordResponse> {
		return await OffensiveWordModel.findOneAndUpdate({ id: idOffensiveWord }, { ...offensiveWord, id: idOffensiveWord });
	}

	

*/
	

}