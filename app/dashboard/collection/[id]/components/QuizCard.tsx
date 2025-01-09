'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Question } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface QuizCardProps {
    quiz: Question & { id: number };
    index: number;
    onEdit: () => void;
    onDelete: () => void;
}

export default function QuizCard({ quiz, index, onEdit, onDelete }: QuizCardProps) {
    return (
        <Card>
            <CardContent className="p-6 relative group">
                <div className="absolute top-2 right-2 flex gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit();
                        }}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Quiz</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete this quiz? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    onClick={onDelete}
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-medium mb-1">Question {index + 1}</h3>
                        <p className="text-muted-foreground">{quiz.question}</p>
                    </div>
                    <div className="space-y-2">
                        {quiz.options.map((option, optionIndex) => (
                            <div
                                key={optionIndex}
                                className={`p-3 rounded-lg border ${
                                    String.fromCharCode(65 + optionIndex) === quiz.answer
                                        ? "border-green-500/20 bg-green-500/10"
                                        : "border-border"
                                }`}
                            >
                                <span className="font-medium mr-2">
                                    {String.fromCharCode(65 + optionIndex)}
                                </span>
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 