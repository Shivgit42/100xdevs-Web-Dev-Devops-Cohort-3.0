import axios from "axios";

export default async function Blog({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const postId = (await params).postId;

  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  const data = response.data;

  return (
    <div>
      Blog post {postId}
      <br />
      title - {data.title} <br /> body - {data.body}
    </div>
  );
}
