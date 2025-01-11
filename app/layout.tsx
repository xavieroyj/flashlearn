import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { GeistSans } from "geist/font/sans";
import { Outfit } from "next/font/google";

export const metadata: Metadata = {
  title: "FlashLearn",
  description: "An AI powered flashcard app to aid your learning",
  appleWebApp: {
    title: "FlashLearn",
  },
  openGraph: {
    title: "FlashLearn",
    description: "An AI powered flashcard app to aid your learning",
    images: [
      {
        url: "/default-opengraph.png",
        width: 1200,
        height: 630,
      },
    ],
  }
};  

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${GeistSans.className}`}>
      <body>
        <ThemeProvider attribute="class" enableSystem forcedTheme="dark">
          <Toaster position="bottom-right" richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
