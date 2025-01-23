import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { QuizNavigation } from '../QuizNavigation'

describe('QuizNavigation', () => {
  const defaultProps = {
    onNext: vi.fn(),
    onPrevious: vi.fn(),
    onFinish: vi.fn(),
    canGoNext: true,
    canGoPrevious: true,
    isLastQuestion: false,
  }

  it('renders navigation buttons correctly', () => {
    render(<QuizNavigation {...defaultProps} />)

    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
    expect(screen.queryByText('Finish')).not.toBeInTheDocument()
  })

  it('shows finish button on last question', () => {
    render(<QuizNavigation {...defaultProps} isLastQuestion={true} />)

    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Finish')).toBeInTheDocument()
    expect(screen.queryByText('Next')).not.toBeInTheDocument()
  })

  it('handles button clicks correctly', () => {
    const onNext = vi.fn()
    const onPrevious = vi.fn()
    const onFinish = vi.fn()

    render(
      <QuizNavigation
        {...defaultProps}
        onNext={onNext}
        onPrevious={onPrevious}
        onFinish={onFinish}
        isLastQuestion={true}
      />
    )

    fireEvent.click(screen.getByText('Previous'))
    expect(onPrevious).toHaveBeenCalled()

    fireEvent.click(screen.getByText('Finish'))
    expect(onFinish).toHaveBeenCalled()
  })

  it('disables navigation buttons correctly', () => {
    render(
      <QuizNavigation
        {...defaultProps}
        canGoNext={false}
        canGoPrevious={false}
      />
    )

    expect(screen.getByText('Previous')).toBeDisabled()
    expect(screen.getByText('Next')).toBeDisabled()
  })

  it('uses custom testId when provided', () => {
    render(
      <QuizNavigation
        {...defaultProps}
        testId="custom-nav"
      />
    )

    expect(screen.getByTestId('custom-nav')).toBeInTheDocument()
    expect(screen.getByTestId('custom-nav-prev')).toBeInTheDocument()
    expect(screen.getByTestId('custom-nav-next')).toBeInTheDocument()
  })

  it('applies correct button variants', () => {
    render(<QuizNavigation {...defaultProps} isLastQuestion={true} />)

    const prevButton = screen.getByText('Previous').closest('button')
    const finishButton = screen.getByText('Finish').closest('button')

    // Previous button should have ghost variant (no background)
    expect(prevButton).toHaveClass('hover:bg-accent')
    
    // Finish button should have default variant (with background)
    expect(finishButton).toHaveClass('bg-primary')
  })

  it('includes navigation icons', () => {
    render(<QuizNavigation {...defaultProps} />)

    // Both buttons should contain SVG icons
    const prevButton = screen.getByTestId('quiz-navigation-prev')
    const nextButton = screen.getByTestId('quiz-navigation-next')

    expect(prevButton.querySelector('svg')).toBeInTheDocument()
    expect(nextButton.querySelector('svg')).toBeInTheDocument()
  })
})