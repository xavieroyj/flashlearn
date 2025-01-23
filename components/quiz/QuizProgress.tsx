import { Progress } from "../ui/progress"

interface QuizProgressProps {
  current: number
  total: number
  testId?: string
}

export function QuizProgress({ current, total, testId = "quiz-progress" }: QuizProgressProps) {
  const progress = (current / total) * 100

  return (
    <div className="relative" data-testid={testId}>
      <Progress value={progress} className="mb-8" />
      <span className="text-sm font-medium" data-testid={`${testId}-counter`}>
        {current} / {total}
      </span>
    </div>
  )
}