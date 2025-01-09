import * as motion from "motion/react-client";
import Image from "next/image";

const steps = [
	{
		number: '01',
		title: 'Upload Your Material',
		description: 'Simply upload your study material in any format - PDFs, documents, or even images.',
		image: 'https://images.unsplash.com/photo-1623276527153-fa38c1616b05',
	},
	{
		number: '02',
		title: 'AI Creates Flashcards',
		description: 'Our AI analyzes your content and generates perfect flashcards with key concepts.',
		image: 'https://images.unsplash.com/photo-1553227957-454e04fa8472',
	},
	{
		number: '03',
		title: 'Start Learning',
		description: 'Review your cards, track progress, and master the material at your own pace.',
		image: 'https://images.unsplash.com/photo-1471107191679-f26174d2d41e',
	},
]

export default function HowItWorks() {
	return (
		<section className="py-24 bg-muted">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
						How FlashLearn Works
					</h2>
					<p className="text-lg text-muted-foreground">
						Three simple steps to transform your learning experience
					</p>
				</div>

				<div className="space-y-24">
					{steps.map((step, index) => (
						<motion.div
							key={step.number}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
							className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
								}`}
						>
							<div className="flex-1">
								<div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-6">
									Step {step.number}
								</div>
								<h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
									{step.title}
								</h3>
								<p className="text-lg text-muted-foreground">
									{step.description}
								</p>
							</div>

							<div className="flex-1">
								<div className="relative aspect-video">
									<Image
										src={step.image}
										alt={step.title}
										fill
										className="object-cover rounded-2xl shadow-lg"
									/>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}