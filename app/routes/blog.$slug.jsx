import { useLoaderData } from '@remix-run/react'
import Post from '~/components/Post'
import PostPreview from '~/components/PostPreview'
import { postQuery } from '~/lib/queries'
import { getClient } from '~/lib/sanity'
import { getSession } from '~/sessions'

export const loader = async ({ request, params }) => {
	const session = await getSession(request.headers.get('Cookie'))
	const token = session.get('sanity_preview')
	const preview = token ? { token } : undefined
	const post = await getClient(preview).fetch(postQuery, params)

	return { token, post, preview, params }
}

// This code renders a page to display a blog post. It uses the useLoaderData hook to get the post data from the loader.
export default function PostRoute() {
	const { token, post, preview } = useLoaderData()

	console.log(token)
	console.log(post)
	console.log(preview)

	return preview?.token ? <PostPreview post={post} /> : <Post post={post} />
}
