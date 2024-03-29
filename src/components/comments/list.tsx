"use client";
import { CommentsResult, isResultError, Comment } from "@/src/types";
import { useState } from "react";
import CommentsService from "@/src/api/comments";

import CommentForm from "./form";

type CommentsListProps = {
  data: CommentsResult;
  postId: string;
};

// TODO: instead of two callbacks it might be a good idead to use state managment
// but the page is too small and it really doesn't matter
export default function CommentsList({
  data,
  postId,
}: CommentsListProps): JSX.Element {
  const isError = isResultError(data);
  const [comments, setComments] = useState<Comment[]>(
    !isError ? data.data : []
  );
  const [error, setError] = useState<string>(isError ? data.error : "");

  if (error) {
    return <>{error}</>;
  }

  const submitCallback = async () => {
    const commentsData = await CommentsService.query(postId);

    if (isResultError(commentsData)) {
      setError(commentsData.error);
    } else {
      setComments(commentsData.data);
    }
  };

  return (
    <>
      <CommentForm postId={postId} onSubmitCallback={submitCallback} />
      <ul>
        {comments.map(({ text, id }: Comment) => (
          <li key={id}>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
