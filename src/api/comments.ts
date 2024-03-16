import type { CommentsResult, Comment } from "@/src/types";

const COMMENTS_URL: string = `http://localhost:8000/comments`;

export default class CommentsService {
  static async query(postId: string): Promise<CommentsResult> {
    try {
      const result = await fetch(COMMENTS_URL);
      const data: Comment[] = await result.json();

      return {
        data: data.filter(
          (comment: Comment): boolean => comment.postId === postId
        ),
      };
    } catch (error: unknown) {
      return { error: error?.toString() || "Something went wrong" };
    }
  }

  static async post(comment: { postId: string; text: string }) {
    return fetch(COMMENTS_URL, {
      method: "POST",
      body: JSON.stringify(comment),
    });
  }
}
