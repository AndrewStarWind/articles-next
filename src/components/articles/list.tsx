"use client";
import { useState } from "react";
import ArticlePreview from "./item";
import getPosts from "@/src/actions/loadPosts";
import {
  ArticleData,
  Article,
  isResultError,
  ArticlesQueryResult,
} from "../../types";

type PostsProps = {
  initialArticles: ArticleData;
};

export default function Posts({ initialArticles }: PostsProps): JSX.Element {
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Article[]>(initialArticles.data);
  const [hasNext, setHasNext] = useState<boolean>(initialArticles.next);
  const [error, setError] = useState<string>();

  const loadMore = async () => {
    setIsLoading(true);

    // TODO: it would be a good idea to load data inside getStaticProps
    // for now just cache invalidation option is added inside fetch request
    // described: https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props
    const articlesData: ArticlesQueryResult = await getPosts(page + 1);

    if (!isResultError(articlesData)) {
      setPosts([...posts, ...articlesData.data]);
      setHasNext(articlesData.next);
      setPage(page + 1);
      setIsLoading(false);
    } else {
      setError(articlesData.error);
    }
  };

  if (error) {
    return <>{error}</>;
  }

  // TODO: implement virtual scroll + cursor navigation
  return (
    <>
      <section className="">
        <div className="flex flex-wrap">
          {posts &&
            posts.map(
              (article: Article): JSX.Element => (
                <ArticlePreview key={article.id} data={article} />
              )
            )}
        </div>
      </section>

      {hasNext && (
        <nav className="flex">
          <button
            className="mx-auto py-2 px-3 bg-cyan-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none w-64 text-center"
            disabled={isLoading}
            onClick={() => loadMore()}
          >
            {isLoading ? "Loading..." : "Load more"}
          </button>
        </nav>
      )}
    </>
  );
}
