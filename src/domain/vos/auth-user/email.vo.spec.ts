import { EmailVO } from './email.vo';

describe('EmailVO test suite', () => {
	it('should create an EmailVO object if author is valid', () => {
		const validEmail = 'hi@mymail.com';
		const expectedEmailVO = EmailVO.create(validEmail);
		expect(expectedEmailVO.value).toBe(validEmail);
	});
});