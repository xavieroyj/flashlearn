'use client';

import { Question } from "@/lib/schemas";
import { useState } from "react";
import { toast } from "sonner";
import QuizSection from "./quiz-section";
import QuizHistory from './quiz-history';
import { EditQuizModal } from "./edit-quiz-modal";
import { deleteQuiz } from "@/app/actions/quiz";
import { toggleCollectionVisibility } from "@/app/actions/collection";
import CollectionHeader from "./components/CollectionHeader";
import QuizCard from "./components/QuizCard";
import CreateQuizModal from "./components/CreateQuizModal";
import { useRouter } from "next/navigation";

interface CollectionContentProps {
    collection: any;
    quizzes: (Question & { id: number })[];
    initialQuizHistory: any[];
}

export default function CollectionContent({ collection, quizzes, initialQuizHistory }: CollectionContentProps) {
    const [editingQuiz, setEditingQuiz] = useState<(Question & { id: number }) | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [quizHistory] = useState(initialQuizHistory);
    const router = useRouter();

    const handleDelete = async (quizId: number) => {
        try {
            await deleteQuiz(quizId);
            router.refresh();
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

    const handleToggleVisibility = async () => {
        try {
            await toggleCollectionVisibility(collection.id);
            router.refresh();
            toast.success(
                `Collection is now ${collection.isPublic ? 'private' : 'public'}`
            );
        } catch (error) {
            toast.error("Failed to toggle collection visibility");
        }
    };

    return (
        <div className="space-y-8">
            <CollectionHeader
                name={collection.name}
                description={collection.description}
                isPinned={collection.isPinned}
                isPublic={collection.isPublic}
                onAddQuestion={() => setIsCreateModalOpen(true)}
                onToggleVisibility={handleToggleVisibility}
            />

            {quizzes.length > 0 && (
                <QuizSection 
                    questions={quizzes}
                    collectionId={collection.id}
                    collectionName={collection.name}
                />
            )}

            <QuizHistory history={quizHistory} />

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

            <CreateQuizModal
                collectionId={collection.id}
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                onSuccess={() => {
                    router.refresh();
                }}
            />
        </div>
    );
}
