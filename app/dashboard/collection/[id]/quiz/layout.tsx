import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quiz | FlashLearn",
  description: "Test your knowledge with interactive quizzes",
}

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
