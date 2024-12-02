import type { NextPage, GetServerSideProps } from "next";
import { getCollection } from "@/app/actions/collection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import QuizSection from "./quiz-section";
import { Question } from "@/lib/schemas";

type CollectionPageParams = Promise<{ 
    id: string 
}>

async function CollectionPage(props: { params: CollectionPageParams }) {
    const params = await props.params;
    
    const parsedId = parseInt(params.id);
    
    if (isNaN(parsedId)) {
        notFound();
    }

    const collection = await getCollection(parsedId);
    if (!collection) {
        notFound();
    }

    const quizzes: Question[] = collection.Quiz.map(quiz => ({
        question: quiz.question,
        options: quiz.options,
        answer: quiz.answer as "A" | "B" | "C" | "D"
    }));

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
                    collectionId={parsedId}
                    collectionName={collection.name}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-lg">{quiz.question}</CardTitle>
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
                ))}
            </div>

            {quizzes.length === 0 && (
                <div className="text-center text-muted-foreground mt-10">
                    <p>No quizzes in this collection yet. Create one to get started!</p>
                </div>
            )}
        </div>
    );
}

export default CollectionPage;
