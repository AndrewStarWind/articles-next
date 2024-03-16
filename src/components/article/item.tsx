import type { ArticlePageData } from "@/src/types";
import CommentsList from "@/src/components/comments/list";
import Image from "next/image";

type ArticlePageProps = {
  item: ArticlePageData;
};

export default function ArticlePage({ item }: ArticlePageProps): JSX.Element {
  // for image let's pretend there is an image for background in a good quality
  // and an srcset for each image is present as well
  // and it is optimized for web by Compress Now or any other optimization tool
  return (
    <>
      <header className="w-full relative ">
        <div className=" w-full">
          <h1 className="relative w-full mx-auto text-center p-12 md:p-32 z-10 text-2xl md:text-6xl font-bold">
            {item.title}
          </h1>
          <Image fill src={item.imagesrc} alt={item.title} objectFit="cover" />
        </div>
      </header>
      <main>
        <div className="container mx-auto max-w-[1000px]">
          <section className="content p-4 text-justify">{item.content}</section>
        </div>
        <hr />
        <section>
          <div className="container mx-auto mt-8 max-w-[1000px]">
            <CommentsList data={item.comments} postId={item.id} />
          </div>
        </section>
      </main>
    </>
  );
}
