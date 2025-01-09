import * as motion from "motion/react-client";
import { Brain, Upload, Users, Zap, ChartBar, Shield } from 'lucide-react'

const features = [
	{
		id: 1,
		title: 'AI-Powered Generation',
		description: 'Upload your study materials and let our AI create perfect flashcards instantly',
		icon: Brain,
		delay: 0,
	},
	{
		id: 2,
		title: 'Quick Import',
		description: 'Support for PDF, DOCX, and more. Just upload and start learning',
		icon: Upload,
		delay: 0.1,
	},
	{
		id: 3,
		title: 'Study Together',
		description: 'Share flashcards and study with friends in real-time',
		icon: Users,
		delay: 0.2,
	},
	{
		id: 4,
		title: 'Smart Review',
		description: 'AI adapts to your learning pace and suggests what to review next',
		icon: Zap,
		delay: 0.3,
	},
	{
		id: 5,
		title: 'Progress Tracking',
		description: 'Visual insights into your learning journey and improvements',
		icon: ChartBar,
		delay: 0.4,
	},
	{
		id: 6,
		title: 'Private & Secure',
		description: 'Your study materials are encrypted and completely private',
		icon: Shield,
		delay: 0.5,
	},
]

export default function Features() {
	return (
		<section className="py-24 bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
						Everything you need to excel in your studies
					</h2>
					<p className="text-lg text-muted-foreground">
						Powerful features combined with simplicity make learning effortless
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{features.map((feature) => (
						<div key={feature.id} className="bg-[#003738] p-8 rounded-[20px] hover:bg-[#004D4E] transition-colors">
							<div className="text-primary/90 mb-6">
								<feature.icon size={28} />
							</div>
							<h3 className="text-lg font-medium text-foreground mb-3">{feature.title}</h3>
							<p className="text-muted-foreground/80 text-sm leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}