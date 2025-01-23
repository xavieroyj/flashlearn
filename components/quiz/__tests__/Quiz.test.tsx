import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Quiz } from '../Quiz'
import type { Question } from '@/lib/schemas'

const mockQuestions: Question[] = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "B"
  },
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    answer: "B"
  }
]

describe('Quiz', () => {
  const defaultProps = {
    title: "Math Quiz",
    questions: mockQuestions,
  }

  it('renders quiz title and first question', () => {
    render(<Quiz {...defaultProps} />)
    
    expect(screen.getByText('Math Quiz')).toBeInTheDocument()
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument()
    expect(screen.getByText('1 / 2')).toBeInTheDocument()
  })

  it('completes full quiz flow', async () => {
    render(<Quiz {...defaultProps} />)

    // Answer first question
    fireEvent.click(screen.getByTestId('quiz-question-0-answer-B'))
    fireEvent.click(screen.getByTestId('quiz-navigation-next'))

    // Should show second question
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument()
    expect(screen.getByText('2 / 2')).toBeInTheDocument()

    // Answer second question
    fireEvent.click(screen.getByTestId('quiz-question-1-answer-B'))
    fireEvent.click(screen.getByTestId('quiz-navigation-finish'))

    // Should show score screen with perfect score
    expect(screen.getByTestId('quiz-score-percentage')).toHaveTextContent('100%')
    expect(screen.getByTestId('quiz-score-summary')).toHaveTextContent('2 out of 2 correct')
  })

  it('handles quiz reset', () => {
    const clearPDF = vi.fn()
    render(<Quiz {...defaultProps} clearPDF={clearPDF} />)

    // Complete quiz
    fireEvent.click(screen.getByTestId('quiz-question-0-answer-B'))
    fireEvent.click(screen.getByTestId('quiz-navigation-next'))
    fireEvent.click(screen.getByTestId('quiz-question-1-answer-B'))
    fireEvent.click(screen.getByTestId('quiz-navigation-finish'))

    // Reset quiz
    fireEvent.click(screen.getByTestId('quiz-score-try-again'))

    // Should be back at first question
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument()
    expect(screen.getByText('1 / 2')).toBeInTheDocument()
    expect(clearPDF).toHaveBeenCalled()
  })

  it('uses custom testId when provided', () => {
    render(<Quiz {...defaultProps} testId="custom-quiz" />)

    expect(screen.getByTestId('custom-quiz-progress')).toBeInTheDocument()
    expect(screen.getByTestId('custom-quiz-question')).toBeInTheDocument()
    expect(screen.getByTestId('custom-quiz-navigation')).toBeInTheDocument()
  })

  it('handles navigation state correctly', () => {
    render(<Quiz {...defaultProps} />)

    // Initially, prev should be disabled and next should be disabled (no answer yet)
    expect(screen.getByTestId('quiz-navigation-prev')).toBeDisabled()
    expect(screen.getByTestId('quiz-navigation-next')).toBeDisabled()

    // Select an answer
    fireEvent.click(screen.getByTestId('quiz-question-0-answer-B'))

    // Now next should be enabled
    expect(screen.getByTestId('quiz-navigation-next')).not.toBeDisabled()

    // Go to next question
    fireEvent.click(screen.getByTestId('quiz-navigation-next'))

    // Previous should now be enabled, but next/finish should be disabled (no answer yet)
    expect(screen.getByTestId('quiz-navigation-prev')).not.toBeDisabled()
    expect(screen.getByTestId('quiz-navigation-finish')).toBeDisabled()
  })

  it('shows correct finish button on last question', () => {
    render(<Quiz {...defaultProps} />)

    // Go to last question
    fireEvent.click(screen.getByTestId('quiz-question-0-answer-B'))
    fireEvent.click(screen.getByTestId('quiz-navigation-next'))

    // Should show finish button instead of next
    expect(screen.queryByTestId('quiz-navigation-next')).not.toBeInTheDocument()
    expect(screen.getByTestId('quiz-navigation-finish')).toBeInTheDocument()
  })
})