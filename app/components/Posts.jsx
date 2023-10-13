// ./app/components/Posts.tsx

import { Link } from '@remix-run/react'

export default function Posts({ posts }) {
	return (
		<main className="container mx-auto grid grid-cols-1 divide-y divide-blue-100">
			{posts?.length > 0 ? (
				posts.map((post) => (
					<Link key={post._id} to={post.slug.current} className="p-4 hover:bg-blue-50">
						<h2 className="font-heading font-normal">{post.title}</h2>
					</Link>
				))
			) : (
				<div className="p-4">No posts found</div>
			)}
		</main>
	)
}
