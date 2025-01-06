import { Card } from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "./components/LoginForm";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Branding */}
      <div className="relative hidden lg:block">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
            alt="Study environment"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#50e3c2]/90 via-[#6366f1]/60 to-[#f471b5]/40 backdrop-blur-sm" />
        </div>

        <div
          className="relative z-10 flex flex-col justify-between h-full p-12"
        >
          <div className="flex items-center gap-3">
              <Image src="/icon.svg" alt="FlashLearn" width={48} height={48} />
              <span className="text-xl font-outfit font-bold text-white">
                FlashLearn
              </span>
          </div>

          <div className="space-y-8">
            <blockquote className="text-3xl font-outfit text-white leading-relaxed">
              "FlashLearn has transformed the way I study. The AI-generated flashcards save me hours of preparation time."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md" />
              <div className="text-white">
                <p className="font-medium font-outfit">Sarah Chen</p>
                <p className="text-sm font-inter text-white/80">Medical Student, Stanford University</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-6 bg-black">
        <div 
          className="w-full max-w-[420px] space-y-8"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-outfit font-bold text-white">
              Welcome back
            </h1>
            <p className="text-[15px] text-white/60 font-inter">
              Enter your credentials to access your account
            </p>
          </div>

          <Card className="p-6 bg-[#111] border-white/5 rounded-2xl">
            <LoginForm />
          </Card>

          <div className="flex items-center justify-center gap-2 text-sm font-inter">
            <span className="text-white/60">Don't have an account?</span>
            <Link 
              href="/register" 
              className="group flex items-center gap-1.5 text-[#50e3c2] hover:text-[#3bc5a7] transition-colors font-medium"
            >
              Sign up for free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}