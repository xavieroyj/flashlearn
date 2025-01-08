import * as motion from "motion/react-client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'How does the AI generate flashcards?',
    answer: 'Our AI analyzes your study materials using advanced natural language processing to identify key concepts, definitions, and important relationships. It then creates optimized flashcards that help you learn effectively.',
  },
  {
    question: 'What file formats are supported?',
    answer: 'We support PDF, DOCX, TXT, and image files (JPG, PNG). More formats are being added regularly.',
  },
  {
    question: 'Can I share my flashcards with others?',
    answer: 'Yes! You can share your flashcard collections with friends or study groups. Pro users can also collaborate in real-time.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use enterprise-grade encryption to protect your data. Your study materials and flashcards are completely private and secure.',
  },
]

export default function FAQ() {
  return (
    <section className="py-24 bg-muted">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about FlashLearn
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}