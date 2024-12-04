'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface QuizAttempt {
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
  collection: {
    id: string;
    name: string;
  };
}

export default function QuizDetailsPage() {
  const params = useParams();
  const [quizData, setQuizData] = useState<QuizAttempt | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`/api/quiz-history/${params.quizId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        const data = await response.json();
        
        // Ensure answers is an array
        if (!Array.isArray(data.answers)) {
          data.answers = [];
        }
        
        setQuizData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching quiz data:', err);
        setError('Failed to load quiz data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizData();
  }, [params.quizId]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded" />
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !quizData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{error || 'Quiz not found.'}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Quiz Results</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Collection: {quizData.collection.name}
            </p>
          </div>
          <Badge variant={
            Math.round((quizData.score / quizData.totalQuestions) * 100) >= 80 ? "success" :
            Math.round((quizData.score / quizData.totalQuestions) * 100) >= 60 ? "warning" :
            "destructive"
          }>
            {Math.round((quizData.score / quizData.totalQuestions) * 100)}%
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(quizData.createdAt), { addSuffix: true })}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <p className="font-medium">
              Score: {quizData.score}/{quizData.totalQuestions}
            </p>
            <div className="text-2xl font-bold">
              {Math.round((quizData.score / quizData.totalQuestions) * 100)}%
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {quizData.answers.map((answer) => (
            <div
              key={answer.questionId}
              className={`p-4 rounded-lg border ${
                answer.isCorrect ? "border-green-500/20 bg-green-500/10" : "border-red-500/20 bg-red-500/10"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{answer.question}</p>
                {answer.isCorrect ? (
                  <Badge variant="success" className="flex items-center gap-1">
                    <Check className="w-3 h-3" /> Correct
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <X className="w-3 h-3" /> Incorrect
                  </Badge>
                )}
              </div>
              <div className="space-y-2">
                {answer.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      String.fromCharCode(65 + index) === answer.correctAnswer
                        ? "border-green-500/20 bg-green-500/10"
                        : String.fromCharCode(65 + index) === answer.userAnswer && !answer.isCorrect
                        ? "border-red-500/20 bg-red-500/10"
                        : "border-border"
                    }`}
                  >
                    <span className="font-medium mr-2">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
