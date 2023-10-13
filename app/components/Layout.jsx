export default function Layout({ children }) {
	return (
		<div className="bg-background text-foreground flex min-h-screen flex-col">
			<header className="h-20">This is header</header>
			<main className="flex-grow">{children}</main>
			<footer className="h-20">This is footer</footer>
		</div>
	)
}
