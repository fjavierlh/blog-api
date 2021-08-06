import mongoose from 'mongoose';

const CommentPostSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	nickname: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	}

});

export { CommentPostSchema };