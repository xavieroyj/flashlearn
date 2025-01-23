import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QuizQuestion } from '../QuizQuestion'
import type { Question } from '@/lib/schemas'

const mockQuestion: Question = {
  question: "What is the capital of France?",
  options: ["London", "Paris", "Berlin", "Madrid"],
  answer: "B"
}

describe('QuizQuestion', () => {
  it('renders question and options correctly', () => {
    render(
      <QuizQuestion
        question={mockQuestion}
        questionIndex={0}
        onAnswerSelect={() => {}}
      />
    )

    // Check question text
    expect(screen.getByTestId('quiz-question-text'))
      .toHaveTextContent(mockQuestion.question)

    // Check all options are rendered with correct labels
    mockQuestion.options.forEach((option, index) => {
      const label = String.fromCharCode(65 + index) // A, B, C, D
      const button = screen.getByTestId(`quiz-question-0-answer-${label}`)
      expect(button).toHaveTextContent(option)
      expect(button).toHaveTextContent(label)
    })
  })

  it('handles answer selection correctly', () => {
    const onAnswerSelect = vi.fn()
    render(
      <QuizQuestion
        question={mockQuestion}
        questionIndex={0}
        onAnswerSelect={onAnswerSelect}
      />
    )

    // Click on option B
    fireEvent.click(screen.getByTestId('quiz-question-0-answer-B'))
    expect(onAnswerSelect).toHaveBeenCalledWith('B')
  })

  it('shows selected answer with correct styling', () => {
    render(
      <QuizQuestion
        question={mockQuestion}
        questionIndex={0}
        currentAnswer="B"
        onAnswerSelect={() => {}}
      />
    )

    const selectedButton = screen.getByTestId('quiz-question-0-answer-B')
    expect(selectedButton).toHaveClass('bg-secondary')
    expect(selectedButton).toHaveClass('text-secondary-foreground')

    // Check that other options are not styled as selected
    const unselectedButton = screen.getByTestId('quiz-question-0-answer-A')
    expect(unselectedButton).not.toHaveClass('bg-secondary')
  })

  it('uses custom testId when provided', () => {
    render(
      <QuizQuestion
        question={mockQuestion}
        questionIndex={0}
        onAnswerSelect={() => {}}
        testId="custom-question"
      />
    )

    expect(screen.getByTestId('custom-question')).toBeInTheDocument()
    expect(screen.getByTestId('custom-question-text')).toBeInTheDocument()
    expect(screen.getByTestId('custom-question-0-answer-A')).toBeInTheDocument()
  })

  it('shows check icon only for selected answer', () => {
    render(
      <QuizQuestion
        question={mockQuestion}
        questionIndex={0}
        currentAnswer="B"
        onAnswerSelect={() => {}}
      />
    )

    // Selected answer should have a check icon
    const selectedButton = screen.getByTestId('quiz-question-0-answer-B')
    expect(selectedButton.querySelector('svg')).toBeInTheDocument()

    // Unselected answers should not have a check icon
    const unselectedButton = screen.getByTestId('quiz-question-0-answer-A')
    expect(unselectedButton.querySelector('svg')).not.toBeInTheDocument()
  })
})