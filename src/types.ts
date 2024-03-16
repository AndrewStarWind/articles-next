export type Article = {
  imagesrc: string;
  title: string;
  content: string;
  id: string;
};

export type ArticleData = {
  data: Article[];
  next: boolean;
};

export type Comment = {
  id: string;
  text: string;
  postId: string;
};

export type ResultError = {
  error: string;
};

export type ResultQuery<T> = {
  data: T[];
};

export type ResultEntity<T> = {
  data: T;
};

export type CommentsResult = ResultQuery<Comment> | ResultError;
export type ArticlePageResult = ResultEntity<ArticlePageData> | ResultError;
export type ArticlesQueryResult = ArticleData | ResultError;

type Results = CommentsResult | ArticlePageResult | ArticlesQueryResult;

export type ArticlePageData = Article & {
  comments: CommentsResult;
};

export function isResultError(result: Results): result is ResultError {
  if (result.hasOwnProperty("error")) {
    return true;
  }
  return false;
}
