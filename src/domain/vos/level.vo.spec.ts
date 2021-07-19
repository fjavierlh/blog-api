import { LevelVO } from './level.vo';

describe('LevelVO', () => {

	it('should create an LevelV0 object if level is valid', () => {
		const minLevel = 1;
		const level = LevelVO.create(minLevel);
		expect(level.value).toEqual(minLevel);
	});

	it('should throws an error if level is greatest than 5', () => {
		const invalidLevel = 6;
		expect(() => LevelVO.create(invalidLevel))
			.toThrow(`El valor debe ser estar en el rango 1-5, ${invalidLevel} es mayor`);
	});

	it('should throws an error if level is lowest than 1', () => {
		const invalidLevel = 0;
		expect(() => LevelVO.create(invalidLevel))
			.toThrow(`El valor debe ser estar en el rango 1-5, ${invalidLevel} es menor`);
	});
});