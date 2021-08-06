import app, { HOSTNAME, SERVER_PORT, TRANSFER_PROTOCOL } from './app';
import { connectToDB }  from './infrastructure/config/mongo';
import { connectToUsersdDB } from './infrastructure/config/postgres';
import { populateDatabase as populateUsersDatabase } from './infrastructure/config/populate';

connectToDB();

(async () => {
	await connectToUsersdDB();
	await populateUsersDatabase();
})();

app.listen(SERVER_PORT, () => {
	console.log(`Server started on ${TRANSFER_PROTOCOL}://${HOSTNAME}:${SERVER_PORT}`);
});
/*
function connectToOffensiveWordsDB() {
	throw new Error('Function not implemented.');
}
*/