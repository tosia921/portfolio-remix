import PortableTextRenderer from "./PortableTextRenderer";
import urlBuilder from '@sanity/image-url';
import { projectId, dataset } from '~/lib/sanity';

const builder = urlBuilder({ projectId, dataset });

const AuthorName = ({ author }) => {
    return <p className="m-0 text-s">by {author}</p> 
}

const Categories = ({ categories }) => {
    return (
        <ul className="flex gap-2 list-none p-0 m-0 py-2">
            {categories.map( category => {
                return (
                    <li className="text-xs bg-gray-300 px-4 py-2 uppercase">{category.title}</li>
                )
            })}
        </ul>
    )
}

// ./components/Post.jsx
export default function Post({ post }) {
  const { title, mainImage, body, publishedAt, categories, author } = post;

  console.log(body)

  return (
    <main className="container mx-auto  prose font-heading text-lg prose-sm max-w-[800px] p-4">
      {title ? <h1 className="font-heading uppercase text-5xl mb-0">{title}</h1> : null}
      {author ? <AuthorName author={author.name} /> : null}
      { categories.length > 0 ? <Categories categories={categories} /> : null}
      {mainImage ? <img className="w-full h-auto my-2" src={builder.image(mainImage).quality(80).url()} alt={title} /> : null}
      <PortableTextRenderer body={body} />
    </main>
  );
}
