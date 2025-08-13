export default async function Post({
  params,
}: {
  params: { allSubRoutes: string };
}) {
  const allSubRoutes = (await params).allSubRoutes;
  return <div>All Sub Routes {JSON.stringify(allSubRoutes)}</div>;
}
