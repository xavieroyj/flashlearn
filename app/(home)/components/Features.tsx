import * as motion from "motion/react-client";
import { Sparkles, Users, FolderIcon, Lightbulb, Rocket, Lock } from "lucide-react";

const features = [
  {
    title: "AI-Powered Generation",
    description: "Upload your documents and let our AI create perfect flashcards in seconds. Support for multiple file formats including PDF, DOCX, and more.",
    icon: Sparkles,
    iconColor: "text-[#50e3c2]",
    bgColor: "bg-[#e6fff9]",
  },
  {
    title: "Collaborative Learning",
    description: "Share your flashcard collections with friends and study together. Perfect for group study sessions and exam preparation.",
    icon: Users,
    iconColor: "text-[#6366f1]",
    bgColor: "bg-[#eef2ff]",
  },
  {
    title: "Smart Organization",
    description: "Create collections to group related flashcards together. Keep your study materials organized and easily accessible.",
    icon: FolderIcon,
    iconColor: "text-[#f471b5]",
    bgColor: "bg-[#fce7f3]",
  },
  {
    title: "Manual Creation",
    description: "Create your own flashcards manually with our intuitive editor. Add images, format text, and customize to your needs.",
    icon: Lightbulb,
    iconColor: "text-[#50e3c2]",
    bgColor: "bg-[#e6fff9]",
  },
  {
    title: "Progress Tracking",
    description: "Track your learning progress with detailed statistics and insights. Know exactly what you've mastered and what needs review.",
    icon: Rocket,
    iconColor: "text-[#6366f1]",
    bgColor: "bg-[#eef2ff]",
  },
  {
    title: "Secure & Private",
    description: "Your data is encrypted and securely stored. Control who can access your flashcards with granular sharing permissions.",
    icon: Lock,
    iconColor: "text-[#f471b5]",
    bgColor: "bg-[#fce7f3]",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-outfit font-bold text-slate-900 mb-4"
          >
            Everything you need to learn effectively
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 font-inter"
          >
            Powerful features to transform your learning experience and help you achieve your goals faster.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm"
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-outfit font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 font-inter text-[15px] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}