"use client";

import { Button } from "@/components/ui/button";
import { Question } from "@/lib/schemas";
import { useRouter } from "next/navigation";

interface QuizSectionProps {
    questions: Question[];
    collectionId: number;
    collectionName: string;
    onQuizComplete?: (score: number, answers: Record<number, string>) => Promise<void>;
}

export default function QuizSection({ questions, collectionId, collectionName, onQuizComplete }: QuizSectionProps) {
    const router = useRouter();

    return (
        <div className="flex justify-center">
            <Button
                size="lg"
                onClick={() => router.push(`/dashboard/collection/${collectionId}/quiz?callback=true`)}
                className="w-full max-w-md"
            >
                Start Quiz ({questions.length} questions)
            </Button>
        </div>
    );
}
