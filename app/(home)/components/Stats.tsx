const stats = [
	{ id: 1, number: '4.9/5', label: 'Satisfaction Rating' },
	{ id: 2, number: '50K+', label: 'Active Users' },
]

export default function Stats() {
	return (
		<section className="flex gap-8">
			{stats.map((stat) => (
				<div key={stat.id} className="text-center">
					<div className="text-2xl font-semibold text-foreground">{stat.number}</div>
					<div className="text-sm text-muted-foreground">{stat.label}</div>
				</div>
			))}
		</section>
	)
}