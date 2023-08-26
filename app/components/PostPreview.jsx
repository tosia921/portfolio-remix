import { useParams } from "@remix-run/react";
import { useLiveQuery } from "@sanity/preview-kit";
import Post from "~/components/Post";
import { postQuery } from "~/lib/queries";

export default function PostPreview({ post }) {
  const params = useParams();
  const [data] = useLiveQuery(post, postQuery, params);

  return <Post post={data} />;
}