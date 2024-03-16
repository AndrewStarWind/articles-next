import type { CommentsResult, Comment } from "@/src/types";

const getComments = async (articleId: string): Promise<CommentsResult> => {
  try {
    const result = await fetch(`http://localhost:8000/comments`);
    const data: Comment[] = await result.json();

    return {
      data: data.filter(({ postId }: Comment): boolean => postId === articleId),
    };
  } catch (error: unknown) {
    return { error: error?.toString() || "Something went wrong" };
  }
};

export default getComments;
