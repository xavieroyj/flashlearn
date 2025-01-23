import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QuizProgress } from '../QuizProgress'

describe('QuizProgress', () => {
  it('displays correct progress information', () => {
    render(<QuizProgress current={3} total={5} />)
    
    const counter = screen.getByTestId('quiz-progress-counter')
    expect(counter).toHaveTextContent('3 / 5')
  })

  it('calculates progress percentage correctly', () => {
    render(<QuizProgress current={2} total={4} />)
    
    const progressBar = screen.getByRole('progressbar')
    const indicator = progressBar.querySelector('[class*="bg-primary"]')
    // Progress is 50% (2/4), so remaining space is 50% -> -50%
    expect(indicator).toHaveStyle({ transform: 'translateX(-50%)' })
  })

  it('uses custom testId when provided', () => {
    render(<QuizProgress current={1} total={3} testId="custom-progress" />)
    
    expect(screen.getByTestId('custom-progress')).toBeInTheDocument()
    expect(screen.getByTestId('custom-progress-counter')).toBeInTheDocument()
  })

  it('handles edge cases', () => {
    // Test start of quiz
    const { rerender } = render(<QuizProgress current={1} total={10} />)
    const indicator = screen.getByRole('progressbar').querySelector('[class*="bg-primary"]')
    // Progress is 10% (1/10), so remaining space is 90% -> -90%
    expect(indicator).toHaveStyle({ transform: 'translateX(-90%)' })

    // Test end of quiz
    rerender(<QuizProgress current={10} total={10} />)
    // Progress is 100% (10/10), so remaining space is 0% -> -0%
    expect(indicator).toHaveStyle({ transform: 'translateX(-0%)' })
  })
})