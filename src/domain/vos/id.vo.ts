import { v4, validate} from 'uuid';

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
		if(!validate(uuid)) throw new Error(`${uuid} no es un UUID`);
		return new IdVO(uuid); 
	}
}