import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ReactNode } from 'react'
import { QuizProvider, useQuiz } from '../QuizContext'
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

const wrapper = ({ children }: { children: ReactNode }) => (
  <QuizProvider questions={mockQuestions}>{children}</QuizProvider>
)

describe('QuizContext', () => {
  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper })
    
    expect(result.current.currentQuestionIndex).toBe(0)
    expect(result.current.totalQuestions).toBe(2)
    expect(result.current.isComplete).toBe(false)
    expect(result.current.score).toBe(0)
    expect(result.current.userAnswers).toEqual(['', ''])
    expect(result.current.canNavigateNext).toBe(false)
    expect(result.current.canNavigatePrevious).toBe(false)
    expect(result.current.isLastQuestion).toBe(false)
  })

  it('allows answering questions and updates navigation state', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper })

    act(() => {
      result.current.setAnswer('B')
    })

    expect(result.current.userAnswers[0]).toBe('B')
    expect(result.current.canNavigateNext).toBe(true)
    expect(result.current.canNavigatePrevious).toBe(false)
  })

  it('handles navigation between questions', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper })

    act(() => {
      result.current.setAnswer('B')
      result.current.nextQuestion()
    })

    expect(result.current.currentQuestionIndex).toBe(1)
    expect(result.current.canNavigatePrevious).toBe(true)
    expect(result.current.isLastQuestion).toBe(true)

    act(() => {
      result.current.previousQuestion()
    })

    expect(result.current.currentQuestionIndex).toBe(0)
  })

  it('calculates score correctly', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper })

    // Answer first question correctly (B)
    act(() => {
      result.current.setAnswer('B')
    })

    // Move to second question
    act(() => {
      result.current.nextQuestion()
    })

    // Answer second question incorrectly (A)
    act(() => {
      result.current.setAnswer('A')
    })

    // Finish quiz
    act(() => {
      result.current.finishQuiz()
    })

    expect(result.current.score).toBe(1)
    expect(result.current.isComplete).toBe(true)
  })

  it('resets quiz state correctly', () => {
    const { result } = renderHook(() => useQuiz(), { wrapper })

    act(() => {
      result.current.setAnswer('B')
      result.current.nextQuestion()
      result.current.setAnswer('B')
      result.current.finishQuiz()
      result.current.resetQuiz()
    })

    expect(result.current.currentQuestionIndex).toBe(0)
    expect(result.current.isComplete).toBe(false)
    expect(result.current.score).toBe(0)
    expect(result.current.userAnswers).toEqual(['', ''])
  })

  it('calls onComplete callback with score and answers', () => {
    const onComplete = vi.fn()
    const customWrapper = ({ children }: { children: ReactNode }) => (
      <QuizProvider questions={mockQuestions} onComplete={onComplete}>
        {children}
      </QuizProvider>
    )

    const { result } = renderHook(() => useQuiz(), { wrapper: customWrapper })

    // Answer both questions correctly
    act(() => {
      result.current.setAnswer('B')
    })

    act(() => {
      result.current.nextQuestion()
    })

    act(() => {
      result.current.setAnswer('B')
    })

    act(() => {
      result.current.finishQuiz()
    })

    expect(onComplete).toHaveBeenCalledWith(2, ['B', 'B'])
  })

  it('calls onReset callback when quiz is reset', () => {
    const onReset = vi.fn()
    const customWrapper = ({ children }: { children: ReactNode }) => (
      <QuizProvider questions={mockQuestions} onReset={onReset}>
        {children}
      </QuizProvider>
    )

    const { result } = renderHook(() => useQuiz(), { wrapper: customWrapper })

    act(() => {
      result.current.resetQuiz()
    })

    expect(onReset).toHaveBeenCalled()
  })
})