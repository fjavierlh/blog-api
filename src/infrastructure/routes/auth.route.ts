import express from 'express';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import Container from 'typedi';
import { SignInUserUseCase } from '../../application/use-cases/auth-user/sign-in-user.use-case';
import { SignUpUserUseCase } from '../../application/use-cases/auth-user/sign-up-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/auth-user/update-user.use-case';

const router = express.Router();

router.post('/api/login',
	body('email').notEmpty(),
	body('password').notEmpty(),
	async (req: Request, res: Response) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			const useCase = Container.get(SignInUserUseCase);
			const { email, password } = req.body;
			const token = await useCase.execute({ email, password });

			if (token) return res.status(200).json({ token });

			return res.status(401).json({ error: 'Unathorized' });

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			return res.status(err.code).json({ error: err.message });
		}

	});


router.post('/api/sign-up',
	body('email').notEmpty(),
	body('password').notEmpty(),
	async (req: Request, res: Response) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const useCase = Container.get(SignUpUserUseCase);
			const { email, password } = req.body;
			await useCase.execute({ email, password });

			return res.status(201).json({ status: 'created' });

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.log(err);
			return res.status(400).json({ error: err.message });
		}

	});

router.put('/api/user/update',
	body('email').notEmpty(),
	body('update').notEmpty().isObject(),
	passport.authenticate('jwt', { session: false }),
	async (req: Request, res: Response) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

			const useCase = Container.get(UpdateUserUseCase);
			const { email, update } = req.body;
			await useCase.execute(email, { ...update });

			return res.status(200).json({ message: 'User updated' });

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			return res.status(401).json({ error: err.message });
		}

	});

export { router as authRouter };

/*
// Para crear spinnet
router.post('/api/login',
	body('email').notEmpty(),
	body('password').notEmpty(),
	async (req: Request, res: Response) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

		} catch (err: any) {
			return res.status(err.code).json({ error: err.message });
		}

	});
*/