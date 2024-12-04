"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Check, X, Book, History, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type QuizAnswer = {
    questionId: number;
    question: string;
    options: string[];
    correctAnswer: string;
    userAnswer: string;
    isCorrect: boolean;
};

type HistoryItem = {
    id: string;
    type: 'quiz_generation' | 'collection_creation' | 'quiz_attempt';
    title: string;
    description: string;
    createdAt: string;
    metadata?: {
        score: number;
        totalQuestions: number;
        answers: QuizAnswer[];
        collectionName: string;
        collectionId: string;
    };
};

function HistoryItemCard({ item }: { item: HistoryItem }) {
    const router = useRouter();

    const getIcon = () => {
        switch (item.type) {
            case 'collection_creation':
                return <Book className="w-4 h-4" />;
            case 'quiz_generation':
                return <Sparkles className="w-4 h-4" />;
            case 'quiz_attempt':
                return <History className="w-4 h-4" />;
        }
    };

    const getBadgeVariant = () => {
        if (item.type !== 'quiz_attempt' || !item.metadata) return 'default';
        const percentage = (item.metadata.score / item.metadata.totalQuestions) * 100;
        if (percentage >= 80) return 'success';
        if (percentage >= 60) return 'warning';
        return 'destructive';
    };

    const handleViewResults = () => {
        if (item.type === 'quiz_attempt' && item.metadata) {
            router.push(`/dashboard/collection/${item.metadata.collectionId}/quiz/${item.id}`);
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {getIcon()}
                        <CardTitle>{item.title}</CardTitle>
                    </div>
                    {item.type === 'quiz_attempt' && item.metadata && (
                        <Badge variant={getBadgeVariant()}>
                            {Math.round((item.metadata.score / item.metadata.totalQuestions) * 100)}%
                        </Badge>
                    )}
                </div>
                <CardDescription>
                    {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p className="text-muted-foreground">{item.description}</p>
                    {item.type === 'quiz_attempt' && item.metadata?.answers && (
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handleViewResults}
                        >
                            View Results
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default function HistoryPage() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/history')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch history: ${res.statusText}`);
                }
                return res.json();
            })
            .then(data => {
                setHistory(data);
                setIsLoading(false);
                setError(null);
            })
            .catch(error => {
                console.error('Failed to fetch history:', error);
                setError('Failed to load history. Please try again later.');
                setIsLoading(false);
                toast.error('Failed to load history');
            });
    }, []);

    if (isLoading) {
        return (
            <div className="container mx-auto p-4">
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader>
                                <div className="h-6 w-1/4 bg-muted rounded"></div>
                                <div className="h-4 w-1/3 bg-muted rounded"></div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-4 w-3/4 bg-muted rounded"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                        <p>{error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Activity History</h1>
                <p className="text-muted-foreground">Track your learning journey and past activities</p>
            </div>

            <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="space-y-4">
                    {history.length === 0 ? (
                        <Card>
                            <CardContent className="p-6 text-center text-muted-foreground">
                                No activity history yet. Start by creating some flashcards!
                            </CardContent>
                        </Card>
                    ) : (
                        history.map((item) => (
                            <HistoryItemCard key={item.id} item={item} />
                        ))
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
