import { Card } from "./ui/card"
import { Question } from "@/lib/schemas"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuizReviewProps {
  questions: Question[]
  userAnswers: string[]
}

export default function QuizReview({ questions, userAnswers }: QuizReviewProps) {
  return (
    <Card className="w-full">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="tracking-tight text-2xl font-bold">Quiz Review</div>
      </div>
      <div className="p-6 pt-0">
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-8 last:mb-0">
            <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
            <div className="space-y-2">
              {question.options.map((option, oIndex) => {
                const label = String.fromCharCode(65 + oIndex) // Convert 0-3 to A-D
                const isSelected = userAnswers[qIndex] === label
                const isCorrect = question.answer === label
                
                return (
                  <div
                    key={oIndex}
                    data-testid={`question-${qIndex}-option-${oIndex}`}
                    className={cn(
                      "flex items-center p-4 rounded-lg",
                      isSelected && isCorrect && "bg-green-100 dark:bg-green-700/50",
                      isSelected && !isCorrect && "bg-red-100 dark:bg-red-700/50",
                      !isSelected && "border border-border"
                    )}
                  >
                    <span 
                      className="text-lg font-medium mr-4 w-6"
                      data-testid={`answer-label-${label}`}
                    >
                      {label}
                    </span>
                    <span className="flex-grow">{option}</span>
                    {isSelected && (
                      isCorrect ? (
                        <Check className="ml-2 text-green-600 dark:text-green-400" />
                      ) : (
                        <X className="ml-2 text-red-600 dark:text-red-400" />
                      )
                    )}
                    {!isSelected && isCorrect && userAnswers.length > 0 && (
                      <Check className="ml-2 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
