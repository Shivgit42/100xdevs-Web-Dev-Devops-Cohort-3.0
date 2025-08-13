export default async function Blog({
  params,
}: {
  params: Promise<{
    blog: string;
  }>;
}) {
  const blog = (await params).blog;
  return <div>{JSON.stringify(blog)}</div>;
}
