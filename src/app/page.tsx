import Posts from "@/src/components/posts/list";
import PostService from "@/src/api/posts";
import { PostsQueryResult, isResultError } from "../types";

export default async function Home(): Promise<JSX.Element> {
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
