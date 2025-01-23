import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import { toHaveStyle } from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with testing-library matchers
expect.extend({ ...matchers, toHaveStyle })

// Add types to Vitest's expect
interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R
  toHaveTextContent(text: string | RegExp): R
  toBeVisible(): R
  toBeDisabled(): R
  toHaveClass(className: string): R
  toHaveAttribute(attr: string, value?: string): R
  toHaveStyle(css: Record<string, any>): R
}

declare module 'vitest' {
  interface Assertion extends CustomMatchers {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

// Cleanup after each test
afterEach(() => {
  cleanup()
})