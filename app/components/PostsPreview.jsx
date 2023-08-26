import { useLiveQuery } from "@sanity/preview-kit";
import Posts from "~/components/Posts";
import { postsQuery } from "~/lib/queries";

export default function PostsPreview({ posts }) {
  const [data] = useLiveQuery(posts, postsQuery);

  return <Posts posts={data} />;
}