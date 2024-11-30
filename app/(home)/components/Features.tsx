import React from 'react';
import { motion } from "framer-motion";
import { FileText, Brain, Users, Sparkles } from "lucide-react";

const features = [
    {
        icon: FileText,
        title: "PDF to Flashcards",
        description: "Upload any PDF and instantly generate smart flashcards with our AI technology."
    },
    {
        icon: Brain,
        title: "AI-Powered Learning",
        description: "Our AI analyzes your content to create effective learning materials tailored to you."
    },
    {
        icon: Users,
        title: "Collaborative Learning",
        description: "Share collections and study together with friends or classmates."
    },
    {
        icon: Sparkles,
        title: "Smart Review",
        description: "Adaptive learning system that focuses on what you need to review most."
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Features() {
    return (
        <section id="features" className="py-24 bg-muted/30">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Why Choose FlashLearn?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Our platform combines the power of AI with proven learning techniques to help you master any subject efficiently.
                    </p>
                </div>

                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative p-6 bg-background rounded-lg border shadow-sm">
                                <feature.icon className="h-10 w-10 text-primary mb-4" />
                                <h3 className="font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}