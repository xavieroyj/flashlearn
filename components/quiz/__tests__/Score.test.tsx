import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Score } from '../Score'

describe('Score', () => {
  const defaultProps = {
    score: 3,
    total: 5,
    onTryAgain: vi.fn(),
  }

  it('displays score percentage correctly', () => {
    render(<Score {...defaultProps} />)
    
    const percentage = screen.getByTestId('quiz-score-percentage')
    expect(percentage).toHaveTextContent('60%')
  })

  it('displays score summary correctly', () => {
    render(<Score {...defaultProps} />)
    
    const summary = screen.getByTestId('quiz-score-summary')
    expect(summary).toHaveTextContent('3 out of 5 correct')
  })

  it('handles try again button click', () => {
    const onTryAgain = vi.fn()
    render(<Score {...defaultProps} onTryAgain={onTryAgain} />)
    
    const button = screen.getByText('Try Again')
    fireEvent.click(button)
    expect(onTryAgain).toHaveBeenCalled()
  })

  it('uses custom testId when provided', () => {
    render(<Score {...defaultProps} testId="custom-score" />)
    
    expect(screen.getByTestId('custom-score')).toBeInTheDocument()
    expect(screen.getByTestId('custom-score-percentage')).toBeInTheDocument()
    expect(screen.getByTestId('custom-score-summary')).toBeInTheDocument()
    expect(screen.getByTestId('custom-score-try-again')).toBeInTheDocument()
  })

  it('handles perfect score', () => {
    render(<Score score={5} total={5} onTryAgain={() => {}} />)
    
    const percentage = screen.getByTestId('quiz-score-percentage')
    expect(percentage).toHaveTextContent('100%')
  })

  it('handles zero score', () => {
    render(<Score score={0} total={5} onTryAgain={() => {}} />)
    
    const percentage = screen.getByTestId('quiz-score-percentage')
    expect(percentage).toHaveTextContent('0%')
  })

  it('rounds percentage correctly', () => {
    render(<Score score={2} total={3} onTryAgain={() => {}} />)
    
    const percentage = screen.getByTestId('quiz-score-percentage')
    // 2/3 = 66.666...% should be rounded to 67%
    expect(percentage).toHaveTextContent('67%')
  })
})