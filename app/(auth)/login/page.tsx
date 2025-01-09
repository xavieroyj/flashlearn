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
          {/* Updated gradient using brand colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#80e5e9]/60 via-[#4cc9cd]/10 to-background/40 backdrop-blur-sm" />
          {/* Added noise texture */}
          <div className="absolute inset-0 bg-noise-pattern opacity-[0.03] bg-repeat" />
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -z-10 blur-[100px] bg-primary/20 rounded-full w-[64px] h-[64px]" />
              <Image src="/icon.svg" alt="FlashLearn" width={48} height={48} />
            </div>
            <span className="text-xl font-outfit font-bold text-white">
              FlashLearn
            </span>
          </div>

          <div className="space-y-8">
            <blockquote className="text-3xl font-outfit text-white leading-relaxed relative">
              <div className="absolute -z-10 blur-[100px] bg-primary/10 rounded-full w-[300px] h-[100px]" />
              {"FlashLearn has transformed the way I study. The AI-generated flashcards save me hours of preparation time."}
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/[0.05]" />
              <div className="text-white">
                <p className="font-medium font-outfit">Sarah Chen</p>
                <p className="text-sm font-inter text-white/80">Medical Student, Stanford University</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-6 bg-background relative">
        {/* Background glow effect */}
        <div className="absolute -z-10 blur-[100px] bg-primary/5 rounded-full w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="w-full max-w-[420px] space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-outfit font-bold bg-gradient-to-r from-[#80e5e9] to-[#4cc9cd] text-transparent bg-clip-text">
              Welcome back
            </h1>
            <p className="text-[15px] text-muted-foreground/70 font-inter">
              Enter your credentials to access your account
            </p>
          </div>

          <Card className="p-6 bg-card border-white/[0.05] rounded-[20px] relative overflow-hidden">
            <div className="absolute -z-10 inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
            <LoginForm />
          </Card>

          <div className="flex items-center justify-center gap-2 text-sm font-inter">
            <span className="text-muted-foreground/70">{"Don't have an account?"}</span>
            <Link 
              href="/register" 
              className="group flex items-center gap-1.5 text-primary hover:text-primary/90 transition-colors font-medium"
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