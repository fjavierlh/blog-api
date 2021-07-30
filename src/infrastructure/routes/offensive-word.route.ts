import express from 'express';
import { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import passport from 'passport';
import Container from 'typedi';

import { CreateOffensiveWordUseCase } from '../../application/use-cases/offensive-word/create-offensive-word.use-case';
import { DeleteOffensiveUseCase } from '../../application/use-cases/offensive-word/delete-offensive-word.use-case';
import { FindAllOffensiveWordsUseCase } from '../../application/use-cases/offensive-word/find-all-offensive-word.use-case';
import { FindOffensiveWordById } from '../../application/use-cases/offensive-word/find-offensive-word-by-id.use-case';
import { OffensiveWordResponse } from '../../application/use-cases/offensive-word/offensive-word.response';
import { UpdateOffensiveWordByIdUseCase } from '../../application/use-cases/offensive-word/update-offensive-word-by-id.use-case';
import { ExceptionWithCode } from '../../domain/exception-with-code';
import { Role } from '../../domain/vos/auth-user/role.vo';
import { hasRole } from '../middlewares/roles.middleware';


const router = express.Router();

router.post('/api/offensive-word',
	body('word').isString().notEmpty().trim().escape(),
	body('level').isNumeric().notEmpty(),
	passport.authenticate('jwt', { session: false }),
	async (req: Request, res: Response) => {

		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

			const { word, level } = req.body;

			const newOffensiveWord = { word, level };
			const useCase: CreateOffensiveWordUseCase = Container.get(CreateOffensiveWordUseCase);

			await useCase.execute(newOffensiveWord);
			res.status(201).json({ 'msg': `offensive word '${word}' with level ${level} created` });

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return res.status(400).json({ errors: [{ msg: error.message }] });
		}

	});

router.delete('/api/offensive-word/:id',
	param('id').notEmpty().isUUID(),
	passport.authenticate('jwt', { session: false }),
	async (req: Request, res: Response) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

			const { id } = req.params;
			const useCase = Container.get(DeleteOffensiveUseCase);
			await useCase.execute(id);
			
			return res.status(200).json({ msg: `offensive word with id ${id} deleted` });

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return res.status(error.code).json({ errors: [{ msg: error.message }] });
		}

	});

router.get('/api/offensive-word',
	passport.authenticate('jwt', { session: false }),
	hasRole([Role.USER]),
	async (req: Request, res: Response) => {

		try {
			const useCase = Container.get(FindAllOffensiveWordsUseCase);
			const result = await useCase.execute();
			
			return res.status(200).json(result);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return res.status(error.code).json({ errors: [{ msg: error.message }] });
		}
	});

router.get('/api/offensive-word/:id',
	param('id').notEmpty().isUUID(),
	passport.authenticate('jwt', { session: false }),
	async (req: Request, res: Response) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
			
			const { id } = req.params;
			const useCase = Container.get(FindOffensiveWordById);
			const result: OffensiveWordResponse | null = await useCase.execute(id);
			if (!result) throw new ExceptionWithCode(404, `Offensive word with ID '${id}' not found`);
			
			return res.status(200).json(result);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return res.status(error.code).json({ errors: [{ msg: error.message }] });
		}
	});

router.put('/api/offensive-word/:id',
	param('id').notEmpty().isUUID(),
	passport.authenticate('jwt', { session: false }),
	async (req: Request, res: Response) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

			const { id } = req.params;
			const { word, level } = req.body;
			const useCase = Container.get(UpdateOffensiveWordByIdUseCase);
			const result = await useCase.execute(id, { word, level });
			
			return res.status(200).json(result);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return res.status(error.code).json({ errors: [{ msg: error.message }] });
		}
	});

export { router as offensiveWordRouter };