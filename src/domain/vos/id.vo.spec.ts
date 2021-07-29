import { IdVO } from './id.vo';

describe('IdVO test suite', () => {

	it('should create an LevelV0 object if level is valid', () => {
		const validUUID = '6ae0e09f-f7fd-48f9-913c-ef5a3814a12d';
		const level = IdVO.createWithUUID(validUUID);
		expect(level.value).toEqual(validUUID);
	});

	it('should throws an error if level is greatest than 5', () => {
		const invalidUUID = 'xxxx-xxxx-xxxx-xxxx';
		expect(() => IdVO.createWithUUID(invalidUUID))
			.toThrow(`${invalidUUID} no es un UUID`);
	});

});