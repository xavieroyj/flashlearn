'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

interface QuizHistoryProps {
  history: Array<{
    id: number;
    score: number;
    totalQuestions: number;
    createdAt: string;
    answers: Array<{
      questionId: number;
      question: string;
      options: string[];
      correctAnswer: string;
      userAnswer: string;
      isCorrect: boolean;
    }>;
  }>;
}

export default function QuizHistory({ history }: QuizHistoryProps) {
  const router = useRouter();

  if (!history || history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No quiz attempts yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((attempt) => (
            <div
              key={attempt.id}
              onClick={() => {
                const collectionId = window.location.pathname.split('/')[3];
                router.push(`/dashboard/collection/${collectionId}/quiz/${attempt.id}`);
              }}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium">
                  Score: {attempt.score}/{attempt.totalQuestions}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(attempt.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="text-2xl font-bold">
                {Math.round((attempt.score / attempt.totalQuestions) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
