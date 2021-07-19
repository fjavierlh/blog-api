export class LevelVO {

	static LOWER_LEVEL = 1;
	static HIGER_LEVEL = 5;

	private constructor(private level: number) { }

	get value(): number {
		return this.level;
	}

	static create(level: number): LevelVO {
		
		if (level < this.LOWER_LEVEL || level > this.HIGER_LEVEL) {
			throw new Error(
				`El valor debe ser estar en el rango 1-5, ${level} es ${level > this.HIGER_LEVEL ? 'mayor' : 'menor'}`
			);
		}

		return new LevelVO(level);
	}
}