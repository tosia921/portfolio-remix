import PortableTextRenderer from './PortableTextRenderer'
import urlBuilder from '@sanity/image-url'
import { projectId, dataset } from '~/lib/sanity'

const builder = urlBuilder({ projectId, dataset })

const AuthorName = ({ author }) => {
	return <p className="text-s m-0">by {author}</p>
}

const Categories = ({ categories }) => {
	return (
		<ul className="m-0 flex list-none gap-2 p-0 py-2">
			{categories.map((category) => {
				return (
					<li className="bg-gray-300 px-4 py-2 text-xs uppercase" key={category._id}>
						{category.title}
					</li>
				)
			})}
		</ul>
	)
}

// ./components/Post.jsx

export default function Post({ post }) {
	const { title, mainImage, body, publishedAt, categories, author } = post

	return (
		<main className="container prose prose-sm mx-auto max-w-[800px] p-4 font-heading text-lg">
			{title ? <h1 className="mb-0 font-heading text-5xl uppercase">{title}</h1> : null}
			{author ? <AuthorName author={author.name} /> : null}
			{categories.length > 0 ? <Categories categories={categories} /> : null}
			{mainImage ? <img className="my-2 h-auto w-full" src={builder.image(mainImage).quality(80).url()} alt={title} /> : null}
			<PortableTextRenderer body={body} />
		</main>
	)
}
