import { Metadata } from "next"

export const metadata: Metadata = {
  title: "FlashLearn - AI-Powered Flashcard Learning",
  description: "Enhance your learning experience with AI-generated flashcards",
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
