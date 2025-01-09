const stats = [
	{ id: 1, number: '1M+', label: 'Flashcards Created' },
	{ id: 2, number: '50K+', label: 'Active Users' },
	{ id: 3, number: '4.9/5', label: 'App Store Rating' },
	{ id: 4, number: '95%', label: 'Success Rate' },
]

export default function Stats() {
	return (
		<section className="bg-[#003738] py-16">
			<div className="grid grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto gap-8 px-4">
				{stats.map((stat) => (
					<div key={stat.id} className="text-center">
						<div className="text-primary text-4xl font-medium mb-2">{stat.number}</div>
						<div className="text-muted-foreground/80 text-sm">{stat.label}</div>
					</div>
				))}
			</div>
		</section>
	)
}