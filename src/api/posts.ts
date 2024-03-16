import {
  PostsQueryResult,
  Post,
  PostPageResult,
  CommentsResult,
} from "@/src/types";
import CommentsService from "./comments";

const PAGE_SIZE: number = 2;
const POSTS_URL: string = "http://localhost:8000/posts";

export default class PostsService {
  static async query(page: number): Promise<PostsQueryResult> {
    try {
      const result = await fetch(
        `${POSTS_URL}?_page=${page + 1}&_per_page=${PAGE_SIZE}`,
        { next: { revalidate: 3600 } }
      );
      return await result.json();
    } catch (error: unknown) {
      return { error: error?.toString() || "Something went wrong" };
    }
  }

  static async get(id: string): Promise<PostPageResult> {
    try {
      const getPostData = async (): Promise<Post> => {
        const res = await fetch(`${POSTS_URL}/${id}`, {
          next: { revalidate: 3600 },
        });

        return await res.json();
      };
      const [article, comments]: [Post, CommentsResult] = await Promise.all([
        getPostData(),
        CommentsService.query(id),
      ]);

      return {
        data: {
          ...article,
          comments: comments,
        },
      };
    } catch (error: unknown) {
      return { error: error?.toString() || "Something went wrong" };
    }
  }
}
