import { json, redirect } from '@vercel/remix'

import { getSession, commitSession, destroySession } from '~/sessions'

// A `POST` request to this route will exit preview mode
export const action = async ({ request }) => {
	if (request.method !== 'POST') {
		return json({ message: 'Method not allowed' }, 405)
	}

	const session = await getSession(request.headers.get('Cookie'))

	return redirect('/', {
		headers: {
			'Set-Cookie': await destroySession(session),
		},
	})
}

// A `GET` request to this route will enter preview mode
export const loader = async ({ request }) => {
	const session = await getSession(request.headers.get('Cookie'))
	// See note on your responsibility to secure this token
	session.set(`sanity_preview`, process.env.SANITY_API_READ_TOKEN)

	console.log(session)

	// parse the search params for `?slug=`
	const url = new URL(request.url)
	const query = url.searchParams.get('slug')

	if (query) {
		return redirect(`/blog/${query}`, {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		})
	} else {
		return redirect(`/`, {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		})
	}
}
