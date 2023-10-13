import { createCookie, createKvSessionStorage } from '@vercel/remix' // or cloudflare/deno

// In this example the Cookie is created separately.
const sessionCookie = createCookie('__session', {
	secrets: ['r3m1xr0ck5'],
	sameSite: true,
})

const { getSession, commitSession, destroySession } = createKvSessionStorage({
	// The root directory where you want to store the files.
	// Make sure it's writable!
	dir: '/app/sessions',
	cookie: sessionCookie,
})

export { getSession, commitSession, destroySession }
