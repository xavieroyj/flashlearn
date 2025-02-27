import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication | FlashLearn",
  description: "Sign in or create an account to start learning with FlashLearn",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
