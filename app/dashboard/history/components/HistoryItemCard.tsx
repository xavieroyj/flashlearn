'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book, History as HistoryIcon, Sparkles } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import type { HistoryItem } from "@/app/actions/history";

export default function HistoryItemCard({ item }: { item: HistoryItem }) {
    const router = useRouter();

    const getIcon = () => {
        switch (item.type) {
            case 'collection_creation':
                return <Book className="w-4 h-4" />;
            case 'quiz_generation':
                return <Sparkles className="w-4 h-4" />;
            case 'quiz_attempt':
                return <HistoryIcon className="w-4 h-4" />;
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