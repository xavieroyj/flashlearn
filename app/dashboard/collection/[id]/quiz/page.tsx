import { getCollection } from "@/app/actions/collection";
import { Question } from "@/lib/schemas";
import QuizClient from "./components/quiz-client";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page(props: Params) {
  const params = await props.params;
  const { id } = params;

  const parsedId = parseInt(id);
  const collection = await getCollection(parsedId);

  if (!collection) {
    // Handle redirect on server side
    return null;
  }

  const quizzes: Question[] = collection.Quiz.map(quiz => ({
    question: quiz.question,
    options: quiz.options,
    answer: quiz.answer as "A" | "B" | "C" | "D"
  }));

  return <QuizClient questions={quizzes} title={collection.name} />;
}
