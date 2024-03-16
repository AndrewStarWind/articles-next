import { useRef, SyntheticEvent, useState } from "react";
import CommentsService from "@/src/api/comments";

interface FormElements extends HTMLFormControlsCollection {
  comment: HTMLInputElement;
}

interface CommentFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function CommentForm(props: {
  postId: string;
  onSubmitCallback: () => void;
}): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: SyntheticEvent<CommentFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await CommentsService.post({
        postId: props.postId,
        text: e.currentTarget.elements.comment.value,
      });
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (err: unknown) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
    props.onSubmitCallback();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="pl-4 pr-4" htmlFor="comment">
        Comment:
      </label>
      <input
        className="block text-sm p-4 font-medium leading-6 text-white bg-black border-white border-2 rounded-md"
        placeholder="Your comment"
        ref={inputRef}
        type="text"
        id="comment"
        name="comment"
        required
      />
      <button
        type="submit"
        className="shrink ml-4 md:ml-auto mr-4 py-2 px-3 bg-cyan-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none md:w-64 text-center"
        disabled={isLoading}
      >
        Submit
      </button>
    </form>
  );
}
