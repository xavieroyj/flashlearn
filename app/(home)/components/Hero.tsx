import * as motion from "motion/react-client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f0fdf9] to-[#e8f7ff]">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#50e3c2] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-[#6366f1] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-[#f471b5] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0f172a] to-[#334155]">
              Transform Your Learning with
              <span className="block text-[#50e3c2]">AI-Powered Flashcards</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 font-inter"
          >
            Upload your documents and let AI create perfect flashcards for you. Study smarter, 
            collaborate with friends, and master any subject with FlashLearn.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-[#50e3c2] hover:bg-[#3bc5a7] text-white font-semibold rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Try for free today!
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-lg border-2"
            >
              Watch how it works
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="pt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 max-w-2xl mx-auto"
          >
            <div className="p-4 rounded-2xl bg-white backdrop-blur-sm">
              <p className="text-2xl font-bold text-[#50e3c2]">10k+</p>
              <p className="text-sm text-slate-600">Active Users</p>
            </div>
            <div className="p-4 rounded-2xl bg-white">
              <p className="text-2xl font-bold text-[#50e3c2]">1M+</p>
              <p className="text-sm text-slate-600">Flashcards Created</p>
            </div>
            <div className="p-4 rounded-2xl bg-white sm:col-span-1 col-span-2">
              <p className="text-2xl font-bold text-[#50e3c2]">4.9/5</p>
              <p className="text-sm text-slate-600">User Rating</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}