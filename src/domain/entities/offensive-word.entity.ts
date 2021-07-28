import { IdVO } from '../vos/id.vo';
import { LevelVO } from '../vos/offensive-word/level.vo';
import { WordVO } from '../vos/offensive-word/word.vo';

export type OffensiveWordType = {
    id: IdVO;
    word: WordVO;
    level: LevelVO;
}

export class OffensiveWord {

	constructor(private offensiveWord: OffensiveWordType) {}

	get id(): IdVO {
		return this.offensiveWord.id;
	}

	get word(): WordVO {
		return this.offensiveWord.word;
	}

	get level(): LevelVO {
		return this.offensiveWord.level;
	}

}