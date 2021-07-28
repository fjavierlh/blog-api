import { ExceptionWithCode } from '../../exception-with-code';

export class LevelVO {

	static get LOWER_LEVEL(): number {
		return 1;
	}
	static get HIGER_LEVEL(): number {
		return 5;
	}

	private constructor(private level: number) { }

	get value(): number {
		return this.level;
	}

	static create(level: number): LevelVO {

		if (level < this.LOWER_LEVEL || level > this.HIGER_LEVEL) {
			throw new ExceptionWithCode(
				400,
				`El valor debe ser estar en el rango [${this.LOWER_LEVEL}-${this.HIGER_LEVEL}], ${level} es ${level > this.HIGER_LEVEL ? 'mayor' : 'menor'}`
			);
		}

		return new LevelVO(level);
	}
}