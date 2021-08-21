import { CommentPost } from '../entities/comment-post.entity';
import { Post } from '../entities/post.entity';
import { IdVO } from '../vos/id.vo';

export interface PostRepository {

    getAllPosts(): Promise<Post[]>;

    getPostByID(postID: IdVO): Promise<Post>;
    
    persistPost(post: Post): Promise<void>;

    updatePost(postID: IdVO, updatedPost: Post): Promise<Post>;

    deletePostByID(postID: IdVO): Promise<void>;

    saveCommentInPost(postID: IdVO, comment: CommentPost): Promise<void>;

    updateCommentInPost(postID: IdVO, updatedComment: CommentPost): Promise<void>;

    deleteCommentInPost(postID: IdVO, commentID: IdVO): Promise<void>;

    checkIfPostExists(postID: IdVO): Promise<boolean>

}