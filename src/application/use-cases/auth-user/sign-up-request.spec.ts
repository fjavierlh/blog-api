import { SignUpRequest } from './sign-up.request';
describe('SignInRequest test suite', () => {
	it('should create an sign in request object', () => {
		const email = 'hi@mymail.com';
		const password = '@bCd3fGh1#';

		const signInRequest: SignUpRequest = { email, password };

		expect(signInRequest.email).toBe(email);
		expect(signInRequest.password).toBe(password);
	});
});