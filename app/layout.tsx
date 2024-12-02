import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "FlashLearn",
  description: "An AI powered flashcard app to aid your learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body>
        <ThemeProvider attribute="class" enableSystem forcedTheme="dark">
          <Toaster position="bottom-right" richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
