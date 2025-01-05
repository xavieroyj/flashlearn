import * as motion from "motion/react-client";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Upload Your Documents",
    description: "Simply upload your study materials - PDFs, documents, or notes. Our AI will handle the rest.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format",
  },
  {
    number: "02",
    title: "AI Creates Flashcards",
    description: "Our advanced AI analyzes your content and generates comprehensive flashcards automatically.",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=800&auto=format",
  },
  {
    number: "03",
    title: "Study & Collaborate",
    description: "Review your flashcards, share with friends, and track your progress as you learn.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#f0fdf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-outfit font-bold text-slate-900 mb-4"
          >
            How FlashLearn Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 font-inter"
          >
            Get started in minutes with our simple three-step process
          </motion.p>
        </div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12 lg:gap-20`}
            >
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-block px-4 py-2 rounded-full bg-[#50e3c2]/10 text-[#50e3c2] font-semibold mb-6">
                  Step {step.number}
                </div>
                <h3 className="text-2xl sm:text-3xl font-outfit font-bold text-slate-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-slate-600 font-inter max-w-xl mx-auto lg:mx-0">
                  {step.description}
                </p>
              </div>

              {/* Image */}
              <div className="flex-1 w-full max-w-xl lg:max-w-none">
                <div className="relative aspect-[4/3] w-full">
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#50e3c2]/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#6366f1]/10 rounded-full blur-2xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}