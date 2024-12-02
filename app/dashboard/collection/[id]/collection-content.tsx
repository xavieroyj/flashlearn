'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question } from "@/lib/schemas";
import { EditQuizModal } from "./edit-quiz-modal";
import { Button } from "@/components/ui/button";
import { deleteQuiz } from "@/app/actions/collection";
import { useState } from "react";
import { toast } from "sonner";
import QuizSection from "./quiz-section";

function QuizCard({ quiz, index, onEdit, onDelete }: { 
    quiz: Question & { id: number }; 
    index: number;
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <CardTitle className="text-lg">{quiz.question}</CardTitle>
                <div className="flex space-x-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onEdit}
                        className="h-8 w-8"
                    >
                        ✏️
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onDelete}
                        className="h-8 w-8 text-red-500"
                    >
                        🗑️
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {quiz.options.map((option, optionIndex) => (
                        <div 
                            key={optionIndex}
                            className={`p-3 rounded-lg ${
                                String.fromCharCode(65 + optionIndex) === quiz.answer 
                                    ? "bg-green-500/10 text-green-700 dark:text-green-300"
                                    : "bg-muted"
                            }`}
                        >
                            {String.fromCharCode(65 + optionIndex)}. {option}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export function CollectionContent({ collection, quizzes }: { 
    collection: any; 
    quizzes: (Question & { id: number })[];
}) {
    const [editingQuiz, setEditingQuiz] = useState<(Question & { id: number }) | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleDelete = async (quizId: number) => {
        if (!confirm("Are you sure you want to delete this quiz?")) return;
        
        try {
            await deleteQuiz(quizId);
            toast.success("Quiz deleted successfully");
            // The page will automatically revalidate due to the server action
        } catch (error) {
            toast.error("Failed to delete quiz");
        }
    };

    const handleModalOpenChange = (open: boolean) => {
        setIsEditModalOpen(open);
        if (!open) {
            setEditingQuiz(null); // Reset the editing quiz when modal is closed
        }
    };

    return (
        <div className="w-full h-full p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{collection.name}</h1>
                    {collection.description && (
                        <p className="text-muted-foreground mt-1">{collection.description}</p>
                    )}
                </div>
                {collection.isPinned && (
                    <span className="text-muted-foreground">📌 Pinned</span>
                )}
            </div>

            {quizzes.length > 0 && (
                <QuizSection 
                    questions={quizzes}
                    collectionId={collection.id}
                    collectionName={collection.name}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz, index) => (
                    <QuizCard
                        key={quiz.id}
                        quiz={quiz}
                        index={index}
                        onEdit={() => {
                            setEditingQuiz(quiz);
                            setIsEditModalOpen(true);
                        }}
                        onDelete={() => handleDelete(quiz.id)}
                    />
                ))}
            </div>

            {editingQuiz && (
                <EditQuizModal
                    quiz={editingQuiz}
                    open={isEditModalOpen}
                    onOpenChange={handleModalOpenChange}
                    onSuccess={() => {
                        setEditingQuiz(null);
                        setIsEditModalOpen(false);
                    }}
                />
            )}

            {quizzes.length === 0 && (
                <div className="text-center text-muted-foreground mt-10">
                    <p>No quizzes in this collection yet. Create one to get started!</p>
                </div>
            )}
        </div>
    );
}
