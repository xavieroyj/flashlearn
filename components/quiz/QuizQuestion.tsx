import { Question } from "@/lib/schemas"
import { Check } from "lucide-react"

interface QuizQuestionProps {
  question: Question
  currentAnswer?: string
  onAnswerSelect: (answer: string) => void
  questionIndex: number
  testId?: string
}

export function QuizQuestion({
  question,
  currentAnswer,
  onAnswerSelect,
  questionIndex,
  testId = "quiz-question"
}: QuizQuestionProps) {
  return (
    <div className="space-y-6" data-testid={testId}>
      <h2 className="text-lg font-semibold leading-tight" data-testid={`${testId}-text`}>
        {question.question}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {question.options.map((option, index) => {
          const label = String.fromCharCode(65 + index) // Convert 0-3 to A-D
          const isSelected = currentAnswer === label
          
          return (
            <button
              key={label}
              onClick={() => onAnswerSelect(label)}
              data-testid={`${testId}-${questionIndex}-answer-${label}`}
              className={`
                inline-flex items-center gap-2 rounded-md text-sm font-medium
                transition-colors focus-visible:outline-none focus-visible:ring-1
                focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
                [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
                border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground
                h-auto py-6 px-4 justify-start text-left whitespace-normal
                ${isSelected ? 'bg-secondary text-secondary-foreground border-secondary shadow-sm hover:bg-secondary/80' : ''}
              `}
            >
              <span className="text-lg font-medium mr-4 shrink-0">
                {label}
              </span>
              <span className="flex-grow">
                {option}
              </span>
              {isSelected && (
                <Check className="ml-2 shrink-0 text-white" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}