'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Question } from "@/lib/schemas";
import { EditQuizModal } from "./edit-quiz-modal";
import { Button } from "@/components/ui/button";
import { deleteQuiz, addQuizzesToCollection } from "@/app/actions/collection";
import { useState } from "react";
import { toast } from "sonner";
import QuizSection from "./quiz-section";
import { Pencil, Trash, Plus } from "lucide-react";
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function QuizCard({ quiz, index, onEdit, onDelete }: { 
    quiz: Question & { id: number }; 
    index: number;
    onEdit: () => void;
    onDelete: () => void;
}) {
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

export function CollectionContent({ collection, quizzes }: { 
    collection: any; 
    quizzes: (Question & { id: number })[];
}) {
    const [editingQuiz, setEditingQuiz] = useState<(Question & { id: number }) | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newQuiz, setNewQuiz] = useState<{
        question: string;
        options: string[];
        answer: "A" | "B" | "C" | "D";
    }>({
        question: "",
        options: ["", "", "", ""],
        answer: "A"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDelete = async (quizId: number) => {
        try {
            await deleteQuiz(quizId);
            toast.success("Quiz deleted successfully");
        } catch (error) {
            toast.error("Failed to delete quiz");
        }
    };

    const handleModalOpenChange = (open: boolean) => {
        setIsEditModalOpen(open);
        if (!open) {
            setEditingQuiz(null);
        }
    };

    const handleCreateQuiz = async () => {
        if (!newQuiz.question || newQuiz.options.some(opt => !opt)) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsSubmitting(true);
        try {
            await addQuizzesToCollection(collection.id, [newQuiz]);
            toast.success("Quiz created successfully");
            setIsCreateModalOpen(false);
            setNewQuiz({
                question: "",
                options: ["", "", "", ""],
                answer: "A"
            });
        } catch (error) {
            toast.error("Failed to create quiz");
        } finally {
            setIsSubmitting(false);
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
                <div className="flex items-center gap-4">
                    <Button onClick={() => setIsCreateModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Question
                    </Button>
                    {collection.isPinned && (
                        <span className="text-muted-foreground">📌 Pinned</span>
                    )}
                </div>
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

            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Question</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Question</Label>
                            <Input
                                value={newQuiz.question}
                                onChange={e => setNewQuiz(prev => ({ ...prev, question: e.target.value }))}
                                placeholder="Enter your question"
                            />
                        </div>
                        {newQuiz.options.map((option, index) => (
                            <div key={index} className="space-y-2">
                                <Label>Option {String.fromCharCode(65 + index)}</Label>
                                <Input
                                    value={option}
                                    onChange={e => {
                                        const newOptions = [...newQuiz.options];
                                        newOptions[index] = e.target.value;
                                        setNewQuiz(prev => ({ ...prev, options: newOptions }));
                                    }}
                                    placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
                                />
                            </div>
                        ))}
                        <div className="space-y-2">
                            <Label>Correct Answer</Label>
                            <Select
                                value={newQuiz.answer}
                                onValueChange={(value: "A" | "B" | "C" | "D") => 
                                    setNewQuiz(prev => ({ ...prev, answer: value }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select correct answer" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["A", "B", "C", "D"].map(letter => (
                                        <SelectItem key={letter} value={letter}>
                                            Option {letter}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                            <Button
                                variant="outline"
                                onClick={() => setIsCreateModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreateQuiz}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Creating..." : "Create Question"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {quizzes.length === 0 && (
                <div className="text-center text-muted-foreground mt-10">
                    <p>No quizzes in this collection yet. Create one to get started!</p>
                </div>
            )}
        </div>
    );
}
