import { CommentPostResponse } from './comment-post.response';

export type SinglePostResponse = {
    id: string,
    author: string,
    nickname: string,
    title: string,
    content: string,
    comments: Array<CommentPostResponse>
};