"use client";
import { CommentsResult, isResultError, Comment } from "@/src/types";
import { useState } from "react";
import loadComments from "@/src/actions/loadComments";

import CommentForm from "./form";

type CommentsListProps = {
  data: CommentsResult;
  postId: string;
};

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
    const commentsData = await loadComments(postId);

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
