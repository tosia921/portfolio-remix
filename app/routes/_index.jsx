export const meta = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

export default function Index() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<div className="rotate-[-3deg]">
				<h1 className="font-heading text-5xl font-black leading-[1]">
					welcome! i'm <span className="text-primary">Tomasz</span>
				</h1>
				<p className="font-heading text-7xl font-black leading-[0.9]">and I make</p>
				<p className="font-heading text-7xl font-black leading-[0.4]">websites</p>
			</div>
		</div>
	)
}
