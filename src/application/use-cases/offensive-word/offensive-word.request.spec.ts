import { OffensiveWordRequest } from './offensive-word.request';
describe('OffensiveWordRequest test suite', () => {
	it('should create an offensive word request object', () => {
		const word = 'test';
		const level = 1;

		const offensiveWordRequest: OffensiveWordRequest = { word, level };

		expect(offensiveWordRequest.word).toBe(word);
		expect(offensiveWordRequest.level).toBe(level);
	});
});