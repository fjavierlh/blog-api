import { v4, validate} from 'uuid';
import { ExceptionWithCode } from '../exception-with-code';

export type IdVOType = string;

export class IdVO {

	get value(): string {
		return this.id;
	}

	private constructor(private id: string) {}

	static create(): IdVO {
		return new IdVO(v4());
	}

	static createWithUUID(uuid: string): IdVO {
		if(!validate(uuid)) throw new ExceptionWithCode(400, `${uuid} no es un UUID`);
		return new IdVO(uuid); 
	}
}