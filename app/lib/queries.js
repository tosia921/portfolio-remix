// This code selects all posts from the Sanity.io dataset.
export const postsQuery = `*[_type == "post" && defined(slug.current)]`

// This code selects a single post from the Sanity.io dataset.
export const postQuery = `*[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage,
    body,
    publishedAt,
    categories[] -> {
      title,
      _id
    },
    author -> {
      name
    }
  }`
