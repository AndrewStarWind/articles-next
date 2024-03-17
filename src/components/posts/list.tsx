"use client";
import { useState } from "react";
import PostPreview from "./item";
import PostService from "@/src/api/posts";
import { PostData, Post, isResultError, PostsQueryResult } from "@/src/types";

type PostsProps = {
  initialPosts: PostData;
};

export default function Posts({ initialPosts }: PostsProps): JSX.Element {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>(initialPosts.data);
  const [hasNext, setHasNext] = useState<boolean>(initialPosts.next);
  const [error, setError] = useState<string>();

  const loadMore = async () => {
    setIsLoading(true);
    const postsData: PostsQueryResult = await PostService.query(pageNumber + 1);

    if (!isResultError(postsData)) {
      setPosts([...posts, ...postsData.data]);
      setHasNext(postsData.next);
      setPageNumber(pageNumber + 1);
      setIsLoading(false);
    } else {
      setError(postsData.error);
    }
  };

  if (error) {
    return <>{error}</>;
  }

  // TODO: implement virtual scroll + cursor navigation
  return (
    <>
      <section className="mb-8">
        <div className="flex flex-wrap">
          {posts &&
            posts.map(
              (article: Post): JSX.Element => (
                <PostPreview key={article.id} data={article} />
              )
            )}
        </div>
      </section>

      {hasNext && (
        <nav className="flex mb-8">
          <button
            className="mx-auto py-2 px-3 bg-cyan-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none w-64 text-center"
            disabled={isLoading}
            onClick={loadMore}
          >
            {isLoading ? "Loading..." : "Load more"}
          </button>
        </nav>
      )}
    </>
  );
}
