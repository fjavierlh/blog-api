import { CommentPost } from '../../entities/comment.entity';
import { CommentsListVO } from './comments-list.vo';

describe('CommentsListVO', () => {
	it('should create an CommentsListVO object if comments list is valid', () => {
		const validCommentsList: CommentPost[] = [];
		const commentsList = CommentsListVO.create(validCommentsList);

		expect(commentsList.value.length).toBe(0);
		
	});
});