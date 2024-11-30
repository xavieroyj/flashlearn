import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-background to-muted/50" />
            
            {/* Content */}
            <div className="container relative z-10 flex flex-col items-center text-center space-y-8 pt-20">
                <div className="space-y-4"
                >
                    <div className="flex items-center justify-center space-x-2 text-primary">
                        <Brain className="h-6 w-6" />
                        <span className="text-lg font-medium">AI-Powered Learning</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Learn Smarter with{" "}
                        <span className="relative">
                            FlashLearn
                            <Sparkles className="absolute -top-6 -right-6 h-5 w-5 text-primary animate-pulse" />
                        </span>
                    </h1>
                    
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Create, study, and master any subject with AI-generated flashcards. Perfect for students, professionals, and lifelong learners.
                    </p>
                </div>

                <div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button size="lg" asChild>
                        <Link href="/register" className="group">
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="#features">Learn More</Link>
                    </Button>
                </div>

                {/* Preview Image */}
                <div
                    className="relative w-full max-w-5xl mx-auto mt-8"
                >
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg border bg-background/40 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-background/5" />
                        {/* Add your app screenshot/preview here */}
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
                            App Preview
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}