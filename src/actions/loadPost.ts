import {
  Article,
  ArticlePageResult,
  CommentsResult
} from "@/src/types";
import loadComments from "./loadComments";

const loadArticle = async (id: string): Promise<ArticlePageResult> => {
  try {
    const getArticleData = async (): Promise<Article> => {
      const res = await fetch(`http://localhost:8000/posts/${id}`, {
        next: { revalidate: 3600 },
      });

      return await res.json();
    };
    const [article, comments]: [Article, CommentsResult] = await Promise.all([
      getArticleData(),
      loadComments(id),
    ]);

    return {
      data: {
        ...article,
        comments: comments,
      },
    };
  } catch (error: unknown) {
    return { error: error?.toString() || "Something went wrong" };
  }
};

export default loadArticle;
