import 'reflect-metadata';
import { ExceptionWithCode } from '../../exception-with-code';

export class CommentContentVO {

	static get MIN_LENGTH(): number {
		return 10;
	}
	static get MAX_LENGTH(): number {
		return 200;
	}

	get value(): string {
		return this.content;
	}

	private constructor(private content: string) { }

	static create(content: string): CommentContentVO {
		if(content.length < this.MIN_LENGTH || content.length > this.MAX_LENGTH) {
			throw new ExceptionWithCode(201, `El contenido del comentario debe tener entre ${this.MIN_LENGTH} y ${this.MAX_LENGTH}, actualmente contiene ${content.length}`);
		}

		return new CommentContentVO(content);
	}
}