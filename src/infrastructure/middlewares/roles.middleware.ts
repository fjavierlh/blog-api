import { Role } from '../../domain/vos/auth-user/role.vo';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../domain/entities/user.entity';

export const hasRole = (roles: Role[]) => {

	return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		const user = req.user as User;
		const roleUser = user.role.value;

		const allow = roles.some(role => roleUser === role);

		if(allow) {
			next();
			return;
		}

		return res.status(403).json({status: 'Not allowed'});

	};
};