import { Question } from "@/lib/schemas"
import { createContext, useContext, useState, ReactNode } from "react"

interface QuizContextType {
  currentQuestionIndex: number
  userAnswers: string[]
  questions: Question[]
  isComplete: boolean
  currentQuestion: Question
  totalQuestions: number
  score: number
  setAnswer: (answer: string) => void
  nextQuestion: () => void
  previousQuestion: () => void
  finishQuiz: () => void
  resetQuiz: () => void
  canNavigateNext: boolean
  canNavigatePrevious: boolean
  isLastQuestion: boolean
}

const QuizContext = createContext<QuizContextType | null>(null)

interface QuizProviderProps {
  children: ReactNode
  questions: Question[]
  onComplete?: (score: number, answers: string[]) => void
  onReset?: () => void
}

export function QuizProvider({ children, questions, onComplete, onReset }: QuizProviderProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>(new Array(questions.length).fill(''))
  const [isComplete, setIsComplete] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const canNavigateNext = !!userAnswers[currentQuestionIndex]
  const canNavigatePrevious = currentQuestionIndex > 0

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].answer ? 1 : 0)
    }, 0)
  }

  const setAnswer = (answer: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = answer
    setUserAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const finishQuiz = () => {
    const finalScore = calculateScore()
    setIsComplete(true)
    onComplete?.(finalScore, userAnswers)
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setUserAnswers(new Array(questions.length).fill(''))
    setIsComplete(false)
    onReset?.()
  }

  const value: QuizContextType = {
    currentQuestionIndex,
    userAnswers,
    questions,
    isComplete,
    currentQuestion,
    totalQuestions,
    score: calculateScore(),
    setAnswer,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    resetQuiz,
    canNavigateNext,
    canNavigatePrevious,
    isLastQuestion,
  }

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}