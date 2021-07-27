import { IdVO } from '../vos/id.vo';
import { LevelVO } from '../vos/level.vo';
import { WordVO } from '../vos/word.vo';
import { OffensiveWord } from './offensive-word.entity';

describe('OffensiveWord Test Suite', () => {
	it('should create a offensive word', () => {
		const offensiveWordType = {
			id: IdVO.createWithUUID('e2a4ff7d-60cc-48b1-8e9f-c7b83a60ce7b'),
			word: WordVO.create('Test'),
			level: LevelVO.create(5)
		};

		const offensiveWord = new OffensiveWord(offensiveWordType);

		expect(offensiveWord.id.value).toBe('e2a4ff7d-60cc-48b1-8e9f-c7b83a60ce7b');
		expect(offensiveWord.word.value).toBe('Test');
		expect(offensiveWord.level.value).toBe(5);
	});

	it('should throw error if create a offensive word with invalid arguments', () => {
		
		expect(() => {

			const offensiveWordType = {
				id: IdVO.createWithUUID('e2a4ff7d-60cc-48b1-8e9f-000'),
				word: WordVO.create(''),
				level: LevelVO.create(0)
			};

			new OffensiveWord(offensiveWordType);

		}).toThrow();

	});
});