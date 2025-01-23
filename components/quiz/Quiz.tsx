import { Question } from "@/lib/schemas"
import { QuizProgress } from "./QuizProgress"
import { QuizQuestion } from "./QuizQuestion"
import { QuizNavigation } from "./QuizNavigation"
import { QuizProvider, useQuiz } from "./QuizContext"
import { Score } from "./Score"

interface QuizProps {
  title: string
  questions: Question[]
  clearPDF?: () => void
  testId?: string
}

function QuizContent({ title, testId = "quiz" }: { title: string, testId?: string }) {
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    userAnswers,
    setAnswer,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    canNavigateNext,
    canNavigatePrevious,
    isLastQuestion,
    isComplete,
    score,
    resetQuiz
  } = useQuiz()

  if (isComplete) {
    return (
      <Score
        score={score}
        total={totalQuestions}
        onTryAgain={resetQuiz}
        testId={`${testId}-score`}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-foreground">
          {title}
        </h1>
        <div className="relative">
          <QuizProgress
            current={currentQuestionIndex + 1}
            total={totalQuestions}
            testId={`${testId}-progress`}
          />
          <div className="min-h-[400px]">
            <QuizQuestion
              question={currentQuestion}
              currentAnswer={userAnswers[currentQuestionIndex]}
              onAnswerSelect={setAnswer}
              questionIndex={currentQuestionIndex}
              testId={`${testId}-question`}
            />
            <QuizNavigation
              onNext={nextQuestion}
              onPrevious={previousQuestion}
              onFinish={finishQuiz}
              canGoNext={canNavigateNext}
              canGoPrevious={canNavigatePrevious}
              isLastQuestion={isLastQuestion}
              testId={`${testId}-navigation`}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export function Quiz({ title, questions, clearPDF, testId = "quiz" }: QuizProps) {
  return (
    <QuizProvider
      questions={questions}
      onReset={clearPDF}
    >
      <QuizContent title={title} testId={testId} />
    </QuizProvider>
  )
}