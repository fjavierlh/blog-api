import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import Container from 'typedi';
import { UserService } from '../../domain/services/user.service';
import { EmailVO } from '../../domain/vos/auth-user/email.vo';

const options: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'my-secret'
    
};

export default new Strategy(options, async(playload, done) => {
	try {

		const { email } = playload;
		const userService = Container.get(UserService);
		const user = await userService.findByEmail(EmailVO.create(email));
		
		if(user) {
			return done(null, user);
		}

		return done(null, false, {message: 'User not found'});

	} catch (err) {
		console.log(err);
	}
});