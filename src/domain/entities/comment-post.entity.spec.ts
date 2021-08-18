import { CommentContentVO } from '../vos/comments/comment-content.vo';
import { CommentDateVO } from '../vos/comments/comment-date.vo';
import { CommentNicknameVO } from '../vos/comments/comment-nickname.vo';
import { IdVO } from '../vos/id.vo';
import { CommentPost, CommentPostType } from './comment-post.entity';
describe('Comment entity test suite', () => {
	it('should create a comment if parameter are valid', () => {

		const validUUID = '6ae0e09f-f7fd-48f9-913c-ef5a3814a12d';
		const validNickname = 'nickname';
		const validContent = 'This is a valid comment content';
		const validDate = '1629295835829';


		const commentPostType: CommentPostType = {
			id: IdVO.createWithUUID(validUUID),
			nickname: CommentNicknameVO.create(validNickname),
			content: CommentContentVO.create(validContent),
			date: CommentDateVO.createWithDate('1629295835829')
		};
		
		const commentToTest = new CommentPost(commentPostType);

		expect(commentToTest.id.value).toBe(validUUID);
		expect(commentToTest.nickname.value).toBe(validNickname);
		expect(commentToTest.content.value).toBe(validContent);
		expect(commentToTest.date.value).toBe(validDate);
	});

	it('should throw an error if create a comment post with invalid arguments', () => {
		expect(() => {

			const validUUID = '6ae0e09f-f7fd-48f9-913c-ef5a3814a12X';
			const validNickname = 'validunickname';
			const validContent = 'This is a valid comment content';

			new CommentPost({
				id: IdVO.createWithUUID(validUUID),
				nickname: CommentNicknameVO.create(validNickname),
				content: CommentContentVO.create(validContent),
				date: CommentDateVO.create()
			});

		}).toThrow();
	});
});