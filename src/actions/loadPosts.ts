import { ArticlesQueryResult } from "@/src/types";

const getPosts = async (page: number = 0): Promise<ArticlesQueryResult> => {
  try {
    const result = await fetch(
      `http://localhost:8000/posts?_page=${page + 1}&_per_page=2`,
      { next: { revalidate: 3600 } }
    );
    return await result.json();
  } catch (error: unknown) {
    return { error: error?.toString() || "Something went wrong" };
  }
};

export default getPosts;
