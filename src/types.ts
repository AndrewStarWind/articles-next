export type Post = {
  imageSrc: string;
  title: string;
  content: string;
  id: string;
};

export type PostData = {
  data: Post[];
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
export type PostPageResult = ResultEntity<PostPageData> | ResultError;
export type PostsQueryResult = PostData | ResultError;

type Results = CommentsResult | PostPageResult | PostsQueryResult;

export type PostPageData = Post & {
  comments: CommentsResult;
};

export function isResultError(result: Results): result is ResultError {
  if (result.hasOwnProperty("error")) {
    return true;
  }
  return false;
}
