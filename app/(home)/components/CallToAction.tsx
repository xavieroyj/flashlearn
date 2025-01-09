import { Button } from '@/components/ui/button'

export default function CallToAction() {
  return (
    <section className="py-24 bg-gradient-to-b from-primary/20 to-primary/5">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl font-medium text-foreground mb-6">
          Ready to transform your learning?
        </h2>
        <p className="text-lg text-muted-foreground/90 mb-8 max-w-2xl mx-auto">
          Join thousands of students who are already learning smarter with FlashLearn
        </p>
        <Button
          size="lg"
          className="bg-primary text-black rounded-full px-8 h-12"
        >
          Get Started Free
        </Button>
      </div>
    </section>
  )
}