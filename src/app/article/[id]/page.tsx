import loadPost from "@/src/actions/loadPost";
import ArticlePage from "@/src/components/article/item";
import { ArticlePageResult, isResultError } from "@/src/types";

type ArticleProps = {
  params: {
    id: string;
  };
};

export default async function ArticlePageComponent(
  props: ArticleProps
): Promise<JSX.Element> {
  const postData: ArticlePageResult = await loadPost(props.params.id);

  if (isResultError(postData)) {
    return <>{postData.error}</>;
  }

  return <ArticlePage item={postData?.data} />;
}
