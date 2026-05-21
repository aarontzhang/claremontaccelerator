import { redirect, notFound } from "next/navigation";
import links from "../../../../links.json";

export default async function LinkRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = (links as Record<string, string>)[slug];

  if (!destination) notFound();

  redirect(destination);
}
