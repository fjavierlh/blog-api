import { RoleVO, Role } from './role.vo';
describe('Role test suite', () => {
	it('should create an Role value object', () => {
		const roleTest = RoleVO.create(Role.ADMIN);
		expect(roleTest.value).toBe(Role.ADMIN);
	});

});