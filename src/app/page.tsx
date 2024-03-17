import Posts from "@/src/components/posts/list";
import PostService from "@/src/api/posts";
import { PostsQueryResult, isResultError } from "../types";

export default async function Home(): Promise<JSX.Element> {
  // TODO: it would be a good idea to load data inside getStaticProps
  // for now just cache invalidation option is added inside fetch request
  // described: https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props
  const initialPosts: PostsQueryResult = await PostService.query(0);

  if (isResultError(initialPosts)) {
    return <>{initialPosts.error}</>;
  }

  return (
    <main>
      <div className="container mx-auto px-4 mt-4">
        <Posts initialPosts={initialPosts} />
      </div>
    </main>
  );
}
