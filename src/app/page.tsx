import Articles from "@/src/components/articles/list";
import loadArticles from "@/src/actions/loadPosts";
import { ArticlesQueryResult, isResultError } from "../types";

export default async function Home(): Promise<JSX.Element> {
  const initialArticles: ArticlesQueryResult = await loadArticles(0);

  if (isResultError(initialArticles)) {
    return <>{initialArticles.error}</>;
  }

  return (
    <main>
      <div className="container mx-auto px-4 mt-4">
        <Articles initialArticles={initialArticles} />
      </div>
    </main>
  );
}
