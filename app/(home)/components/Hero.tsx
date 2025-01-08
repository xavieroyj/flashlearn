import * as motion from "motion/react-client";
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Hero() {
	return (
		<div className="relative overflow-hidden bg-gradient-to-b to-primary/5 from-primary/20 min-h-screen">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="pt-20 pb-16 lg:pt-40 lg:pb-32">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						{/* Left Column - Text Content */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="space-y-8"
						>
							{/* Main Heading */}
							<div className="space-y-2">
								<h1 className="text-4xl lg:text-6xl font-medium tracking-tight text-foreground">
									Master Any Subject
									<br />
									<span className="text-muted-foreground/80">with</span>
									<br />
									<span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
										AI-Powered Flashcards
									</span>
								</h1>
							</div>

							{/* Description */}
							<p className="text-lg text-slate-400 max-w-xl">
								Transform your learning experience with our intelligent flashcard system.
								Upload any material and let AI create perfect study cards for you.
							</p>

							{/* CTA Buttons */}
							<div className="flex flex-wrap gap-4">
								<Button
									size="lg"
									className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
								>
									Get Started Free
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="border-muted-foreground/30 text-muted-foreground hover:bg-muted-foreground/10"
								>
									Watch Demo
								</Button>
							</div>

							{/* Stats */}
							<div className="flex gap-8">
								<div>
									<div className="text-2xl font-semibold text-foreground">4.9/5</div>
									<div className="text-sm text-muted-foreground">Satisfaction Rating</div>
								</div>
								<div>
									<div className="text-2xl font-semibold text-foreground">50K+</div>
									<div className="text-sm text-muted-foreground">Active Users</div>
								</div>
							</div>
						</motion.div>

						{/* Right Column - Image */}
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="relative"
						>
							<div className="relative rounded-2xl overflow-hidden">
								<Image
									src="https://images.unsplash.com/photo-1471107191679-f26174d2d41e"
									alt="Study materials and notebook"
									width={800}
									height={600}
									className="w-full h-auto object-cover"
									priority
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	)
}