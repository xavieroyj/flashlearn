import React from 'react';
import { motion } from "framer-motion";
import { FileUp, Sparkles, Brain } from 'lucide-react';

const steps = [
    {
        icon: FileUp,
        title: "Upload Your Content",
        description: "Start by uploading your study material - PDF documents, notes, or textbooks."
    },
    {
        icon: Sparkles,
        title: "AI Magic",
        description: "Our AI analyzes your content and generates smart, effective flashcards."
    },
    {
        icon: Brain,
        title: "Start Learning",
        description: "Review your flashcards, track progress, and master the material at your own pace."
    }
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Transform any study material into an effective learning experience in three simple steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative"
                        >
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent -z-10" />
                            )}

                            <div className="flex flex-col items-center text-center">
                                <div className="mb-6 p-4 rounded-full bg-primary/10">
                                    <step.icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}