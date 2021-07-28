import { PasswordVO } from './password.vo';

describe('EmailVO test suite', () => {
	it('should create an EmailVO object if author is valid', () => {
		const validPassword = '@Bcd3fgh1#';
		const expectedEmailVO = PasswordVO.create(validPassword);
		expect(expectedEmailVO.value).toBe(validPassword);
	});
});