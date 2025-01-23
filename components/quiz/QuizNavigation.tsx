import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"

interface QuizNavigationProps {
  onNext: () => void
  onPrevious: () => void
  onFinish: () => void
  canGoNext: boolean
  canGoPrevious: boolean
  isLastQuestion: boolean
  testId?: string
}

export function QuizNavigation({
  onNext,
  onPrevious,
  onFinish,
  canGoNext,
  canGoPrevious,
  isLastQuestion,
  testId = "quiz-navigation"
}: QuizNavigationProps) {
  return (
    <div 
      className="flex justify-between items-center pt-4"
      data-testid={testId}
    >
      <Button
        variant="ghost"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        data-testid={`${testId}-prev`}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
      </Button>
      
      {isLastQuestion ? (
        <Button
          onClick={onFinish}
          disabled={!canGoNext}
          data-testid={`${testId}-finish`}
        >
          Finish
        </Button>
      ) : (
        <Button
          variant="ghost"
          onClick={onNext}
          disabled={!canGoNext}
          data-testid={`${testId}-next`}
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  )
}