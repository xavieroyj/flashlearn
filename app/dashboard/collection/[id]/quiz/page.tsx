"use client";

import { getCollection } from "@/app/actions/collection";
import Quiz from "@/components/quiz";
import { Question } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Params = { id: string };

function QuizPage({ id }: Params) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadQuiz = async () => {
      const parsedId = parseInt(id);

      if (isNaN(parsedId)) {
        router.push("/dashboard");
        return;
      }

      const collection = await getCollection(parsedId);
      if (!collection) {
        router.push("/dashboard");
        return;
      }

      const quizzes: Question[] = collection.Quiz.map(quiz => ({
        question: quiz.question,
        options: quiz.options,
        answer: quiz.answer as "A" | "B" | "C" | "D"
      }));

      setQuestions(quizzes);
      setTitle(collection.name);
    };

    loadQuiz();
  }, [id, router]);

  if (!questions.length) {
    return null; // Loading state will be handled by loading.tsx
  }

  return (
    <Quiz 
      questions={questions}
      title={title}
      clearPDF={() => router.back()}
    />
  );
}

export default async function Page(props: {
  params: Promise<Params>;
}) {
  const params = await props.params;
  const { id } = params;

  return <QuizPage id={id} />;
}
