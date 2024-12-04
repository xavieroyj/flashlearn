"use client";

import Quiz from "@/components/quiz";
import { Question } from "@/lib/schemas";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface QuizClientProps {
  questions: Question[];
  title: string;
}

export default function QuizClient({ questions, title }: QuizClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldCallback = searchParams.get('callback') === 'true';

  const handleComplete = async (score: number, answers: Record<number, string>) => {
    if (shouldCallback) {
      try {
        const collectionId = window.location.pathname.split('/')[3]; // Get collection ID from URL
        
        // Create detailed answers with question snapshots
        const detailedAnswers = questions.map((question, index) => ({
          questionId: index,
          question: question.question,
          options: question.options,
          correctAnswer: question.answer,
          userAnswer: answers[index],
          isCorrect: answers[index] === question.answer
        }));

        const response = await fetch(`/api/collections/${collectionId}/history`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            score,
            totalQuestions: questions.length,
            answers: detailedAnswers,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save quiz history');
        }

        toast.success('Quiz completed and history saved!');
      } catch (error) {
        console.error('Failed to save quiz history:', error);
        toast.error('Failed to save quiz history');
      }
    }
  };

  if (!questions.length) {
    return null;
  }

  return (
    <Quiz 
      questions={questions}
      title={title}
      clearPDF={() => router.back()}
      onComplete={handleComplete}
    />
  );
}
