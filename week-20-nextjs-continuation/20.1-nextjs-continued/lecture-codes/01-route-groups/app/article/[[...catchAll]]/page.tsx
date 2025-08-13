export default async function Post({
  params,
}: {
  params: { catchAll: string };
}) {
  const catchAll = (await params).catchAll;
  return <div> {JSON.stringify(catchAll)}</div>;
}
