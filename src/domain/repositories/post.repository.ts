import { CommentPost } from '../entities/comment-post.entity';
import { Post } from '../entities/post.entity';
import { IdVO } from '../vos/id.vo';

export interface PostRepository {

    getAllPosts(): Promise<Post[]>;

    getPostByID(postId: IdVO): Promise<Post|null>;
    
    persistPost(post: Post): Promise<void>;

    updatePost(postId: IdVO, updatedPost: Post): Promise<void>;

    deletePostById(postId: IdVO): Promise<void>;

    saveCommentInPost(postId: IdVO, comment: CommentPost): Promise<void>;

    updateCommentInPost(postId: IdVO, updatedComment: CommentPost): Promise<void>;

    deleteCommentInPost(postId: IdVO, commentId: IdVO): Promise<void>;

}