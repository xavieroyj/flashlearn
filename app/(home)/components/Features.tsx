import * as motion from "motion/react-client";
import { LightbulbIcon, UsersIcon, FolderIcon, SparklesIcon, RocketIcon, LockIcon } from "lucide-react";

const features = [
  {
    title: "AI-Powered Generation",
    description: "Upload your documents and let our AI create perfect flashcards in seconds. Support for multiple file formats including PDF, DOCX, and more.",
    icon: SparklesIcon,
    color: "bg-[#50e3c2]",
  },
  {
    title: "Collaborative Learning",
    description: "Share your flashcard collections with friends and study together. Perfect for group study sessions and exam preparation.",
    icon: UsersIcon,
    color: "bg-[#6366f1]",
  },
  {
    title: "Smart Organization",
    description: "Create collections to group related flashcards together. Keep your study materials organized and easily accessible.",
    icon: FolderIcon,
    color: "bg-[#f471b5]",
  },
  {
    title: "Manual Creation",
    description: "Create your own flashcards manually with our intuitive editor. Add images, format text, and customize to your needs.",
    icon: LightbulbIcon,
    color: "bg-[#50e3c2]",
  },
  {
    title: "Progress Tracking",
    description: "Track your learning progress with detailed statistics and insights. Know exactly what you've mastered and what needs review.",
    icon: RocketIcon,
    color: "bg-[#6366f1]",
  },
  {
    title: "Secure & Private",
    description: "Your data is encrypted and securely stored. Control who can access your flashcards with granular sharing permissions.",
    icon: LockIcon,
    color: "bg-[#f471b5]",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white to-slate-50 shadow-lg transform transition-transform group-hover:-translate-y-2" />
              <div className="relative p-8 space-y-4">
                <div className={`${feature.color} w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-outfit font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-600 font-inter">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}