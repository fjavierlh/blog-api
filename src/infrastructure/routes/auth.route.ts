import express from 'express';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Container from 'typedi';
import { SignInUserUseCase } from '../../application/use-cases/auth-user/sign-in-user.use-case';
import { SignUpUserUseCase } from '../../application/use-cases/auth-user/sign-up-user.use-case';

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

			if (token) {
				res.status(200).json({ token });
			} else {
				res.status(401).json({ error: 'Unathorized' });
			}

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
			await useCase.execute({email, password});

			return res.status(201).json({status: 'created'});

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.log(err);
			return res.status(400).json({ error: err.message });
		}

	});

export { router as authRouter };

/*
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