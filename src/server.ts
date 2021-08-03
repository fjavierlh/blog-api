import app, { HOSTNAME, SERVER_PORT, TRANSFER_PROTOCOL } from './app';

app.listen(SERVER_PORT, () => {
	console.log(`Server started on ${TRANSFER_PROTOCOL}://${HOSTNAME}:${SERVER_PORT}`);
});