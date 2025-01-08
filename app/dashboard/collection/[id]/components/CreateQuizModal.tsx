'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { addQuizzesToCollection } from "@/app/actions/quiz";

interface CreateQuizModalProps {
    collectionId: number;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export default function CreateQuizModal({ 
    collectionId,
    open, 
    onOpenChange,
    onSuccess
}: CreateQuizModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newQuiz, setNewQuiz] = useState<{
        question: string;
        options: string[];
        answer: "A" | "B" | "C" | "D";
    }>({
        question: "",
        options: ["", "", "", ""],
        answer: "A"
    });

    const handleCreateQuiz = async () => {
        if (!newQuiz.question || newQuiz.options.some(opt => !opt)) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsSubmitting(true);
        try {
            await addQuizzesToCollection(collectionId, [newQuiz]);
            toast.success("Quiz created successfully");
            onOpenChange(false);
            onSuccess();
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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Question</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="question">Question</Label>
                        <Input
                            id="question"
                            value={newQuiz.question}
                            onChange={(e) => setNewQuiz(prev => ({ ...prev, question: e.target.value }))}
                            placeholder="Enter your question"
                        />
                    </div>
                    {newQuiz.options.map((option, index) => (
                        <div key={index} className="space-y-2">
                            <Label htmlFor={`option-${index}`}>Option {String.fromCharCode(65 + index)}</Label>
                            <Input
                                id={`option-${index}`}
                                value={option}
                                onChange={(e) => {
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
                                {["A", "B", "C", "D"].map((option) => (
                                    <SelectItem key={option} value={option}>
                                        Option {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreateQuiz} disabled={isSubmitting}>
                        Create
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
} 