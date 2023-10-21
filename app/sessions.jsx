// Development setup

// import { createCookieSessionStorage } from '@vercel/remix'

// const { getSession, commitSession, destroySession } = createCookieSessionStorage({
// 	cookie: {
// 		name: '__session',
// 		sameSite: 'lax',
// 		secrets: ['s3cr3ts'],
// 	},
// })

// export { getSession, commitSession, destroySession }

// sessions/upstash.server.ts

// sessions.server.ts

import { createUpstashSessionStorage } from '~/sessions/upstash.server'
import { createCookie } from '@vercel/remix'
import { createFileSessionStorage } from '@remix-run/node'

// This will set the length of the session.
// For the example we use a very short duration to easily demonstrate its functionally.
const EXPIRATION_DURATION_IN_SECONDS = 44200 // half a day

const expires = new Date()
expires.setSeconds(expires.getSeconds() + EXPIRATION_DURATION_IN_SECONDS)

const ProductionSanityLivePreviewsessionCookie = createCookie('preview', {
	secrets: ['r3m1xr0ck1'],
	sameSite: 'None',
	secure: true,
	expires,
})

const DevelopmentSanityLivePreviewsessionCookie = createCookie('preview', {
	secrets: ['r3m1xr0ck1'],
	sameSite: 'Lax',
})

const { getSession, commitSession, destroySession } = createUpstashSessionStorage({ cookie: ProductionSanityLivePreviewsessionCookie })
//process.env.NODE_ENV === 'development'
//? createFileSessionStorage({ cookie: DevelopmentSanityLivePreviewsessionCookie, dir: './sessions' })
//:

export { getSession, commitSession, destroySession }
