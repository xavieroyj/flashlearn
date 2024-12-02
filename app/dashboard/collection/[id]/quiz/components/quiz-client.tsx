"use client";

import Quiz from "@/components/quiz";
import { Question } from "@/lib/schemas";
import { useRouter } from "next/navigation";

interface QuizClientProps {
  questions: Question[];
  title: string;
}

export default function QuizClient({ questions, title }: QuizClientProps) {
  const router = useRouter();

  if (!questions.length) {
    return null;
  }

  return (
    <Quiz 
      questions={questions}
      title={title}
      clearPDF={() => router.back()}
    />
  );
}
