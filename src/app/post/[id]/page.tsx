import PostService from "@/src/api/posts";
import PostPage from "@/src/components/post/item";
import { PostPageResult, isResultError } from "@/src/types";

type PostProps = {
  params: {
    id: string;
  };
};

export default async function PostPageComponent(
  props: PostProps
): Promise<JSX.Element> {
  const postData: PostPageResult = await PostService.get(props.params.id);

  if (isResultError(postData)) {
    return <>{postData.error}</>;
  }

  return <PostPage item={postData?.data} />;
}
