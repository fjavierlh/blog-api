import mongoose from 'mongoose';

const connectToDB = async (): Promise<void> => {
	try {

		const HOST = process.env.MONGO_HOST ?? 'localhost';
		const PORT = process.env.MONGO_PORT ?? '27018';
		const DB_NAME = process.env.MONGO_DB_NAME ?? 'blog';
		const AUTH_SOURCE = process.env.MONGO_AUTH_SOURCE ?? 'admin';
		const USER = process.env.MONGO_DB_USER ?? 'admin';
		const PASSWORD = process.env.MONGO_DB_PASSWORD ?? 'admin';

		await mongoose.connect(`mongodb://${HOST}:${PORT}/${DB_NAME}`, {
			authSource: AUTH_SOURCE,
			auth: {
				user: USER,
				password: PASSWORD,
			},
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false
		});
	} catch (err) {
		console.log(err);
	}
};

export { connectToDB };