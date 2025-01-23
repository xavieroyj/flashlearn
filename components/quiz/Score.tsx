import { Button } from "../ui/button"

interface ScoreProps {
  score: number
  total: number
  onTryAgain: () => void
  testId?: string
}

export function Score({ score, total, onTryAgain, testId = "quiz-score" }: ScoreProps) {
  const percentage = Math.round((score / total) * 100)

  return (
    <div 
      className="min-h-[400px] flex flex-col items-center justify-center space-y-8"
      data-testid={testId}
    >
      <div className="text-center space-y-4">
        <h2 
          className="text-4xl font-bold text-foreground"
          data-testid={`${testId}-percentage`}
        >
          {percentage}%
        </h2>
        <p 
          className="text-xl text-muted-foreground"
          data-testid={`${testId}-summary`}
        >
          {score} out of {total} correct
        </p>
      </div>

      <Button 
        onClick={onTryAgain}
        data-testid={`${testId}-try-again`}
      >
        Try Again
      </Button>
    </div>
  )
}