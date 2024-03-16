export default async function postComment(comment: {
  postId: string;
  text: string;
}) {
  return fetch("http://localhost:8000/comments", {
    method: "POST",
    body: JSON.stringify(comment),
  });
}
