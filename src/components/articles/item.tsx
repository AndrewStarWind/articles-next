import Image from "next/image";
import Link from "next/link";

type Article = {
  imagesrc: string;
  title: string;
  content: string;
  id: string;
};

type ArticlePreviewProps = {
  data: Article;
};

// content may have some markup inside or could be JSX-element inside,
// but we will keep simple
export default function ArticlePreview({
  data: { imagesrc, title, id, content },
}: ArticlePreviewProps): JSX.Element {
  return (
    <article className="flex gap-4 flex-col md:flex-row md:basis-1/2 mb-8">
      <picture className="w-full h-48 md:h-full md:basis-1/2 relative">
        <Image fill src={imagesrc} alt="image" objectFit="cover" />
      </picture>
      <div className="md:basis-1/2 flex flex-col gap-2 mt-0 ml-0">
        <h3 className="text-lg font-bold truncate">{title}</h3>
        <div className="line-clamp-6">{content}</div>
        <Link
          className="ml-auto md:mr-auto md:ml-0 py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none w-32 text-center"
          href={`article/${id}`}
        >
          Read more...
        </Link>
      </div>
    </article>
  );
}
