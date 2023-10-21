// import { cssBundleHref } from "@remix-run/css-bundle";
import stylesheet from '~/tailwind.css'

import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import { lazy, Suspense } from 'react'
import { getSession } from '~/sessions'

import Layout from './components/Layout'

export const links = () => [
	{
		rel: 'preconnect',
		href: 'https://fonts.googleapis.com',
	},
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'true',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,700;1,800;1,900&display=swap',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
	},
	{ rel: 'stylesheet', href: stylesheet },
]

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'))

export const loader = async ({ request }) => {
	const session = await getSession(request.headers.get('Cookie'))
	const token = session.get('preview')
	const preview = token ? { token } : undefined

	return { preview }
}

export default function App() {
	const { preview } = useLoaderData()
	const children = <Outlet />

	if (process.env.NODE_ENV === 'development') console.log('dev env')

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Layout>
					{preview?.token ? (
						<PreviewProvider token={preview.token}>
							<Suspense fallback={children}>{children}</Suspense>
						</PreviewProvider>
					) : (
						children
					)}
				</Layout>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
