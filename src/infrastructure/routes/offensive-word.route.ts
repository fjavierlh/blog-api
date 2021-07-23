import express from 'express';
import Container from 'typedi';
import { CreateOffensiveWordUseCase } from '../../application/use-cases/create-offensive-word.use-case';
import { DeleteOffensiveUseCase } from '../../application/use-cases/delete-offensive-word.use-case';
import { FindAllOffensiveWordsUseCase } from '../../application/use-cases/find-all-offensive-word.use-case';
import { OffensiveWordRequest } from '../../application/use-cases/offensive-word.request';
import { ShowOffensiveWordById } from '../../application/use-cases/show-offensive-word-by-id.use-case';


const router = express.Router();

router.post('/api/offensive-word', (req, res) => {
	let postSuccess = false;
	
	try {
		const { word, level } = req.body;

		if (!word || !level) throw Error(`Missing properties in request body: ${!word ? 'word, ' : ''} ${!level ? 'level' : ''}`);

		const newOffensiveWord: OffensiveWordRequest = { word, level };
		const useCase = Container.get(CreateOffensiveWordUseCase);
		useCase.execute(newOffensiveWord);
		postSuccess = true;

	} catch(error) {
		console.log('(!) Exception: ', error.message);

	} finally {
		postSuccess ? res.sendStatus(201) : res.sendStatus(400);

	}

});


router.delete('/api/offensive-word/:id', (req, res) => {
	let deletedSuccess = false;
	console.log(req.params);

	try {
		const { id } = req.params;

		if (!id) throw Error('Param ID is missing');

		const useCase = Container.get(DeleteOffensiveUseCase);
		useCase.execute(id);
		deletedSuccess = true;

	} catch(error) {
		console.log('(!) Exception: ', error.message);

	} finally {
		deletedSuccess ? res.sendStatus(200) : res.sendStatus(400);

	}

});

router.get('/api/offensive-word', async (req, res) => {
	let getAllSuccess = false;
	let result = null;

	try {
		const useCase = Container.get(FindAllOffensiveWordsUseCase);
		result = await useCase.execute();
		getAllSuccess = true;

	} catch (error) {
		console.log('(!) Exception: ', error.message);

	} finally {
		getAllSuccess ? res.json(result) : res.sendStatus(404);

	}
});

router.get('/api/offensive-word/:id', async (req, res) => {
	let getOneSuccess = false;
	let result = null;
	
	try {
		const { id } = req.params;
		const useCase = Container.get(ShowOffensiveWordById);
		result = await useCase.execute(id);
		getOneSuccess = true;

	} catch (error) {
		console.log('(!) Exception: ', error);

	} finally {
		getOneSuccess ? res.json(result) : res.sendStatus(404);

	}
});

/*
router.put('/api/offensive-word/:id', async (req, res) => {
	const { id } = req.params;
	const { word, level } = req.body;

	const objectToUpdateOrCreate: OffensiveWordRequest = {
		id:'',
		word: word,
		level: level
	};

	const useCase = new ShowOffensiveWordById(new OffensiveWordService(new OffensiveWordRepositoryMongo));
	const result = await useCase.execute(id);
	console.log(result);

	res.json(result);


});

*/
export { router as offensiveWordRouter };