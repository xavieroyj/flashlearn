'use client';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Question } from "@/lib/schemas";
import { useState } from "react";
import { editQuiz } from "@/app/actions/collection";
import { toast } from "sonner";

interface EditQuizModalProps {
    quiz: Question & { id: number };
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function EditQuizModal({ quiz, open, onOpenChange, onSuccess }: EditQuizModalProps) {
    const [question, setQuestion] = useState(quiz.question);
    const [options, setOptions] = useState(quiz.options);
    const [answer, setAnswer] = useState(quiz.answer);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await editQuiz(quiz.id, {
                question,
                options,
                answer
            });
            toast.success("Quiz updated successfully");
            onOpenChange(false);
            onSuccess?.();
        } catch (error) {
            toast.error("Failed to update quiz");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Quiz</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Question</Label>
                        <Input
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                        />
                    </div>
                    {options.map((option, index) => (
                        <div key={index} className="space-y-2">
                            <Label>Option {String.fromCharCode(65 + index)}</Label>
                            <Input
                                value={option}
                                onChange={(e) => {
                                    const newOptions = [...options];
                                    newOptions[index] = e.target.value;
                                    setOptions(newOptions);
                                }}
                                required
                            />
                        </div>
                    ))}
                    <div className="space-y-2">
                        <Label>Correct Answer</Label>
                        <Select
                            value={answer}
                            onValueChange={(value: "A" | "B" | "C" | "D") => setAnswer(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select correct answer" />
                            </SelectTrigger>
                            <SelectContent>
                                {["A", "B", "C", "D"].map((letter) => (
                                    <SelectItem key={letter} value={letter}>
                                        Option {letter}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
