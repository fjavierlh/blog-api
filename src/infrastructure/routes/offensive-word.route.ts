import express from 'express';
import Container from 'typedi';

import { CreateOffensiveWordUseCase } from '../../application/use-cases/create-offensive-word.use-case';
import { DeleteOffensiveUseCase } from '../../application/use-cases/delete-offensive-word.use-case';
import { FindAllOffensiveWordsUseCase } from '../../application/use-cases/find-all-offensive-word.use-case';
import { FindOffensiveWordById } from '../../application/use-cases/show-offensive-word-by-id.use-case';
import { UpdateOffensiveWordByIdUseCase } from '../../application/use-cases/update-offensive-word-by-id.use-case';


const router = express.Router();

router.post('/api/offensive-word', (req, res) => {

	try {
		const { word, level } = req.body;
		if (!word ?? !level) {
			throw Error(`Missing properties in request body: ${!word ? 'word, ' : ''} ${!level ? 'level' : ''}`);
		}

		const newOffensiveWord = { word, level };
		const useCase = Container.get(CreateOffensiveWordUseCase);

		useCase.execute(newOffensiveWord);
		res.sendStatus(201);

	} catch (error) {
		console.log('(!) Exception: ', error.message);
		res.sendStatus(400);

	} 

});

router.delete('/api/offensive-word/:id', (req, res) => {
	
	try {
		const { id } = req.params;
		if (!id) throw Error('Param ID is missing');

		const useCase = Container.get(DeleteOffensiveUseCase);

		useCase.execute(id);
		res.sendStatus(200);

	} catch (error) {
		console.log('[!] Stacktrace: ', error.stack);
		res.sendStatus(400);

	}

});

router.get('/api/offensive-word', async (req, res) => {
	try {
		const useCase = Container.get(FindAllOffensiveWordsUseCase);

		const result = await useCase.execute();
		res.json(result);

	} catch (error) {
		console.log('[!] Stacktrace: ', error.stack);
		res.sendStatus(404);


	}
});

router.get('/api/offensive-word/:id', async (req, res) => {

	try {
		const { id } = req.params;
		if (!id) throw Error('Param ID is missing');

		const useCase = Container.get(FindOffensiveWordById);

		const result = await useCase.execute(id);
		res.json(result);

	} catch (error) {
		console.log('[!] Stacktrace: ', error.stack);
		res.sendStatus(404);

	} 
});

router.put('/api/offensive-word/:id', async (req, res) => {
	
	try {
		const { id } = req.params;
		const { word, level } = req.body;
		const useCase = Container.get(UpdateOffensiveWordByIdUseCase);

		const result = await useCase.execute(id, { word, level });
		res.json(result);

	} catch(error) {
		console.log('[!] Stacktrace: ', error.stack);
		res.sendStatus(404);

	}
	
});

export { router as offensiveWordRouter };