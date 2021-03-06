import express from 'express';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import Container from 'typedi';
import { SignInUserUseCase } from '../../application/use-cases/auth-user/sign-in-user.use-case';
import { SignUpUserUseCase } from '../../application/use-cases/auth-user/sign-up-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/auth-user/update-user.use-case';
import { CreateAuthorUseCase } from '../../application/use-cases/author/create-author.use-case';
import { logger } from '../config/logger';

const router = express.Router();

router.post('/api/login',
	body('email').notEmpty(),
	body('password').notEmpty(),
	async (req: Request, res: Response) => {

		try {
			logger.debug('Debug logger!');

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
	body('email').notEmpty().isString(),
	body('password').notEmpty().isString(),
	body('name').notEmpty().isString().isLength({ min: 5, max: 30 }),
	body('nickname').notEmpty().isString().isLength({ min: 3, max: 10 }),
	async (req: Request, res: Response) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const signUpUseCase = Container.get(SignUpUserUseCase);
			const { email, password } = req.body;
			
			const createAuthorUseCase = Container.get(CreateAuthorUseCase);
			const { name, nickname } = req.body;

			const id = await signUpUseCase.execute({ email, password });
			await createAuthorUseCase.execute(id, {name, nickname});

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