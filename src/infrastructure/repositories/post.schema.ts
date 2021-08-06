import mongoose from 'mongoose';
import { CommentListSchema } from './comment-list.schema';

const PostSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	nickname: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	comments: {
		type: CommentListSchema,
		required: true
	},

});

const PostModel = mongoose.model('Post', PostSchema);

export { PostModel };