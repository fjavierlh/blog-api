import { OffensiveWordResponse } from './offensive-word.response';
describe('OffensiveWordRequest test suite', () => {
	it('should create an offensive word request object', () => {
		const id = '6ae0e09f-f7fd-48f9-913c-ef5a3814a12d';
		const word = 'test';
		const level = 1;

		const offensiveWordResponse: OffensiveWordResponse = { id, word, level };

		expect(offensiveWordResponse.id).toBe(id);
		expect(offensiveWordResponse.word).toBe(word);
		expect(offensiveWordResponse.level).toBe(level);
	});
});