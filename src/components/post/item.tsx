import type { PostPageData } from "@/src/types";
import CommentsList from "@/src/components/comments/list";
import Image from "next/image";

type PostPageProps = {
  item: PostPageData;
};

export default function PostPage({ item }: PostPageProps): JSX.Element {
  // for image let's pretend there is an image for background in a good quality
  // and an srcset for each image is present as well
  // and it is optimized for web by Compress Now or any other optimization tool
  // so i've just added priority=true here
  return (
    <>
      <header className="w-full relative mb-8">
        <div className=" w-full">
          <h1 className="relative w-full mx-auto text-center p-12 md:p-32 z-10 text-2xl md:text-6xl font-bold">
            {item.title}
          </h1>
          <Image
            fill
            priority
            src={item.imageSrc}
            alt={item.title}
            objectFit="cover"
          />
        </div>
      </header>
      <main>
        <div className="container mx-auto max-w-[1000px] mb-8">
          <section className="content m-4 text-justify">{item.content}</section>
        </div>
        <hr />
        <section>
          <div className="container mx-auto max-w-[1000px] mb-8">
            <CommentsList data={item.comments} postId={item.id} />
          </div>
        </section>
      </main>
    </>
  );
}
