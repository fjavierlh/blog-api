import mongoose from 'mongoose';
import { CommentPostSchema } from './comment-post.schema';


const CommentListSchema = new mongoose.Schema({
	comments: {
		type: [CommentPostSchema],
		required: false
	}
});

export { CommentListSchema };