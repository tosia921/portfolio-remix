import { useLoaderData } from '@remix-run/react'
import Posts from '~/components/Posts'
import { getClient } from '~/lib/sanity'
import { getSession } from '~/sessions'
import { postsQuery } from '~/lib/queries'
import PostsPreview from '~/components/PostsPreview'

export const meta = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

export const loader = async ({ request }) => {
	// get a sesstion cookie token
	const session = await getSession(request.headers.get('Cookie'))
	const token = session.get('preview')

	// set preview to token if it exists
	const preview = token ? { token } : undefined

	//fetch posts data from Sanity
	const posts = await getClient(preview).fetch(postsQuery)

	return { posts, preview }
}

export default function Index() {
	// pass loader data to the component
	const { posts, preview } = useLoaderData()

	return preview?.token ? <PostsPreview posts={posts} /> : <Posts posts={posts} />
}
